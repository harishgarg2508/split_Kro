import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMailToUser(emails: string[]): Promise<void> {
    return Promise.all(
      emails.map((email) => {
        return this.mailerService.sendMail({
          to: email,
          subject: 'MailHog Test',
          text: 'This is the mail from mailhog',
        });
      }),
    ).then(() => {
      console.log('All emails sent successfully!');
    }).catch((error) => {
      console.error('Error sending emails:', error);
      throw error;
    });
  }
}