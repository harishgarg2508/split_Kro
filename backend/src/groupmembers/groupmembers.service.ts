import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupmemberDto } from './dto/create-groupmember.dto';
import { UpdateGroupmemberDto } from './dto/update-groupmember.dto';
import { UserRepository } from 'src/repository/user.repository';
import { GroupsRepository } from 'src/repository/groups.repository';
import { GroupsMembersRepository } from 'src/repository/groupmember.repository';

@Injectable()
export class GroupmembersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly groupsRepository: GroupsRepository,
    private readonly groupmembersRepository: GroupsMembersRepository,
  ) {}
  async addUserToGroup(data: CreateGroupmemberDto) {
    const { userId, groupId } = data;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const group = await this.groupsRepository.findOne({
      where: { id: groupId },
    });
    if (!group) throw new NotFoundException('Group not found');

    return this.groupmembersRepository.createAndSaveGroupMember(user, group);
  }

  async removeUserFromGroup(data: CreateGroupmemberDto) {
    const { userId, groupId } = data;
    const user = await this.userRepository.findOne({ where: { id: userId } });
    const group = await this.groupsRepository.findOne({
      where: { id: groupId },
    });

    if (!group || !user) {
      throw new NotFoundException('Group or user not found');
    }

    const groupMember = await this.groupmembersRepository.findOne({
      where: { user: { id: user.id }, group: { id: group.id } },
    });
    if (!groupMember) throw new NotFoundException('Group member not found');

    return this.groupmembersRepository.removeUserFromGroup(user.id, group.id);
  }

  async getAllGroupMembers(groupId: number) {
    return this.groupmembersRepository.getAllGroupMembers(groupId);
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
