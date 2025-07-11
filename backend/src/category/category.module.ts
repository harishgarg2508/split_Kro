import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { Repository } from 'typeorm';
import { CategoryRepository } from 'src/repository/category.repository';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService,CategoryRepository],
  exports:[CategoryService]
})
export class CategoryModule {}
