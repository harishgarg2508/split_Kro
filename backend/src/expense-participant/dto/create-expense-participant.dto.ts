import { IsNumber, IsOptional, IsDecimal } from "class-validator";

export class CreateExpenseParticipantDto {

  @IsNumber()
  userId: number;

  @IsDecimal()
  paid: number;

  @IsDecimal()
  owed: number;

  @IsNumber()
  @IsOptional()
  expenseId?: number;

}

