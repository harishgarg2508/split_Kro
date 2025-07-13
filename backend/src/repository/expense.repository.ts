import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { Expense } from "src/expenses/entities/expense.entity";
import { CreateExpenseDto } from "src/expenses/dto/create-expense.dto";
import { Category } from "src/category/entities/category.entity";
import { User } from "src/user/entities/user.entity";
import { Groups } from "src/groups/entities/group.entity";

@Injectable()
export class ExpenseRepository extends Repository<Expense> {
    constructor(dataSource: DataSource) {
        super(Expense, dataSource.createEntityManager());
    }

async createAndSaveExpense(expenseDetails: {
    amount: number,
    description: string,
    category: Category,
    createdBy: User,
    group: Groups
}) {
    const expense = this.create(expenseDetails);
    await this.save(expense);
    return expense;
}



}

