"use server";

import NextAuth from "next-auth";
import { authConfig } from "../auth.config";
import Credentials from "next-auth/providers/credentials";
import { mongooseConnection } from "@/app/lib/mongoose";
import { User } from "@/models/User";
import bcrypt from "bcrypt";

async function login({ username, password }) {
  try {
    await mongooseConnection();
    const user = await User.findOne({ name: username });

    if (!user) {
      console.log("User not found.");
      return null;
    }

    const isPasswordMatching = await bcrypt.compare(password, user.password);
    if (!isPasswordMatching) {
      console.log("Incorrect password.");
      return null;
    }

    return {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      img: user.img,
    };
  } catch (err) {
    console.error("Login error:", err);
    return null;
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log("Missing credentials.");
          return null;
        }
        return await login({
          username: credentials.username,
          password: credentials.password,
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // Store user ID
        token.name = user.name;
        token.img = user.img;
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id; // Pass user ID to session
      session.user.name = token.name;
      session.user.img = token.img;
      session.user.isAdmin = token.isAdmin;
      return session;
    },
  },
});
