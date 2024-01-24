import MaxWidthWrapper from "@/components/max-width-warpper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Actions from "./actions";
import CommentsInput from "./comment-input";
import CommentsSection from "@/components/comments";
import { formatDateTimeWithTime } from "@/lib/utils";
import DeleteButton from "@/components/buttons/delete-button";
import { getCurrentUser } from "@/actions/data";
export default async function SinglePost({ post }: { post: any }) {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col py-5 gap-2">
      <div className="flex items-center gap-2">
        <Link href="/">
          <ArrowLeft />
        </Link>
        <h1 className="text-2xl font-bold">Post</h1>
      </div>
      <div className="flex gap-2 mt-3">
        <Avatar>
          <AvatarImage src={post.author.image} />
          <AvatarFallback>LG</AvatarFallback>
        </Avatar>
        <div className="flex gap-2 justify-between w-full">
          <p className="text-sm ">{post.author.name} </p>
          {user?.id === post.author.id && <DeleteButton id={post.id} />}
        </div>
      </div>
      <div className="mt-4">{post.content}</div>
      <div className="flex flex-col sm:flex-row sm:justify-between">
        <p className="text-muted-foreground text-sm">
          {formatDateTimeWithTime(post.createdAt)}{" "}
        </p>
        <div className="self-end mt-5">
          <Actions post={post} />
        </div>
      </div>
      <hr className="mt-2 mb-2" />
      <CommentsInput postId={post.id} />
      <hr className="mt-2 mb-2" />
      <CommentsSection postId={post.id} />
    </div>
  );
}
