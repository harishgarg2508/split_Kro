// create-expense.dto.ts
import { IsNumber, IsString, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateExpenseParticipantDto } from 'src/expense-participant/dto/create-expense-participant.dto';

export class CreateExpenseDto {
  @IsNumber()
  amount: number;

  @IsString()
  description: string;

  @IsNumber()
  categoryId: number;

  @IsNumber()
  createdBy: number;

  @IsNumber()
  groupId: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateExpenseParticipantDto)
  participants?: CreateExpenseParticipantDto[];
}
