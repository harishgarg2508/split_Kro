import { Injectable } from "@nestjs/common";
import { Category } from "src/category/entities/category.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class CategoryRepository extends Repository<Category> {

    private categories = ['PARTY', 'BIRTHDAY', 'TRAVEL', 'FOOD']

    constructor(private readonly dataSource: DataSource) {
        super(Category, dataSource.createEntityManager());
    }

    async createCategory() {

        const categoriesToCreate = this.categories.map(categoryName => this.create({ categoryName }))
        const categories = await Promise.all(categoriesToCreate)
        await this.save(categories)

        return categories


    }

}