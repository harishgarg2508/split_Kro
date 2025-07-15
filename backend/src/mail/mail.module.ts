import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import mailconfig from 'src/config/mailconfig';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports:[ConfigModule.forRoot({
      isGlobal: true,
      load: [mailconfig],
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: configService.get('transport'),
        defaults: configService.get('defaults'),
      }),
      inject: [ConfigService],
    }),],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}
