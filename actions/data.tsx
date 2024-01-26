"use server";

import PostCard from "@/app/components/Posts/PostCard";
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

export const fetchPosts = async (page: number) => {
  const response = await db.post.findMany({
    include: {
      author: true,
      likes: true,
      comments: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: (page - 1) * 10,
    take: 10,
  });

  if (response.length === 0) {
    return [];
  }

  return response.map((item: any, index: number) => (
    <PostCard key={index} post={item} index={index} />
  ));
};

export const fetchComments = async (postId: string, page: number) => {
  const response = await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      author: true,
    },
    orderBy: {
      createdAt: "desc",
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

// pesquisa por pessoas, posts e tags

export const fetchSearchResults = async (query: string) => {
  const posts = await db.post.findMany({
    where: {
      OR: [
        {
          content: {
            contains: query,
            mode: "insensitive",
          },
        },  
      ],
    },
  });

  const users = await db.user.findMany({
    where: {
      OR: [
        {
          name: {
            contains: query,
            mode: "insensitive",
          },
        },
      ],
    },
  });

  return {
    posts,
    users,
  };
};
