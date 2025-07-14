import { Injectable } from "@nestjs/common";
import { Settlement } from "src/settlement/entities/settlement.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class SettlementRepository extends Repository<Settlement> {


    constructor(private readonly dataSource: DataSource) {
        super(Settlement, dataSource.createEntityManager());
    }

    async getSettlemetsOfUser(userId: number): Promise<Settlement[]> {
        return this.find({
            where: { payer: { id: userId } },
            relations: ['payer', 'expenseParticipants', 'expenseParticipants.user'],
        });
    }

  

}