import CreatePost from "@/components/create-post";
import React from "react";
import PostCard from "./PostCard";
import { fetchPosts } from "@/actions/data";
import LoadMorePosts from "@/components/load-more-posts";

export default async function Posts() {
  const posts = await fetchPosts(1);

  return (
    <div className="flex flex-col gap-10 ">
      <CreatePost />
      <div className="grid grid-cols-1">
        {posts}

        <LoadMorePosts />
      </div>
    </div>
  );
}
