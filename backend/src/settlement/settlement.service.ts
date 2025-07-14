import { Injectable } from '@nestjs/common';
import { CreateSettlementDto } from './dto/create-settlement.dto';
import { UpdateSettlementDto } from './dto/update-settlement.dto';
import { SettlementRepository } from 'src/repository/settlement.repositoy';
import { ExpenseParticipantRepository } from 'src/repository/expenseParticipant.repository';

@Injectable()
export class SettlementService {
  constructor(
    private readonly settlementRepository: SettlementRepository,
    private readonly expenseParticipantrepository:ExpenseParticipantRepository, // Assuming this service is needed
  ){}
  create(createSettlementDto: CreateSettlementDto) {
    return 'This action adds a new settlement';
  }

  getAllSettlementOfUser(userId: number) {
    return this.expenseParticipantrepository.getSettlemetsOfUser(userId);
  }

  findOne(id: number) {
    return `This action returns a #${id} settlement`;
  }

  update(id: number, updateSettlementDto: UpdateSettlementDto) {
    return `This action updates a #${id} settlement`;
  }

  remove(id: number) {
    return `This action removes a #${id} settlement`;
  }
}
