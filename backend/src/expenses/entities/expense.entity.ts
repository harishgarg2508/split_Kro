import { Category } from "src/category/entities/category.entity";
import { ExpenseParticipant } from "src/expense-participant/entities/expense-participant.entity";
import { Groups } from "src/groups/entities/group.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('expense')
export class Expense {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    amount: number;

    @Column()
    description: string;

    @ManyToOne(() => Category, category => category.expense, { onDelete: 'CASCADE' })
    category: Category;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    createdBy: User;

    @ManyToOne(() => Groups, group => group.expense, { onDelete: 'CASCADE' })
    group: Groups;

    @OneToMany(() => ExpenseParticipant, participant => participant.expense, { cascade: true })
    expenseParticipant: ExpenseParticipant[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}

