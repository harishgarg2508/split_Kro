import { Module } from '@nestjs/common';
import { SettlementService } from './settlement.service';
import { SettlementController } from './settlement.controller';
import { SettlementRepository } from 'src/repository/settlement.repositoy';
import { ExpenseParticipantRepository } from 'src/repository/expenseParticipant.repository';

@Module({
  controllers: [SettlementController],
  providers: [SettlementService,SettlementRepository,ExpenseParticipantRepository],
})
export class SettlementModule {}
