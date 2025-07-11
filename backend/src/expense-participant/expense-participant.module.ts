import { Module } from '@nestjs/common';
import { ExpenseParticipantService } from './expense-participant.service';
import { ExpenseParticipantController } from './expense-participant.controller';

@Module({
  controllers: [ExpenseParticipantController],
  providers: [ExpenseParticipantService],
})
export class ExpenseParticipantModule {}
