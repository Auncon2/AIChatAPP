"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  console.log("session", session);
  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/chatapp");
    }
  }, [session, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-xs bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-white mb-4">
          LOGIN
        </h1>

        <Button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring focus:ring-blue-500 py-2 px-4 rounded-md font-medium shadow-sm transition duration-150 ease-in-out"
        >
          <FcGoogle size={24} />
          Login with Google
        </Button>
        <p className="text-center text-white text-sm mt-6">
          By signing in, you agree to our
          <a href="#" className="text-blue-500 hover:underline ml-1 mr-1">
            Terms of Service
          </a>
          and
          <a href="#" className="text-blue-500 hover:underline ml-1">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
