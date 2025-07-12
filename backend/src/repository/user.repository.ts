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

    async createAndSaveUser(userdata:SignUpDto){
        console.log(userdata)
       const user =  this.create(userdata)
        await this.save(user)
        return { user };
    }

}