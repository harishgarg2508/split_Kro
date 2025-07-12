import { Module } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { GroupsRepository } from 'src/repository/groups.repository';
import { CategoryRepository } from 'src/repository/category.repository';

@Module({
  controllers: [GroupsController],
  providers: [GroupsService,GroupsRepository,CategoryRepository],
})
export class GroupsModule {}
