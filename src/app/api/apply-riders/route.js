import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/authOptions";

// Validation schema
const riderApplicationSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().min(10, "Valid phone number required"),
  vehicleType: z.enum(["BIKE", "VAN", "TRUCK"], {
    errorMap: () => ({ message: "Invalid vehicle type" }),
  }),
  plateNumber: z.string().min(5, "Plate number required"),
  licenseNumber: z.string().min(5, "License number required"),
  address: z.string().min(10, "Full address required"),
});

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const validation = riderApplicationSchema.safeParse(body);

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

    const { name, email, phone, vehicleType, plateNumber, licenseNumber, address } = validation.data;

    // Check if user already exists
    let user = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist, create one
    if (!user) {
      user = await prisma.user.create({
        data: {
          name,
          email,
          role: "USER", // Will be upgraded to RIDER upon approval
        },
      });
    }

    // Check if rider profile already exists
    const existingProfile = await prisma.riderProfile.findUnique({
      where: { userId: user.id },
    });

    if (existingProfile) {
      return NextResponse.json(
        { success: false, error: "Rider application already exists" },
        { status: 409 }
      );
    }

    // Create rider profile (pending verification)
    const riderProfile = await prisma.riderProfile.create({
      data: {
        userId: user.id,
        vehicleType,
        plateNumber,
        licenseNumber,
        isVerified: false,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully. We'll review and contact you soon.",
      application: {
        id: riderProfile.id,
        name,
        email,
        status: "pending",
      },
    });
  } catch (error) {
    console.error("Rider application error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get all rider applications (Admin only)
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MERCHANT")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // "verified" or "pending"

    const where = status === "verified"
      ? { isVerified: true }
      : status === "pending"
        ? { isVerified: false }
        : {};

    const riders = await prisma.riderProfile.findMany({
      where,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      riders: riders.map(r => ({
        id: r.id,
        name: r.user.name,
        email: r.user.email,
        vehicleType: r.vehicleType,
        plateNumber: r.plateNumber,
        isVerified: r.isVerified,
        createdAt: r.createdAt,
      })),
    });
  } catch (error) {
    console.error("Get riders error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Approve/Reject rider application (Admin only)
export async function PATCH(request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user.role !== "ADMIN" && session.user.role !== "MERCHANT")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized access" },
        { status: 403 }
      );
    }

    const { riderId, action } = await request.json();

    if (!riderId || !action) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (action === "approve") {
      // Update rider profile and user role in a transaction
      await prisma.$transaction(async (tx) => {
        const riderProfile = await tx.riderProfile.update({
          where: { id: riderId },
          data: { isVerified: true },
        });

        await tx.user.update({
          where: { id: riderProfile.userId },
          data: { role: "RIDER" },
        });
      });

      return NextResponse.json({
        success: true,
        message: "Rider approved successfully",
      });
    } else if (action === "reject") {
      // Delete rider profile
      await prisma.riderProfile.delete({
        where: { id: riderId },
      });

      return NextResponse.json({
        success: true,
        message: "Rider application rejected",
      });
    }

    return NextResponse.json(
      { success: false, error: "Invalid action" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Update rider error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}