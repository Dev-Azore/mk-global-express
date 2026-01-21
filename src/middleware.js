import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token;
        const path = req.nextUrl.pathname;

        // 1. Redirect authenticated users away from ANY login page to their dashboard
        const isAuthPage = path === "/login" || path === "/register" || path === "/security-control/login" || path === "/rider/login";

        if (token && isAuthPage) {
            const role = token.role?.toUpperCase();
            if (role === "ADMIN" || role === "MERCHANT") {
                return NextResponse.redirect(new URL("/security-control/admin", req.url));
            } else if (role === "RIDER") {
                return NextResponse.redirect(new URL("/dashboard/rider", req.url));
            } else {
                return NextResponse.redirect(new URL("/dashboard/user", req.url));
            }
        }

        // 2. Unauthenticated users handling (Already handled by withAuth authorized callback for matcher)
        // But we add specific logic for sub-paths if needed
        if (!token) {
            // withAuth will redirect to /login by default
            return null;
        }

        // 3. Role-based access control (RBAC)
        // ADMIN/MERCHANT only area (dashboard sub-paths)
        if (path.startsWith("/security-control/")) {
            if (token.role !== "ADMIN" && token.role !== "MERCHANT") {
                return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
            }
        }

        // RIDER only area (dashboard sub-paths)
        if (path.startsWith("/dashboard/rider/")) {
            if (token.role !== "RIDER") {
                return NextResponse.redirect(new URL("/?error=unauthorized", req.url));
            }
        }

        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token, req }) => {
                const path = req.nextUrl.pathname;
                // Allow public access to login/register and base landing pages
                if (
                    path === "/login" ||
                    path === "/register" ||
                    path === "/security-control" ||
                    path === "/security-control/login" ||
                    path === "/rider" ||
                    path === "/rider/login"
                ) {
                    return true;
                }
                return !!token;
            },
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
