import CreatePost from "@/components/create-post";
import React from "react";
import PostCard from "./PostCard";
import { fetchPosts } from "@/actions/data";

export default async function Posts() {
  const posts = await fetchPosts();
  
  return (
    <div className="flex flex-col gap-10 ">
        <CreatePost />
      <div className="grid grid-cols-1">

        {posts?.length === 0 && (
          <h1 className="text-center">
            Não há posts para mostrar. Seja o primeiro a criar um!
          </h1>
        )}
        {posts?.slice(0,10).map((post: any) => (
         <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
