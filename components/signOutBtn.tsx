"use client";

import { signOut } from "@/lib/auth/auth-client";
import { DropdownMenuItem } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Alert } from "./ui/alert";

export default function SignOutBtn() {
  const router = useRouter();

  return (
    <DropdownMenuItem
      onClick={async () => {
        const result = await signOut();
        if (result.data) {
          router.push("/signin");
        }else{
            <Alert>
                Error Signing Out
            </Alert>
        }
      }}
    >
      Log Out
    </DropdownMenuItem>
  );
}
