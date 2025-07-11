import { Category } from "src/category/entities/category.entity";
import { Expense } from "src/expenses/entities/expense.entity";
import { Groupmember } from "src/groupmembers/entities/groupmember.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('groups')
export class Groups {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    groupName: string

    @ManyToOne(() => Category, category => category.groups)
    category: Category

    @CreateDateColumn()
    createdAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @OneToMany(() => Groupmember, groupMember => groupMember.group)
    groupsMember: Groupmember[]

    @OneToMany(() => Expense, expense => expense.group)
    expense: Expense[]


}
