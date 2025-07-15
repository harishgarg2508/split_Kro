import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GroupmembersService } from './groupmembers.service';
import { CreateGroupmemberDto } from './dto/create-groupmember.dto';
import { UpdateGroupmemberDto } from './dto/update-groupmember.dto';
@Controller('groupmembers')
export class GroupmembersController {
  constructor(private readonly groupmembersService: GroupmembersService) {}

  @Post('add')
  addUserToGroup(@Body() data: CreateGroupmemberDto) {
    return this.groupmembersService.addUserToGroup(data);
  }

  @Delete('remove/:groupId/:userId')
  removeUserFromGroup(@Param() data: CreateGroupmemberDto) {
    return this.groupmembersService.removeUserFromGroup(data);
  }

  @Get('all/:id')
  getAllGroupMembers(@Param('id') groupId: number) {
    return this.groupmembersService.getAllGroupMembers(groupId);
  }

  @Get()
  findAll() {
    return this.groupmembersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupmembersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupmemberDto: UpdateGroupmemberDto,
  ) {
    return this.groupmembersService.update(+id, updateGroupmemberDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupmembersService.remove(+id);
  }
}
