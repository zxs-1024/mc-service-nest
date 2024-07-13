import { Injectable } from '@nestjs/common';
import { Article, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  async createArticle(data: Prisma.ArticleCreateInput): Promise<Article> {
    return this.prisma.article.create({ data });
  }

  async findAllArticles(): Promise<Article[]> {
    return this.prisma.article.findMany();
  }

  async findOneArticle(id: number): Promise<Article | null> {
    return this.prisma.article.findUnique({ where: { id } });
  }

  async updateArticle(
    id: number,
    data: Prisma.ArticleUpdateInput,
  ): Promise<Article> {
    return this.prisma.article.update({
      where: { id },
      data,
    });
  }

  async deleteArticle(id: number): Promise<Article> {
    return this.prisma.article.delete({ where: { id } });
  }
}
