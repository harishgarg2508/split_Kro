import { Injectable } from '@nestjs/common';
import { CreateExpenseParticipantDto } from './dto/create-expense-participant.dto';
import { UpdateExpenseParticipantDto } from './dto/update-expense-participant.dto';
import { ExpenseParticipantRepository } from 'src/repository/expenseParticipant.repository';

@Injectable()
export class ExpenseParticipantService {
  constructor(private readonly expenseParticipantRepository:ExpenseParticipantRepository ){}
  // create(createExpenseParticipantDto: CreateExpenseParticipantDto) {
  //   return this.expenseParticipantRepository.createAndSaveParticipants(createExpenseParticipantDto);
  // }

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
