import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import Users from "@/app/models/users";
import connectToDB from "@/lib/db/mongodb";

const jwt_secret = process.env.JWT_SECRET;

const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 30 * 60, // 30 minutes session expiration
  },
  pages: {
    signIn: "/",
    error: "/auth/error",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectToDB();

          if (!credentials?.email || !credentials?.password) {
            throw new Error("Email and password are required");
          }

          const user = await Users.findOne({ email: credentials.email });

          if (
            !user ||
            !(await bcrypt.compare(credentials.password, user.password))
          ) {
            throw new Error("Invalid email or password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            role: user.role,
          };
        } catch (error) {
          console.error("Authentication error:", error.message);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user, // Preserve existing properties if any
          id: token.id,
          email: token.email,
          role: token.role,
        };
      }
      return session;
    },
  },

  secret: jwt_secret,

  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
