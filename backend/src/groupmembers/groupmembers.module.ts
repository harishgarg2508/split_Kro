import { Module } from '@nestjs/common';
import { GroupmembersService } from './groupmembers.service';
import { GroupmembersController } from './groupmembers.controller';
import { UserRepository } from 'src/repository/user.repository';
import { GroupsRepository } from 'src/repository/groups.repository';
import { GroupsMembersRepository } from 'src/repository/groupmember.repository';

@Module({
  controllers: [GroupmembersController],
  providers: [GroupmembersService,UserRepository,GroupsRepository,GroupsMembersRepository],
})
export class GroupmembersModule {}
