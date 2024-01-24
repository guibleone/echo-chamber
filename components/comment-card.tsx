"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { motion } from "framer-motion";
import { formatDateTime } from "@/lib/utils";

const variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export default function CommentCard({
  comment,
  index,
}: {
  comment: any;
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
      className="flex gap-2 border px-4 py-3"
    >
      <Avatar>
        <AvatarImage src={comment.author.image} />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-2">
        <p className="text-sm ">
         {comment.author.name}<span className="text-muted-foreground"> - {formatDateTime(comment.createdAt)}</span>
        </p>
        <h2 className="text-sm line-clamp-3">
         {comment.content}
        </h2>
      </div>
    </motion.div>
  );
}
