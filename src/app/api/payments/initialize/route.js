import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";
import { z } from "zod";

// Validation schema
const paymentSchema = z.object({
    userId: z.string().uuid("Invalid user ID"),
    amount: z.number().min(100, "Minimum amount is ₦100"),
    parcelId: z.string().uuid("Invalid parcel ID").optional(),
    type: z.enum(["WALLET_TOPUP", "PARCEL_PAYMENT"]),
});

// PaymentPoint API helper
async function initializePaymentPoint(amount, email, reference) {
    const apiKey = process.env.PAYMENTPOINT_API_KEY;

    if (!apiKey) {
        throw new Error("PaymentPoint API key not configured");
    }

    try {
        const response = await fetch("https://api.paymentpoint.ng/v1/initialize", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${apiKey}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: amount * 100, // Convert to kobo
                email,
                reference,
                callback_url: `${process.env.NEXTAUTH_URL}/api/payments/callback`,
            }),
        });

        if (!response.ok) {
            throw new Error("PaymentPoint initialization failed");
        }

        return await response.json();
    } catch (error) {
        console.error("PaymentPoint error:", error);
        throw error;
    }
}

export async function POST(request) {
    try {
        const body = await request.json();

        // Validate input
        const validation = paymentSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Validation failed",
                    details: validation.error.errors
                },
                { status: 400 }
            );
        }

        const { userId, amount, parcelId, type } = validation.data;

        // Verify user exists
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, email: true, name: true },
        });

        if (!user) {
            return NextResponse.json(
                { success: false, error: "User not found" },
                { status: 404 }
            );
        }

        // If parcel payment, verify parcel exists and belongs to user
        if (type === "PARCEL_PAYMENT" && parcelId) {
            const parcel = await prisma.parcel.findUnique({
                where: { id: parcelId },
            });

            if (!parcel) {
                return NextResponse.json(
                    { success: false, error: "Parcel not found" },
                    { status: 404 }
                );
            }

            if (parcel.senderId !== userId) {
                return NextResponse.json(
                    { success: false, error: "Unauthorized" },
                    { status: 403 }
                );
            }
        }

        // Generate unique reference
        const reference = `TRF-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        // Create payment record
        const payment = await prisma.payment.create({
            data: {
                amount,
                userId,
                parcelId,
                providerRef: reference,
                status: "PENDING",
                provider: "paymentpoint",
            },
        });

        // Initialize PaymentPoint transaction
        const paymentPointResponse = await initializePaymentPoint(
            amount,
            user.email,
            reference
        );

        return NextResponse.json({
            success: true,
            payment: {
                id: payment.id,
                reference,
                amount,
            },
            paymentUrl: paymentPointResponse.data?.authorization_url,
        });
    } catch (error) {
        console.error("Payment initialization error:", error);
        return NextResponse.json(
            {
                success: false,
                error: error.message || "Internal server error"
            },
            { status: 500 }
        );
    }
}

// Get payment status
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const reference = searchParams.get("reference");
        const userId = searchParams.get("userId");

        if (reference) {
            // Get specific payment by reference
            const payment = await prisma.payment.findFirst({
                where: { providerRef: reference },
                include: {
                    user: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    parcel: {
                        select: {
                            id: true,
                            trackingId: true,
                        },
                    },
                },
            });

            if (!payment) {
                return NextResponse.json(
                    { success: false, error: "Payment not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json({ success: true, payment });
        }

        if (userId) {
            // Get all payments for a user
            const payments = await prisma.payment.findMany({
                where: { userId },
                include: {
                    parcel: {
                        select: {
                            trackingId: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
            });

            return NextResponse.json({ success: true, payments });
        }

        return NextResponse.json(
            { success: false, error: "Missing required parameters" },
            { status: 400 }
        );
    } catch (error) {
        console.error("Get payment error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
