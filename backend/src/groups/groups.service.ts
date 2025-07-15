import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupsRepository } from 'src/repository/groups.repository';
import { CategoryRepository } from 'src/repository/category.repository';

@Injectable()
export class GroupsService {
  constructor(private readonly groupsRepository: GroupsRepository,
    private readonly categoryRepository:CategoryRepository
  ) {}
  async create(groupDetails: CreateGroupDto) {

    const {groupName,categoryId} = groupDetails
    const category = await this.categoryRepository.findOne({where:{id:categoryId}})
    if(!category){
      throw new NotFoundException('Category not found')
    }
    return this.groupsRepository.createAndSaveGroup(groupName,category)

    
  }

  async getGroupSummary(groupId:number){
    const group = await this.groupsRepository.findOne({ where: { id: groupId } });
    if(!group){
      throw new NotFoundException(`Group with ${groupId} not found`)

    }
    return this.groupsRepository.getGroupSummary(groupId)

  }

  getAllGroups() {
    return this.groupsRepository.retrieveAllGroups();
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return `This action updates a #${id} group`;
  }

  deleteGroupById(id: number) {
    return this.groupsRepository.delete(id)
  }
}
