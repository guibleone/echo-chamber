"use client";
import { createComment } from "@/actions/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";

function Submit({ session }: { session: any }) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending || !session} size={"sm"}>
      Comentar
    </Button>
  );
}

export default function CommentsInput({ postId }: { postId: any }) {
  const { data: session } = useSession();

  const initialState = { message: null };
  const commentWithId = createComment.bind(null, postId);
  // @ts-ignore
  const [state, dispatch] = useFormState(commentWithId, initialState);

  return (
    <>
      {!session ? (
        <p className="text-muted-foreground text-sm text-center m-4">
          Para comentar você precisa estar logado
        </p>
      ) : (
        <div className="flex gap-2">
          <Avatar>
            <AvatarImage src={session?.user?.image!} />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>

          <form className="flex justify-between w-full gap-2" action={dispatch}>
            <input
              type="text"
              name="content"
              placeholder="Comente algo"
              className="w-full p-2 placeholder:truncate placeholder:text-sm sm:text-md text-sm truncate bg-transparent text-muted-foreground sm:placeholder:text-md placeholder:text-muted-foreground focus:outline-none"
            />

            <Submit session={session} />

          </form>
        </div>
      )}
    </>
  );
}
