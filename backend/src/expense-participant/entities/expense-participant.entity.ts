import { Expense } from "src/expenses/entities/expense.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExpenseParticipant {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    paid:number

    @Column()
    owed:number

    @ManyToOne(()=>Expense,expense=>expense.expenseParticipant)
    expense:Expense;

    @ManyToOne(()=>User,user=>user.expenseParticipants)
    user:User;

    

}
