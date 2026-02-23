"use client";

import { ArrowRight, Briefcase } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import SignOutBtn from "./signOutBtn";
import { useSession } from "@/lib/auth/auth-client";

export default function NavBar() {
  const { data: session } = useSession();

  return (
    <nav className="border-b border-gray-100 bg-white px-10">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-primary cursor-pointer"
        >
          <Briefcase size={20} />
          <p className="text-xl font-semibold">Job Application Tracker</p>
        </Link>

        <div className="flex items-center gap-4">
          {session?.user ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-white">
                        {session?.user?.name?.charAt(0)?.toUpperCase() || ""}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                  <DropdownMenuLabel>
                    <div>
                      <p>{session?.user?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {session?.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <SignOutBtn />
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/signin">
                <Button
                  variant="ghost"
                  className="flex text-gray-700 hover:text-black border border-gray-400 px-4 rounded-md py-2 cursor-pointer"
                >
                  Login
                </Button>
              </Link>

              <Link href="/signup">
                <Button size="lg">
                  Get Started <ArrowRight className="ml-2" />
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
