import { ExpenseParticipant } from "src/expense-participant/entities/expense-participant.entity";
import { Groupmember } from "src/groupmembers/entities/groupmember.entity";
import { Settlement } from "src/settlement/entities/settlement.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('user')
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column({unique:true})
    email: string

    @Column()
    password: string

    @Column({nullable:true})
    avatar?: string

    @Column({default:true})
    isactive: boolean

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedat: Date

    @OneToMany(()=>Groupmember,group=>group.user)
    groupsMember:Groupmember[]

    @OneToMany(()=>ExpenseParticipant,participants=>participants.user)
    expenseParticipants:ExpenseParticipant[]

    @OneToMany(()=>Settlement,settlement=>settlement.payer)
    settlementPaid:Settlement[]

    @OneToMany(()=>Settlement,settlement=>settlement.payer)
    settlementReceived:Settlement[]



}
