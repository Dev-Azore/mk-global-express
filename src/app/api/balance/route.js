import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Total balance estimation from successful payments
    const successfulPayments = await prisma.payment.findMany({
      where: {
        status: 'SUCCESS'
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    const totalBalance = successfulPayments.reduce((sum, p) => sum + p.amount, 0);

    // Cumulative growth for chart
    let cumulative = 0;
    const chartData = successfulPayments.map((p) => {
      cumulative += p.amount;
      const date = new Date(p.createdAt);
      return {
        date: `${date.getDate()}/${date.getMonth() + 1}`,
        balance: cumulative,
      };
    });

    return NextResponse.json({
      success: true,
      totalBalance,
      chartData,
    });
  } catch (err) {
    console.error("Error calculating balance:", err);
    return NextResponse.json({ success: false, message: "Failed to calculate balance" }, { status: 500 });
  }
}
