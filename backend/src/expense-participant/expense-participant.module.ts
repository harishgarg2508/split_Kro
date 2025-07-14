import { Module } from '@nestjs/common';
import { ExpenseParticipantService } from './expense-participant.service';
import { ExpenseParticipantController } from './expense-participant.controller';
import { ExpenseParticipantRepository } from 'src/repository/expenseParticipant.repository';

@Module({
  controllers: [ExpenseParticipantController],
  providers: [ExpenseParticipantService,ExpenseParticipantRepository],
})
export class ExpenseParticipantModule {}
