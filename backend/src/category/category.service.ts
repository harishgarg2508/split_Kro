import { Injectable } from '@nestjs/common';
import { CategoryRepository } from 'src/repository/category.repository';

@Injectable()
export class CategoryService {

  constructor(private readonly categoryRepo:CategoryRepository){}
  async createCategory() {
   
    const categories = await this.categoryRepo.createCategory()
    return categories;
  }


}
