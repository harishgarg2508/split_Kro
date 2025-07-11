import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import * as dotenv from 'dotenv';
import { Category } from 'src/category/entities/category.entity';
import { Groups } from 'src/groups/entities/group.entity';
import { Groupmember } from 'src/groupmembers/entities/groupmember.entity';
import { Expense } from 'src/expenses/entities/expense.entity';
import { ExpenseParticipant } from 'src/expense-participant/entities/expense-participant.entity';
import { Settlement } from 'src/settlement/entities/settlement.entity';

dotenv.config();

const rawDataSourceOptions = {
    type: process.env.DATABASE_TYPE as DataSourceOptions['type'],
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    synchronize: true,
    logging:false,
    entities: [User,Category,Groups,Groupmember,Expense,ExpenseParticipant,Settlement],
};

export const dataSourceOptions = rawDataSourceOptions as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;