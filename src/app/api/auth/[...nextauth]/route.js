import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import Users from "@/app/models/users";
import connectToDB from "@/lib/db/mongodb";
import { NextResponse } from "next/server";

const jwt_secret = process.env.JWT_SECRET;

const authOptions = {
  session: {
    strategy: "jwt",
    maxAge: 10 * 60,
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
        await connectToDB();

        const { email, password } = credentials;

        const user = await Users.findOne({ email: credentials?.email });
        console.log(user);

        if (
          user &&
          (await bcrypt.compare(credentials.password, user.password))
        ) {
          return {
            id: user._id.toString(), // Ensure `id` is a string
            email: user.email,
            role: user.role,
          };
        }

        // return NextResponse.json({
        //   message: "succesfully login",
        //   success: true,
        // });
      },
    }),
  ],

  // pages: {
  //   signIn: "/signin",
  //   signOut: "/signout",
  //   error: "/error",
  // },

  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.role = user.role;
        token.accessToken = jwt.sign(
          { id: user._id, email: user.email },
          jwt_secret,
          { expiresIn: "10m" }
        );
      }
      // console.log("token", token);
      return token;
    },
    async session(session, token) {
      if (token?.id) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.role = token.role;
      }
      // console.log("session", session);
      return session;
    },
  },
  secret: jwt_secret,

  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
