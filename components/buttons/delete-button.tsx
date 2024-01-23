"use client";
import React from "react";
import { Button } from "../ui/button";
import { BiTrash } from "react-icons/bi";
import { useFormStatus } from "react-dom";
import { deletePost } from "@/actions/posts";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant={"secondary"} size={"sm"}>
      <BiTrash size={20} />
    </Button>
  );
}

export default function DeleteButton({ id }: { id: string }) {
  return (
    <form action={() => deletePost(id)}>
      <Submit />
    </form>
  );
}
