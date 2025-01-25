"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { useEffect } from "react";

const Navbar = () => {
  const session = useSession();
  const router = useRouter();
  console.log("session", session);

  useEffect(() => {
    if (session?.status === "unauthenticated") {
      router.push("/");
    }
  }, [session, router]);
  return (
    <nav className="fixed top-0 w-full h-11 bg-transparent backdrop-blur-md text-white flex items-center px-6 z-50">
      {/* Left Side */}
      <div className="text-lg text-gray-900 font-semibold hidden md:block">AIChatBox</div>

      {/* Right Side */}

      <div className="flex items-center gap-2 ml-auto">
        <Button onClick={() => signOut()} size="sm">
          Sign Out
        </Button>
        <Avatar className="w-9 h-9 ">
          <AvatarImage
            src={`${session?.data && session?.data?.user?.image}`}
            alt="@shadcn"
          />
          <AvatarFallback>AI</AvatarFallback>
        </Avatar>
        <div className="flex flex-col text-black">
          <span className="text-xs">
            {session?.data && session?.data?.user?.email}
          </span>
          <span className="text-sm">
            {session?.data && session?.data?.user?.name}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
