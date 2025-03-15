"use server";

import { signIn, signOut } from "@/app/auth";
import { AuthError } from "next-auth";

export async function authenticate(prevState, formData) {
  const { username, password } = Object.fromEntries(formData);
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}

export async function handleSignOut() {
  await signOut();
}
