import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/authOptions";

// GET → fetch only approved riders
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MERCHANT")) {
      return NextResponse.json(
        { success: false, message: "Unauthorized access" },
        { status: 403 }
      );
    }
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
