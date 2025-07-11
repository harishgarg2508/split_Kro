import { Injectable } from '@nestjs/common';
import { CreateGroupmemberDto } from './dto/create-groupmember.dto';
import { UpdateGroupmemberDto } from './dto/update-groupmember.dto';

@Injectable()
export class GroupmembersService {
  create(createGroupmemberDto: CreateGroupmemberDto) {
    return 'This action adds a new groupmember';
  }

  findAll() {
    return `This action returns all groupmembers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} groupmember`;
  }

  update(id: number, updateGroupmemberDto: UpdateGroupmemberDto) {
    return `This action updates a #${id} groupmember`;
  }

  remove(id: number) {
    return `This action removes a #${id} groupmember`;
  }
}
