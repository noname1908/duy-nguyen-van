import type { Post } from '@prisma/client';
import { prisma } from '../server';

export interface IPostPayload {
  title: string;
  content: string;
}

export interface IPostFilter {
  keyword?: string;
}

export const getPosts = async (filter: IPostFilter): Promise<Array<Post>> => {
  const { keyword = '' } = filter;
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: `${keyword}` } },
        { content: { contains: `${keyword}` } },
      ],
    },
  });
  return posts;
};

export const createPost = async (payload: IPostPayload): Promise<Post> => {
  const { title, content } = payload;
  const post = await prisma.post.create({
    data: {
      title,
      content,
    },
  });
  return post;
};

export const getPost = async (id: number): Promise<Post | null> => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(id),
    },
  });
  if (!post) return null;
  return post;
};

export const updatePost = async (
  id: number,
  payload: IPostPayload
): Promise<Post | null> => {
  const { title, content } = payload;
  try {
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
      },
    });
    return post;
  } catch (error) {
    return null;
  }
};

export const deletePost = async (id: number): Promise<Post | null> => {
  try {
    const post = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    return post;
  } catch (error) {
    return null;
  }
};
