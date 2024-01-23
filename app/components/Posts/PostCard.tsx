"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BiConversation, BiHeart } from "react-icons/bi";
import Actions from "./actions";
import { useRouter } from "next/navigation";
import { formatDateTime } from "@/lib/utils";

export default function PostCard({ post }: { post: any }) {
  const router = useRouter();
  const onClickPost = () => {
    router.push(`/posts/${post.id}`);
  };

  return (
    <div className="hover:cursor-pointer border px-6 py-5">
      <div onClick={onClickPost}>
        <div className="flex gap-2 ">
          <Avatar>
            <AvatarImage src={post.author.image} />
            <AvatarFallback>LG</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-2">
            <p className="text-sm ">
              {post.author.name}{" "}
              <span className="text-muted-foreground">
                {" "}
                - {formatDateTime(post.createdAt)}{" "}
              </span>
            </p>
            <h2 className="text-sm line-clamp-3">{post.content}</h2>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-4 sm:justify-end">
        <Actions post={post} />
      </div>
    </div>
  );
}
