import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ExpenseParticipant } from "src/expense-participant/entities/expense-participant.entity";
import { CreateExpenseParticipantDto } from "src/expense-participant/dto/create-expense-participant.dto";
import { Expense } from "src/expenses/entities/expense.entity";

@Injectable()
export class ExpenseParticipantRepository extends Repository<ExpenseParticipant> {
    constructor(private readonly dataSource: DataSource) {
        super(ExpenseParticipant, dataSource.createEntityManager());
    }

    async createExpenseParticipants(participants: CreateExpenseParticipantDto[], expense: Expense): Promise<ExpenseParticipant[]> {
        const expenseParticipants = participants.map(participant => {
            return this.create({
                paid: participant.paid,
                owed: participant.owed,
                expense: expense,
                user: { id: participant.userId },
            });
        });
        return this.save(expenseParticipants);
    }

    async getSettlemetsOfUser(userId: number): Promise<ExpenseParticipant[]> {
        return this.find({
            where: { user: { id: userId } },
            relations: ['expense', 'expense.expenseParticipant', 'expense.expenseParticipant.user', 'expense.expenseParticipant.expense', 'expense.expenseParticipant.user.expenseParticipants'],
        });
    }
}

