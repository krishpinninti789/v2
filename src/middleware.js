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

// import { withAuth } from "next-auth/middleware";
// import { NextResponse } from "next/server";

// export default withAuth(
//   function middleware(req) {
//     const { nextUrl } = req;
//     const session = req.nextauth.token; // Get session from token

//     // If no session, redirect to home page
//     if (!session) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     // Check user role for protected routes
//     // const userRole = session.role; // Role should be set in the session
//     const userRole = session?.token?.token?.user?.role;

//     if (
//       nextUrl.pathname.startsWith("/student/view") &&
//       userRole !== "student"
//     ) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     if (
//       nextUrl.pathname.startsWith("/admin/viewdues") &&
//       userRole !== "admin"
//     ) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     return NextResponse.next();
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => !!token, // Allow access only if token exists
//     },
//   }
// );
