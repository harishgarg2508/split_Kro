import { Groups } from "src/groups/entities/group.entity";
import { User } from "src/user/entities/user.entity";
import { CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('group_members')
export class Groupmember {

    @PrimaryGeneratedColumn()
    id:number

    @CreateDateColumn()
    createdAt:Date

    @DeleteDateColumn()
    deletedAt:Date

    @ManyToOne(()=>User,user=>user.groupsMember)
    user:User;

    @ManyToOne(()=>Groups,group=>group.groupsMember)
    group:Groups;


}
