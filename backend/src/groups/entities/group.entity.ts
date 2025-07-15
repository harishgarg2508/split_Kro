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
    
    @CreateDateColumn()
    createdAt: Date
    
    @DeleteDateColumn()
    deletedAt: Date
   
    @ManyToOne(() => Category, category => category.groups, { onDelete: 'CASCADE' })
    category: Category
    
    @OneToMany(() => Groupmember, groupMember => groupMember.group, { cascade: true })
    groupsMember: Groupmember[]

    @OneToMany(() => Expense, expense => expense.group, { cascade: true })
    expense: Expense[]


}
