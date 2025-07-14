"use client";
import { authenticate } from "@/app/lib/actions";
import React, { useActionState, useState } from "react";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
  const [errorMessage, formAction, isPending] = useActionState(
    authenticate,
    undefined
  );
  return (
    <div className="bg-gray-800 w-screen h-screen flex items-center justify-center">
      <form action={formAction} className=" login_form ">
        <h1 className="text-3xl font-bold">Login</h1>
        <input type="text" placeholder="Username" name="username" />
        <input type="password" placeholder="Password" name="password" />
        <input type="hidden" name="redirectTo" value={callbackUrl} />

        <button
          aria-disabled={isPending}
          type="submit"
          className=" mx-8 mt-10 disabled:bg-[#516284]"
        >
          {isPending ? "Verifying..." : "Submit"}
        </button>
        {errorMessage && <div className="text-red-400">{errorMessage}</div>}
      </form>
    </div>
  );
}

export default LoginForm;
