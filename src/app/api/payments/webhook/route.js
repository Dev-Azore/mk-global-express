import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";
import crypto from "crypto";

// Verify PaymentPoint webhook signature
function verifyWebhookSignature(payload, signature) {
    const secret = process.env.PAYMENTPOINT_WEBHOOK_SECRET;

    if (!secret) {
        console.error("Webhook secret not configured");
        return false;
    }

    const hash = crypto
        .createHmac("sha512", secret)
        .update(JSON.stringify(payload))
        .digest("hex");

    return hash === signature;
}

export async function POST(request) {
    try {
        // Get signature from headers
        const signature = request.headers.get("x-paymentpoint-signature");

        if (!signature) {
            return NextResponse.json(
                { success: false, error: "Missing signature" },
                { status: 401 }
            );
        }

        const body = await request.json();

        // Verify webhook authenticity
        if (!verifyWebhookSignature(body, signature)) {
            console.error("Invalid webhook signature");
            return NextResponse.json(
                { success: false, error: "Invalid signature" },
                { status: 401 }
            );
        }

        const { event, data } = body;

        // Handle payment success
        if (event === "charge.success") {
            const { reference, amount, status } = data;

            // Find payment record
            const payment = await prisma.payment.findFirst({
                where: { providerRef: reference },
                include: {
                    user: true,
                    parcel: true,
                },
            });

            if (!payment) {
                console.error(`Payment not found for reference: ${reference}`);
                return NextResponse.json(
                    { success: false, error: "Payment not found" },
                    { status: 404 }
                );
            }

            // Update payment status
            await prisma.payment.update({
                where: { id: payment.id },
                data: {
                    status: "SUCCESS",
                    updatedAt: new Date(),
                },
            });

            // If wallet top-up, update user's wallet
            if (!payment.parcelId) {
                await prisma.wallet.upsert({
                    where: { userId: payment.userId },
                    update: {
                        balance: {
                            increment: amount / 100, // Convert from kobo to naira
                        },
                        updatedAt: new Date(),
                    },
                    create: {
                        userId: payment.userId,
                        balance: amount / 100,
                    },
                });
            }

            // If parcel payment, update parcel status
            if (payment.parcelId) {
                await prisma.parcel.update({
                    where: { id: payment.parcelId },
                    data: {
                        status: "ASSIGNED", // Ready to be assigned to rider
                        updatedAt: new Date(),
                    },
                });
            }

            console.log(`Payment successful: ${reference}`);
        }

        // Handle payment failure
        if (event === "charge.failed") {
            const { reference } = data;

            await prisma.payment.updateMany({
                where: { providerRef: reference },
                data: {
                    status: "FAILED",
                    updatedAt: new Date(),
                },
            });

            console.log(`Payment failed: ${reference}`);
        }

        // Always return 200 to acknowledge receipt
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook error:", error);
        // Still return 200 to prevent retries
        return NextResponse.json({ success: true });
    }
}
