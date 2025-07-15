import { ExpenseParticipant } from "src/expense-participant/entities/expense-participant.entity";
import { Groupmember } from "src/groupmembers/entities/groupmember.entity";
import { Settlement } from "src/settlement/entities/settlement.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";


@Entity('user')
@Unique(['email','isActive'])
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({nullable:true})
    avatar?: string

    @Column({default:true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedat: Date

    @OneToMany(()=>Groupmember,group=>group.user,{cascade:true})
    groupsMember:Groupmember[]

    @OneToMany(()=>ExpenseParticipant,participants=>participants.user,{cascade:true})
    expenseParticipants:ExpenseParticipant[]

    @OneToMany(()=>Settlement,settlement=>settlement.payer,{cascade:true})
    settlementPaid:Settlement[]

    @OneToMany(()=>Settlement,settlement=>settlement.payer,{cascade:true})
    settlementReceived:Settlement[]



}

