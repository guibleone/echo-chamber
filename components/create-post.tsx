"use client";
import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSession } from "next-auth/react";

import { State, createPost } from "@/actions/posts";
import { useFormState, useFormStatus } from "react-dom";

export function Submit({ session }: { session: any }) {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={!session || pending}
      className="w-full md:self-end md:w-20 mt-4"
      size="sm"
    >
      Postar
    </Button>
  );
}

export default function CreatePost() {
  const { data: session } = useSession();

  const initalState = {
    error: null,
  };
  const [state, dispatch] = useFormState<State, FormData>(
    createPost,
    initalState
  );

  return (
    <form className="border-b py-6 flex flex-col" action={dispatch}>
      <Input
        className="w-full px-4 py-2"
        type="text"
        placeholder="Progamando o que hoje ?"
        name="content"
      />

      {state?.error && (
        <p className="text-sm text-center text-red-500 mt-2">{state.error}</p>
      )}

      {!session && (
        <p className="text-muted-foreground text-sm text-center sm:text-end mt-2">
          Para postar você precisa estar logado
        </p>
      )}

      <Submit session={session} />
    </form>
  );
}
