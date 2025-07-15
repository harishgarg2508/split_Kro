import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { GroupsRepository } from 'src/repository/groups.repository';
import { ExpenseParticipantRepository } from 'src/repository/expenseParticipant.repository';
import { ExpenseRepository } from 'src/repository/expense.repository';
import { UserRepository } from 'src/repository/user.repository';
import { CategoryRepository } from 'src/repository/category.repository';

@Injectable()
export class ExpensesService {
  constructor(
    private readonly expenseRepository: ExpenseRepository,
    private readonly expenseParticipantRepository: ExpenseParticipantRepository,
    private readonly groupRepository: GroupsRepository,
    private readonly userRepository: UserRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async createExpense(createExpenseDto: CreateExpenseDto) {
    const { amount, description, categoryId, createdBy, groupId, participants } = createExpenseDto;

    const category = await this.categoryRepository.findOne({ where: { id: categoryId } });
    if (!category) throw new NotFoundException('Category not found');

    const group = await this.groupRepository.findOne({ where: { id: groupId } });
    if (!group) throw new NotFoundException('Group not found');

    const user = await this.userRepository.findOne({ where: { id: createdBy } });
    if (!user) throw new NotFoundException('User not found');

    const expense = this.expenseRepository.create({
      amount,
      description,
      category,
      createdBy: user,
      group,
    });
    await this.expenseRepository.save(expense);

    if (participants && participants.length > 0) {
      for (const p of participants) {
        const participantUser = await this.userRepository.findOne({ where: { id: p.userId } });
        if (!participantUser) throw new NotFoundException(`User with id ${p.userId} not found`);

        const expenseParticipant = this.expenseParticipantRepository.create({
          paid: p.paid,
          owed: p.owed,
          expense: expense,
          user: participantUser,
        });

        await this.expenseParticipantRepository.save(expenseParticipant);
      }
    }

    return { message: 'Expense created successfully', expenseId: expense.id };
  }

  async getExpensesForUser(userId: number, groupId: number) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) throw new NotFoundException('User not found');

    return this.expenseRepository.find({
      where: {
        group: { id: groupId },
        expenseParticipant: {
          user: { id: userId },
        },
      },
      relations: ['category', 'createdBy', 'group', 'expenseParticipant', 'expenseParticipant.user'],
    });
  }

  findAll() {
    return `This action returns all expenses`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expense`;
  }

  update(id: number, updateExpenseDto: UpdateExpenseDto) {
    return `This action updates a #${id} expense`;
  }

  deleteExpense(id: number) {
    return this.expenseRepository.delete({ id });
  }
}
