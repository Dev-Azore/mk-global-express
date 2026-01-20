import { NextResponse } from "next/server";
import prisma from "@/Lib/prisma";

export async function GET() {
    const debugInfo = {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL ? process.env.NEXTAUTH_URL : "MISSING",
        NEXTAUTH_SECRET_SET: !!process.env.NEXTAUTH_SECRET,
        GOOGLE_CLIENT_ID_SET: !!process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET_SET: !!process.env.GOOGLE_CLIENT_SECRET,
        DATABASE_URL_SET: !!process.env.DATABASE_URL,
        NODE_ENV: process.env.NODE_ENV,
    };

    try {
        // Test Prisma Connection
        await prisma.$queryRaw`SELECT 1`;
        debugInfo.DB_CONNECTION = "PRISMA_SUCCESS";
    } catch (error) {
        debugInfo.DB_CONNECTION = "PRISMA_FAILED: " + error.message;
    }

    return NextResponse.json(debugInfo);
}
