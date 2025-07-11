import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/repository/user.repository';
import { HashingModule } from 'src/hashing/hashing.module';

@Module({
  imports:[HashingModule],
  controllers: [AuthController],
  providers: [AuthService,UserRepository],
})
export class AuthModule {}
