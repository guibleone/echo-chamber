"use client";
import React from "react";
import { BiConversation, BiHeart } from "react-icons/bi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { likePost } from "@/actions/posts";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

export default function Actions({ post }: { post: any }) {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex gap-3 text-sm">
      <Dialog>
        <DialogTrigger>
          <p className="flex group hover:text-blue-500 hover:cursor-pointer gap-1 items-center">
            <BiConversation />{" "}
            {!post?.comments?.length ? "0" : post?.comments?.length}{" "}
            <span className=" group-hover:text-blue-500 text-muted-foreground">
              Comentários
            </span>
          </p>
        </DialogTrigger>
        <DialogContent className="max-w-[330px] sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <textarea
                rows={5}
                placeholder="Comente algo"
                className="w-full p-2 placeholder:truncate placeholder:text-sm sm:text-md text-sm truncate bg-transparent text-muted-foreground sm:placeholder:text-md placeholder:text-muted-foreground focus:outline-none"
              />
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="ml-auto mt-5">
            <Button disabled={!session} size={"sm"}>
              Comentar
            </Button>
          </DialogDescription>
        </DialogContent>
      </Dialog>

      <form action={() => likePost(post.id)}>
        <Submit post={post} userId={user?.id!} />
      </form>

    </div>
  );
}

/* TODO: add useOptmistic from react to lie button in a new component */

function Submit({ post, userId }: { post: any; userId: string }) {
  const { pending } = useFormStatus();
  const isUserLiked = post?.likes?.some((like: any) => like.userId === userId);

  return (
    <button
      className={cn(
        pending && "cursor-not-allowed opacity-50",
        isUserLiked ? "text-destructive" : "hover:text-destructive",
       
      )}
    >
      <div className="flex items-center gap-2">
        <BiHeart /> {!post?.likes?.length ? "0" : post?.likes?.length} Curtidas
      </div>
    </button>
  );
}
