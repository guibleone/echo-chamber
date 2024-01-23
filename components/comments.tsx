import React from "react";
import CommentCard from "./comment-card";
import { fetchComments } from "@/actions/data";
import LoadMore from "./load-more";

export default async function CommentsSection({ postId }: { postId: string }) {
  const comments = await fetchComments(postId, 1);

  return (
    <div>
      {comments}
      <LoadMore postId={postId} />
    </div>
  );
}
