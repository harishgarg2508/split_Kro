import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { GroupsModule } from './groups/groups.module';
import { ExpensesModule } from './expenses/expenses.module';
import { NotificationModule } from './notification/notification.module';
import { ReportsModule } from './reports/reports.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from './config/datasource';
import { CategoryModule } from './category/category.module';
import { GroupmembersModule } from './groupmembers/groupmembers.module';
import { ExpenseParticipantModule } from './expense-participant/expense-participant.module';
import { SettlementModule } from './settlement/settlement.module';
import { AuthModule } from './auth/auth.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UserModule,
    GroupsModule,
    ExpensesModule,
    NotificationModule,
    ReportsModule,
    TypeOrmModule.forRoot(dataSourceOptions),
    CategoryModule,
    GroupmembersModule,
    ExpenseParticipantModule,
    SettlementModule,
    AuthModule,
    MailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
