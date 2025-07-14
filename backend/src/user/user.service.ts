import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from 'src/repository/user.repository';
import { HashingService } from 'src/hashing/hashing.service';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService
  ) { }
  createUser(){
    
  }

  searchAllUsers() {
    return this.userRepository.searchAllUsers();
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
