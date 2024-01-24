"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Actions from "./actions";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import { motion } from "framer-motion";

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export default function PostCard({
  post,
  index,
}: {
  post: any;
  index: number;
}) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      transition={{
        delay: 0.1 * index,
        duration: 0.2,
        ease: "easeInOut",
      }}
      className="flex flex-col"
    >
      <Link
        className="hover:cursor-pointer border px-6 py-5"
        href={`/posts/${post.id}`}
      >
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
      </Link>
      <div className="flex justify-center mt-4 sm:justify-end mb-4">
        <Actions post={post} />
      </div>
    </motion.div>
  );
}
