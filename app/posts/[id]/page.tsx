import { fetchSinglePost } from "@/actions/data";
import Navbar from "@/app/components/Navbar";
import SinglePost from "@/app/components/Posts/SinglePost";
import MaxWidthWrapper from "@/components/max-width-warpper";
import React from "react";

export default async function PostPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = params;

  const post = await fetchSinglePost(id);

  const query = searchParams.query?.toString() || "";

  return (
    <div>
      <Navbar query={query} />
      <MaxWidthWrapper className="max-w-screen-lg">
        <SinglePost post={post} />
      </MaxWidthWrapper>
    </div>
  );
}
