import { Groups } from "src/groups/entities/group.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Settlement {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    amount:number

    @ManyToOne(()=>Groups)
    group:Groups;



    @Column()
    isSettled:boolean

    @Column()
    balance_with_group:number

    @Column()
    balance_with_User:number

    @ManyToOne(()=>User,user=>user.settlementPaid)
    payer:User;

    @ManyToOne(()=>User,user=>user.settlementReceived)
    receiver:User;

    @CreateDateColumn()
    settledAt:Date

    @DeleteDateColumn()
    deletedAt:Date
}
