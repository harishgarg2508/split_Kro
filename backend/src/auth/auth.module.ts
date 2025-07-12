import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserRepository } from 'src/repository/user.repository';
import { HashingModule } from 'src/hashing/hashing.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config()
@Module({
  imports:[HashingModule,
    JwtModule.register({
      global:true,
      secret:process.env.JWT_SECRET,
      signOptions:{expiresIn:'60s'}
    })
  ],
  controllers: [AuthController],
  providers: [AuthService,UserRepository],
})
export class AuthModule {}

