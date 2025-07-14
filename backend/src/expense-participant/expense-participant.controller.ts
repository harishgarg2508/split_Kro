import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ExpenseParticipantService } from './expense-participant.service';
import { CreateExpenseParticipantDto } from './dto/create-expense-participant.dto';
import { UpdateExpenseParticipantDto } from './dto/update-expense-participant.dto';

@Controller('participant')
export class ExpenseParticipantController {
  constructor(private readonly expenseParticipantService: ExpenseParticipantService) {}

  // @Post()
  // create(@Body() createExpenseParticipantDto: CreateExpenseParticipantDto) {
  //   return this.expenseParticipantService.create(createExpenseParticipantDto);
  // }

  @Get()
  findAll() {
    return this.expenseParticipantService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.expenseParticipantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateExpenseParticipantDto: UpdateExpenseParticipantDto) {
    return this.expenseParticipantService.update(+id, updateExpenseParticipantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseParticipantService.remove(+id);
  }
}
