import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

// GET → fetch only approved riders
export async function GET() {
  try {
    // In new schema, approved riders are those with isVerified = true
    const approvedRiders = await prisma.riderProfile.findMany({
      where: {
        isVerified: true
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            phone: true,
            image: true
          }
        }
      }
    });

    return NextResponse.json({ success: true, riders: approvedRiders });
  } catch (error) {
    console.error("❌ Error fetching approved riders:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch approved riders" },
      { status: 500 }
    );
  }
}
