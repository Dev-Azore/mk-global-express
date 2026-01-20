import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // 1. Unauthenticated users handling
        if (!token) {
            if (path.startsWith("/security-control")) {
                return NextResponse.redirect(new URL("/security-control/login", req.url));
            }
            if (path.startsWith("/dashboard/rider")) {
                return NextResponse.redirect(new URL("/rider/login", req.url));
            }
            return NextResponse.redirect(new URL("/login", req.url));
        }

        // 2. Role-based access control (RBAC)
        // ADMIN/MERCHANT only area
        if (path.startsWith("/security-control") && !path.includes("/login")) {
            if (token.role !== "ADMIN" && token.role !== "MERCHANT") {
                return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
            }
        }

        // RIDER only area
        if (path.startsWith("/dashboard/rider")) {
            if (token.role !== "RIDER") {
                return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
            }
        }

        // USER only area (or general dashboard)
        if (path.startsWith("/dashboard/user") || path === "/dashboard") {
            // All authenticated users can usually see the base dashboard or their specific user dashboard
            // Add specific logic here if needed
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
        pages: {
            signIn: "/login",
        },
    }
);

export const config = {
    matcher: [
        "/security-control/:path*",
        "/dashboard/:path*",
    ],
};
