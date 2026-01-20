import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/authOptions";

export async function GET(request) {
    try {
        // Get authenticated user
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        // Get or create wallet
        const wallet = await prisma.wallet.upsert({
            where: { userId: session.user.id },
            update: {},
            create: {
                userId: session.user.id,
                balance: 0,
            },
        });

        return NextResponse.json({
            success: true,
            wallet: {
                balance: wallet.balance,
                lastUpdated: wallet.updatedAt,
            },
        });
    } catch (error) {
        console.error("Get wallet error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}

// Deduct from wallet (for parcel booking)
export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.id) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const { amount, parcelId } = await request.json();

        if (!amount || amount <= 0) {
            return NextResponse.json(
                { success: false, error: "Invalid amount" },
                { status: 400 }
            );
        }

        // Get current wallet balance
        const wallet = await prisma.wallet.findUnique({
            where: { userId: session.user.id },
        });

        if (!wallet || wallet.balance < amount) {
            return NextResponse.json(
                { success: false, error: "Insufficient balance" },
                { status: 400 }
            );
        }

        // Deduct from wallet and create payment record in a transaction
        const result = await prisma.$transaction(async (tx) => {
            // Deduct from wallet
            const updatedWallet = await tx.wallet.update({
                where: { userId: session.user.id },
                data: {
                    balance: {
                        decrement: amount,
                    },
                },
            });

            // Create payment record
            const payment = await tx.payment.create({
                data: {
                    amount,
                    userId: session.user.id,
                    parcelId,
                    status: "SUCCESS",
                    provider: "wallet",
                    providerRef: `WALLET-${Date.now()}`,
                },
            });

            return { wallet: updatedWallet, payment };
        });

        return NextResponse.json({
            success: true,
            wallet: {
                balance: result.wallet.balance,
            },
            payment: result.payment,
        });
    } catch (error) {
        console.error("Wallet deduction error:", error);
        return NextResponse.json(
            { success: false, error: "Internal server error" },
            { status: 500 }
        );
    }
}
