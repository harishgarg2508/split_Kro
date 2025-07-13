import { Module } from '@nestjs/common';
import { ExpensesService } from './expenses.service';
import { ExpensesController } from './expenses.controller';
import { ExpenseRepository } from 'src/repository/expense.repository';
import { ExpenseParticipantRepository } from 'src/repository/expenseParticipant.repository';
import { GroupsRepository } from 'src/repository/groups.repository';
import { UserRepository } from 'src/repository/user.repository';
import { CategoryRepository } from 'src/repository/category.repository';

@Module({
  controllers: [ExpensesController],
  providers: [
    ExpensesService,
    ExpenseRepository,
    ExpenseParticipantRepository,
    GroupsRepository,
    UserRepository,
    CategoryRepository,
  ],
})
export class ExpensesModule {}
