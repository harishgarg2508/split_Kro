import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMailToUser(@Body() emails: string[]) {
    await this.mailService.sendMailToUser(emails);
    return { message: "email sent" };
  }
}