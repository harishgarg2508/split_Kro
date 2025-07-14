import { IsNumber } from "class-validator";

export class CreateExpenseParticipantDto {

  @IsNumber()
  userId: number;

  @IsNumber()
  paid: number;

  @IsNumber()
  owed: number;

  @IsNumber()
  expenseId: number;

 


}
