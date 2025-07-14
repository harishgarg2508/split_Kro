import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { UserRepository } from 'src/repository/user.repository';
import { HashingService } from 'src/hashing/hashing.service';
import { SignUpDto } from './dto/signup.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';

@Injectable()
export class AuthService {
  constructor(private readonly userRepository: UserRepository,
    private readonly hashingService: HashingService,
    private readonly jwtService: JwtService
  ) { }
  async createUser(userdata: SignUpDto) {
    const { name, email, password } = userdata
    console.log(userdata)
    const existingUser = await this.userRepository.findOne({ where: { email } })

    if (existingUser) {
      throw new ConflictException(`User with email ${email} already exists`)
    }
    const hashedpassword = await this.hashingService.hashPassword(password)
    const userWithHashPassword = { name, email, password: hashedpassword }
    const user = await this.userRepository.createAndSaveUser(userWithHashPassword)
    return user;
  }

  async loginUser(credentials: LoginDto) {
    const { email, password } = credentials
    console.log("credentials:", credentials)
    const user = await this.userRepository.findOne({ where: { email } })
    if (!user) {
      throw new NotFoundException(`user with ${email} not found`)
    }


    const hashedpassword = await this.hashingService.comparePassword(password, user.password)
    console.log("password match")
    if (!hashedpassword) {
      throw new UnauthorizedException('Invalid credentials')
    }
    const payload = { id: user.id, email: user.email, name: user.name }
    console.log(user)
    return {
      name: user.name,
      id: user.id,
      email: user.email,
      token: await this.jwtService.signAsync(payload)

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
