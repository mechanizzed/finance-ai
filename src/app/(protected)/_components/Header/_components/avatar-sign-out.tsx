"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { UserInfoProps } from "../_types/user-info.types";
import { LogOut, Mail } from "lucide-react";
import Loading from "@/app/loading";

export function AvatarSignOut({ user }: UserInfoProps) {
  const router = useRouter();

  async function handleSignOut() {
    await authClient.signOut({
      fetchOptions: {
        onRequest: () => {
          <Loading />;
        },
        onSuccess: () => {
          router.replace("/sign-in");
        },
      },
    });
  }

  const getShortName = user.name.slice(0, 2);

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarFallback>
            <span className="font-bold uppercase">{getShortName}</span>
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent>
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-primary text-center text-lg font-bold">
            {user.name}
          </p>
          <p className="text-muted-foreground flex items-center gap-1 text-sm">
            <Mail size={14} />
            {user.email}
          </p>
          <Separator className="my-4" />
          <Button variant="ghost" onClick={handleSignOut}>
            <LogOut /> Sair
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
