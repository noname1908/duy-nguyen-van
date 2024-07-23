import { Post as PostModel } from '@prisma/client';
import { Body, Delete, Get, Path, Post, Put, Query, Route, Tags } from 'tsoa';
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from '../repositories/PostRepository';

export interface IPostPayload {
  title: string;
  content: string;
}

@Route('posts')
@Tags('Post')
export default class PostController {
  @Get('/')
  public async index(@Query() keyword?: string): Promise<Array<PostModel>> {
    return getPosts({ keyword });
  }

  @Post('/')
  public async store(@Body() body: IPostPayload): Promise<PostModel> {
    return createPost(body);
  }

  @Get('/:id')
  public async show(@Path() id: string): Promise<PostModel | null> {
    return getPost(Number(id));
  }

  @Put('/:id')
  public async update(
    @Path() id: string,
    @Body() body: IPostPayload
  ): Promise<PostModel | null> {
    return updatePost(Number(id), body);
  }

  @Delete('/:id')
  public async destroy(@Path() id: string): Promise<PostModel | null> {
    return deletePost(Number(id));
  }
}
