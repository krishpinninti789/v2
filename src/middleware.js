import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const secret = process.env.JWT_SECRET;

// Define protected and authentication routes
const authRoutes = ["/"];

export async function middleware(req) {
  // process.stdout.write("✅ Middleware running...\n"); // ✅ Debugging

  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  if (token && authRoutes.includes(pathname)) {
    const destination =
      token.role === "super_admin"
        ? "/admin/view-dues"
        : token.role === "student"
          ? "/student/view-dues"
          : "/manager/view-dues";
    return NextResponse.redirect(new URL(destination, req.url));
  }

  if (
    !token &&
    (pathname.startsWith("/admin") || pathname.startsWith("/student"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/student/:path*"], // ✅ Apply to all subpaths
};
