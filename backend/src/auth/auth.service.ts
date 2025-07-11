import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from 'src/repository/user.repository';
import { HashingService } from 'src/hashing/hashing.service';
import { SignUpDto } from './dto/signup.dto';

@Injectable()
export class AuthService {
   constructor(private readonly userRepository: UserRepository,
      private readonly hashingService: HashingService
    ) { }
   async createUser(userdata: SignUpDto) {
      const{password,email} = userdata
      const existingUser = await this.userRepository.findOne({where:{email}})
     
        if(existingUser){
          throw new UnauthorizedException(`User with email ${email} already exists`)
        }
      const hashedpassword  = await this.hashingService.hashPassword(password)
      const userWithHashPassword = {password:hashedpassword,email,}
      const user = this.userRepository.createAndSaveUser(userWithHashPassword)
      return user;
    }

    async loginUser(credentials:LoginDto){
      const{email,password} = credentials
      console.log("credentials:", credentials)
      const user = await this.userRepository.findOne({where:{email}})
      if(!user){
        throw new NotFoundException(`user with ${email} not found`)
      }

      
      const hashedpassword  = await this.hashingService.comparePassword(password,user.password)
      console.log("password match")
      if(!hashedpassword){
        throw new UnauthorizedException('Invalid credentials')
      }

      return {
        email: user.email,
        displayName: user.name,
       
      }

    }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
