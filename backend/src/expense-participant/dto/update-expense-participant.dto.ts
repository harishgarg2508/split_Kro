import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseParticipantDto } from './create-expense-participant.dto';

export class UpdateExpenseParticipantDto extends PartialType(CreateExpenseParticipantDto) {}
