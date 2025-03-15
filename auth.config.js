import { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnLoginPage = request.nextUrl.pathname.startsWith("/login");
      if (!isLoggedIn) return false;
      if (isOnLoginPage)
        return Response.redirect(new URL("/", request.nextUrl));
      return true; // Redirect unauthenticated users to login page
    },
  },
  providers: [], // Add providers with an empty array for now
};
