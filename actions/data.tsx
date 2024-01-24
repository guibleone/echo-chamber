"use server";

import { auth } from "@/auth";
import CommentCard from "@/components/comment-card";
import { db } from "@/lib/db";

export const getCurrentUser = async () => {
  try {
    const currentUser = await auth();

    if (!currentUser) {
      return null;
    }

    const user = await db.user.findFirst({
      where: {
        email: currentUser.user?.email,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const fetchPosts = async () => {
  try {
    const posts = await db.post.findMany({
      include: {
        author: true,
        likes: true,
        comments: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return posts;
  } catch (error) {
    return null;
  }
};

export const fetchSinglePost = async (id: string) => {
  try {
    const post = await db.post.findUnique({
      where: {
        id,
      },
      include: {
        author: true,
        likes: true,
        comments: true,
      },
    });

    return post;
  } catch (error) {
    return null;
  }
};

export const fetchComments = async (postId: string, page: number) => {
  const response = await db.comment.findMany({
    where: {
      postId,
    },
    include:{
      author: true,
    },
    orderBy:{
      createdAt: "desc"
    },
    skip: (page - 1) * 10,
    take: 10,
  });


  if (response.length === 0) {
    return [];
  }

  return response.map((item: any, index: number) => (
    <CommentCard key={index} comment={item} index={index} />
  ));
};
