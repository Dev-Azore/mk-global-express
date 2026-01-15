import { NextResponse } from "next/server";
import dbConnect, { collectionNamesObj } from "@/Lib/db.connect.js";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const collection = await dbConnect(collectionNamesObj.bookingParcelsCollection);
    const allOrders = await collection.find().sort({ createdAt: 1 }).toArray();

    // total balance using 'amount'
    const totalBalance = allOrders.reduce((sum, o) => sum + (o.amount || 0), 0);

    // cumulative growth for chart
    let cumulative = 0;
    const chartData = allOrders.map((o) => {
      cumulative += o.amount || 0;
      const date = new Date(o.createdAt);
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
    console.error(err);
    return NextResponse.json({ success: false, message: "Failed" }, { status: 500 });
  }
}
