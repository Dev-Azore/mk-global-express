import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";
import bcrypt from "bcrypt";
import { z } from "zod";

// Strong password validation schema
const passwordSchema = z.string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

// Registration validation schema - SERVER SIDE ONLY
const registerSchema = z.object({
  username: z.string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must not exceed 20 characters")
    .regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"),
  name: z.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must not exceed 50 characters"),
  email: z.string()
    .email("Invalid email address")
    .toLowerCase(),
  phone: z.string()
    .regex(/^(\+234|0)[789][01]\d{8}$/, "Invalid Nigerian phone number (e.g., +2348012345678 or 08012345678)"),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export async function POST(request) {
  try {
    const body = await request.json();

    // SERVER-SIDE VALIDATION - Never trust client
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      // Map Zod errors to a more user-friendly format
      const errorMap = {};
      validation.error.errors.forEach(err => {
        const field = err.path[0];
        if (!errorMap[field]) {
          errorMap[field] = err.message;
        }
      });

      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
          details: errorMap
        },
        { status: 400 }
      );
    }

    const { username, name, email, phone, password } = validation.data;

    // Check if email already exists
    const existingEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingEmail) {
      return NextResponse.json(
        { success: false, error: "Email already registered" },
        { status: 409 }
      );
    }

    // Check if username already exists
    if (username) {
      const existingUsername = await prisma.user.findUnique({
        where: { username },
      });

      if (existingUsername) {
        return NextResponse.json(
          { success: false, error: "Username already taken" },
          { status: 409 }
        );
      }
    }

    // Check if phone already exists
    if (phone) {
      const existingPhone = await prisma.user.findUnique({
        where: { phone },
      });

      if (existingPhone) {
        return NextResponse.json(
          { success: false, error: "Phone number already registered" },
          { status: 409 }
        );
      }
    }

    // Hash password with high cost factor (12) - SERVER SIDE ONLY
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        username,
        name,
        email,
        phone,
        password: hashedPassword,
        role: "USER",
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    // Create wallet for new user
    await prisma.wallet.create({
      data: {
        userId: user.id,
        balance: 0,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Registration successful! You can now log in.",
      user: {
        id: user.id,
        username: user.username,
        name: user.name,
        email: user.email,
      },
    }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);

    // Don't expose internal errors to client
    return NextResponse.json(
      {
        success: false,
        error: "An error occurred during registration. Please try again."
      },
      { status: 500 }
    );
  }
}
