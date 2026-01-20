import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";
import { z } from "zod";

const supportSchema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  subject: z.string().min(5, "Subject required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(request) {
  try {
    const body = await request.json();
    const validation = supportSchema.safeParse(body);

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

    const { name, email, subject, message } = validation.data;

    // Create support message in Prisma database
    await prisma.supportMessage.create({
      data: { name, email, subject, message },
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been received. We'll get back to you soon!",
    });
  } catch (error) {
    console.error("Support message error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Get all support messages (Admin only)
export async function GET() {
  try {
    const messages = await prisma.supportMessage.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      messages,
      count: messages.length,
    });
  } catch (error) {
    console.error("Get support messages error:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
