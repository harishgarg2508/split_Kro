import { Injectable } from '@nestjs/common';
import { CreateExpenseParticipantDto } from './dto/create-expense-participant.dto';
import { UpdateExpenseParticipantDto } from './dto/update-expense-participant.dto';

@Injectable()
export class ExpenseParticipantService {
  create(createExpenseParticipantDto: CreateExpenseParticipantDto) {
    return 'This action adds a new expenseParticipant';
  }

  findAll() {
    return `This action returns all expenseParticipant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} expenseParticipant`;
  }

  update(id: number, updateExpenseParticipantDto: UpdateExpenseParticipantDto) {
    return `This action updates a #${id} expenseParticipant`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseParticipant`;
  }
}
