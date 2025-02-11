import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
// import { MongoClient } from "mongodb";
import Users from "@/app/models/users";
import connectToDB from "@/lib/db/mongodb";
import { NextResponse } from "next/server";

// MongoDB connection
// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);

const jwt_secret = process.env.JWT_SECRET;

const authOptions = {
  session: {
    strategy: "jwt",
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
        //   const db = client.db("your_database_name"); // Replace with your database name
        //   const usersCollection = db.collection("users");

        const { email, password } = credentials;

        // console.log("credentials", credentials);
        // console.log("email", email);

        // Find user by email
        const user = await Users.findOne({ email: credentials?.email });

        // console.log("user", user);

        if (user) {
          // Compare hashed password
          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          // console.log("isValid", isValid);

          return NextResponse.json({
            message: "succesfully login",
            success: true,
          });
        }
      },
    }),
  ],

  // Customize pages (optional)
  pages: {
    signIn: "/signin",
    signOut: "/signout",
    error: "/error", // Error code passed in query string as ?error=
  },

  // Callbacks (optional)
  callbacks: {
    async jwt(token, user) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.accessToken = jwt.sign(
          { id: user.id, email: user.email },
          jwt_secret,
          { expiresIn: "1h" }
        );
      }

      // console.log(token);
      return token;
    },
    async session(session, token) {
      session.user.id = token.id;
      session.user.email = token.email;
      // console.log(session);

      return session;
    },
  },
  secret: jwt_secret,

  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
