import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ArticlesService } from './articles.service';

@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  create(@Body() data: Prisma.ArticleCreateInput) {
    return this.articlesService.createArticle(data);
  }

  @Get()
  findAll() {
    return this.articlesService.findAllArticles();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOneArticle(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Prisma.ArticleUpdateInput) {
    return this.articlesService.updateArticle(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.deleteArticle(+id);
  }
}
