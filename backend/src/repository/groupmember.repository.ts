import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Groupmember } from "src/groupmembers/entities/groupmember.entity";
import { Groups } from "src/groups/entities/group.entity";
import { User } from "src/user/entities/user.entity";

@Injectable()
export class GroupsMembersRepository extends Repository<Groupmember> {
    constructor(private readonly dataSource: DataSource) {
        super(Groupmember, dataSource.createEntityManager());
    }

    async createAndSaveGroupMember(user: User, group: Groups) {
        const groupMember = this.create({ user, group });
        await this.save(groupMember);
        return groupMember;
      
    }

   async removeUserFromGroup(userId: number, groupId: number) {

   const deletedUser =  await this.delete({ user: { id: userId }, group: { id: groupId } });
    return deletedUser;
 
}
}

