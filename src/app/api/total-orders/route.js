import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

// GET: fetch all orders
export async function GET() {
  try {
    const orders = await prisma.parcel.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        sender: {
          select: {
            name: true,
            email: true,
            phone: true
          }
        },
        payment: true,
        rider: {
          include: {
            user: {
              select: {
                name: true,
                email: true,
                phone: true
              }
            }
          }
        }
      }
    });

    return NextResponse.json({ success: true, orders });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

// PATCH: update order status
export async function PATCH(req) {
  try {
    const { id, status } = await req.json();

    if (!id || !status) {
      return NextResponse.json(
        { success: false, message: "Order ID and status required" },
        { status: 400 }
      );
    }

    // Update parcel status using Prisma
    const updatedParcel = await prisma.parcel.update({
      where: { id },
      data: { status }
    });

    return NextResponse.json({
      success: true,
      message: "Order updated successfully",
      parcel: updatedParcel
    });
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update order" },
      { status: 500 }
    );
  }
}
