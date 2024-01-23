import { fetchSinglePost } from "@/actions/data";
import SinglePost from "@/app/components/Posts/SinglePost";
import React from "react";

export default async function PostPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const post = await fetchSinglePost(id);

  return (
    <div>
      <SinglePost post={post} />
    </div>
  );
}
