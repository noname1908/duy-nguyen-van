import { Request, Response } from 'express';
import { prisma } from '../server';

const store = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: {
        title,
        content,
      },
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const index = async (req: Request, res: Response) => {
  try {
    const { keyword } = req.query;
    const posts = await prisma.post.findMany({
      where: {
        OR: [
          { title: { contains: `${keyword}` } },
          { content: { contains: `${keyword}` } },
        ],
      },
    });
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const update = async (req: Request, res: Response) => {
  try {
    const { id, title, content } = req.body;
    const post = await prisma.post.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        content,
      },
    });
    res.status(200).json(post);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const deletedPost = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });
    res.status(200).json(deletedPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

export default {
  store,
  index,
  show,
  update,
  destroy,
};
