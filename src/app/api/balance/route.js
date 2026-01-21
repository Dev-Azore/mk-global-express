import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/authOptions";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MERCHANT")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 403 }
      );
    }
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
