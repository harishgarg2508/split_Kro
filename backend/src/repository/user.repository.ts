import { Injectable } from "@nestjs/common";
import { SignUpDto } from "src/auth/dto/signup.dto";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { User } from "src/user/entities/user.entity";
import { DataSource, Repository } from "typeorm";

@Injectable()
export class UserRepository extends Repository<User> {
    constructor(private readonly dataSource: DataSource) {
        super(User, dataSource.createEntityManager());
    }

    async createAndSaveUser(userdata: SignUpDto) {
        console.log(userdata)
        const user = this.create(userdata)
        await this.save(user)
        return { user };
    }

    async searchAllUsers(search?: string, page: number = 1, limit: number = 10) {
        const query = this.createQueryBuilder('user');
        if (search) {
            query.where('user.name LIKE :search OR user.email LIKE :search', { search: `%${search}%` });
        }
        query.skip((page - 1) * limit).take(limit);
        return query.getMany();
    }

}