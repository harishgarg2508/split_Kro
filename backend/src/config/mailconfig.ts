import { MailerOptions } from "@nestjs-modules/mailer";

export default (): MailerOptions => ({
  transport: {
    host: 'mailhog',
    port: 1025,
    secure: false,
  },
  defaults: {
    from: '"Zenmonk" <zenmonk.tech>',
  },
});
