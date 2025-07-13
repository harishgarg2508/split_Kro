import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { ExpenseParticipant } from "src/expense-participant/entities/expense-participant.entity";
@Injectable()
export class ExpenseParticipantRepository extends Repository<ExpenseParticipant> {
    constructor(private readonly dataSource: DataSource) {
        super(ExpenseParticipant, dataSource.createEntityManager());
    }

    async saveParticipants(participants: ExpenseParticipant[]) {
        const expenseParticipant = this.create(participants);
        await this.save(participants);

        return expenseParticipant;
    }


}

