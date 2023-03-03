import { MailerOptions } from '@nestjs-modules/mailer';
import { EjsAdapter } from '@nestjs-modules/mailer/dist/adapters/ejs.adapter';
import { MailerAsyncOptions } from '@nestjs-modules/mailer/dist/interfaces/mailer-async-options.interface';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { path } from 'app-root-path';

export const mailerConfig: MailerAsyncOptions = {
  imports: [ConfigModule],
  useFactory: (
    configService: ConfigService,
  ): MailerOptions | Promise<MailerOptions> => {
    const SMTP_HOST = configService.get<string>('SMTP_HOST');
    const SMTP_PORT = configService.get<number>('SMTP_PORT');
    const SMTP_USER = configService.get<string>('SMTP_USER');
    const SMTP_PASS = configService.get<string>('SMTP_PASS');

    return {
      transport: {
        host: SMTP_HOST,
        port: SMTP_PORT,
        secure: false,
        auth: {
          user: SMTP_USER,
          pass: SMTP_PASS,
        },
      },
      template: {
        dir: path + '/dist/mails',
        adapter: new EjsAdapter(),
      },
    };
  },
  inject: [ConfigService],
};
