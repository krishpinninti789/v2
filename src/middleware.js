import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { redirect } from "next/navigation";

const secret = process.env.JWT_SECRET;

// Define protected and public routes
const protectedRoutes = ["/admin/*", "/student/*"];
const authRoutes = ["/"];

export async function middleware(req) {
  const token = await getToken({ req, secret });

  // Adjust this based on your auth system
  const { pathname } = req.nextUrl;

  // Redirect authenticated users away from auth pages (e.g., login, signup)
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/admin/add-students", req.url));
  }

  if (
    (!token && pathname.startsWith("/admin/add-students")) ||
    pathname.startsWith("/student/view-dues")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  // Continue processing the request
  return NextResponse.next();
}

// Apply middleware to specific routes
export const config = {
  matcher: ["/", "/admin/add-students"], // Add other routes as needed
};
