import { Injectable } from "@nestjs/common";
import { Groups } from "src/groups/entities/group.entity";
import { DataSource, Repository } from "typeorm";
import { Category } from "src/category/entities/category.entity";

@Injectable()
export class GroupsRepository extends Repository<Groups> {
    constructor(private readonly dataSource: DataSource) {
        super(Groups, dataSource.createEntityManager());
    }

    async createAndSaveGroup(groupName: string, category:Category): Promise<Groups> {
        const group = this.create({
            groupName,
            category,
        });
  
         await this.save(group);
        return group;
    }
}

