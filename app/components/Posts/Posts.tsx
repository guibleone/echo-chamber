import CreatePost from "@/components/create-post";
import React from "react";
import { fetchPosts } from "@/actions/data";
import LoadMorePosts from "@/components/load-more-posts";
import SelectPosts from "@/components/select-posts";

export default async function Posts({ orderBy }: { orderBy: boolean }) {
  const posts = await fetchPosts(1, orderBy);

  return (
    <div className="flex flex-col gap-10 max-w-screen-lg mx-auto ">
      <CreatePost />
      <SelectPosts />
      <div className="grid grid-cols-1 pb-10">
        {posts}
        <LoadMorePosts />
      </div>
    </div>
  );
}
