"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { z } from "zod";
import { getCurrentUser } from "./data";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

const FromSchema = z.object({
  content: z.string().min(1),
});

export type State = {
  error?: string | null;
  message?: string | null;
};
export async function createPost(prevState: State, formData: FormData) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return {
      error: "Usuário não logado",
    };
  }

  const validatedFields = FromSchema.safeParse({
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      error: "Insira um conteúdo válido",
    };
  }

  if (!currentUser) {
    return {
      error: "Usuário não logado",
    };
  }

  const { content } = validatedFields.data;

  try {
    await db.post.create({
      data: {
        content,
        authorId: currentUser.id,
      },
    });
  } catch (error) {
    console.log(error);
    return {
      error: "Erro ao criar post",
    };
  }

  revalidateTag("posts");
  redirect("/");
}

export async function deletePost(postId: string) {
  try {
    await db.post.delete({
      where: {
        id: postId,
      },
    });
  } catch (error) {
    throw new Error("Erro ao deletar post");
  }

  revalidateTag("posts");
  redirect("/");
}

// dar like no post
export const likePost = async (postId: string) => {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        error: "Usuário não logado",
      };
    }

    const post = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!post) {
      return {
        error: "Post não encontrado",
      };
    }

    const like = await db.like.findFirst({
      where: {
        postId,
        authorId: currentUser.id,
      },
    });

    if (like) {
      await db.like.delete({
        where: {
          id: like.id,
        },
      });
    } else {
      await db.like.create({
        data: {
          authorId: currentUser.id,
          postId,
        },
      });
    }
  } catch (error) {
    throw new Error("Erro ao dar like no post");
  }

  revalidateTag("posts");
};

// criar comentário

const CommentSchema = z.object({
  content: z.string().min(1),
});

export async function createComment(
  postId: string,
  prevState: State,
  formData: FormData
) {
  try {

    const validatedFields = CommentSchema.safeParse({
      content: formData.get("content"),
    });

    if (!validatedFields.success) {
      return {
        error: "Insira um conteúdo válido",
      };
    }

    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return {
        error: "Usuário não logado",
      };
    }

    const { content } = validatedFields.data;

    await db.comment.create({
      data: {
        content,
        authorId: currentUser.id,
        postId,
      },
    });
    
    
  } catch (error) {
    throw new Error("Erro ao criar comentário");
    
  }

  revalidateTag("posts");
}
