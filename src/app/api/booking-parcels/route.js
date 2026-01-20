import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";
import { z } from "zod";
import { calculateDistance } from "@/Lib/googleMaps";

// Validation schema for parcel booking
const parcelSchema = z.object({
  senderId: z.string().uuid("Invalid sender ID"),
  pickupAddress: z.object({
    street: z.string().min(5, "Street address required"),
    lga: z.string().min(2, "LGA required"),
    city: z.string().default("Kano"),
    state: z.string().default("Kano"),
    country: z.string().default("Nigeria"),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
  dropoffAddress: z.object({
    street: z.string().min(5, "Street address required"),
    lga: z.string().min(2, "LGA required"),
    city: z.string().default("Kano"),
    state: z.string().default("Kano"),
    country: z.string().default("Nigeria"),
    lat: z.number().optional(),
    lng: z.number().optional(),
  }),
  description: z.string().optional(),
  weight: z.number().positive("Weight must be positive").optional(),
});

// Helper function to calculate distance using Google Maps API
async function getDistance(pickup, dropoff) {
  const result = await calculateDistance(pickup, dropoff);
  return result.distance;
}

// Helper function to calculate price based on distance
function calculatePrice(distance, weight = 1) {
  const basePrice = 500; // ₦500 base
  const pricePerKm = 50; // ₦50 per km
  const weightMultiplier = weight > 5 ? 1.5 : 1;

  return Math.round((basePrice + (distance * pricePerKm)) * weightMultiplier);
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Validate input
    const validation = parcelSchema.safeParse(body);

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

    const { senderId, pickupAddress, dropoffAddress, description, weight } = validation.data;

    // Verify sender exists
    const sender = await prisma.user.findUnique({
      where: { id: senderId },
    });

    if (!sender) {
      return NextResponse.json(
        { success: false, error: "Sender not found" },
        { status: 404 }
      );
    }

    // Calculate distance and price using Google Maps API
    const distance = await getDistance(pickupAddress, dropoffAddress);
    const price = calculatePrice(distance, weight);

    // Generate tracking ID
    const trackingId = `TR-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;

    // Create parcel
    const parcel = await prisma.parcel.create({
      data: {
        trackingId,
        senderId,
        pickupAddress,
        dropoffAddress,
        description,
        weight,
        distance,
        price,
        status: "PENDING",
      },
      include: {
        sender: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      parcel,
    });
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const trackingId = searchParams.get("trackingId");

    if (trackingId) {
      // Get specific parcel by tracking ID
      const parcel = await prisma.parcel.findUnique({
        where: { trackingId },
        include: {
          sender: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
          rider: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                  email: true,
                },
              },
              vehicleType: true,
            },
          },
        },
      });

      if (!parcel) {
        return NextResponse.json(
          { success: false, error: "Parcel not found" },
          { status: 404 }
        );
      }

      return NextResponse.json({ success: true, parcel });
    }

    if (userId) {
      // Get all parcels for a user
      const parcels = await prisma.parcel.findMany({
        where: { senderId: userId },
        include: {
          rider: {
            select: {
              id: true,
              user: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return NextResponse.json({ success: true, parcels });
    }

    // Get all parcels (admin only - should add auth check)
    const parcels = await prisma.parcel.findMany({
      include: {
        sender: {
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
      take: 50, // Limit to 50 recent parcels
    });

    return NextResponse.json({ success: true, parcels });
  } catch (error) {
    console.error("Get parcels error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
