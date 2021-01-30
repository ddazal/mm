import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import * as nodemailer from 'nodemailer';
import {Email, NodeMailerResponse, User} from '../models';
import {welcomeEmail} from './templates/';

@injectable({scope: BindingScope.TRANSIENT})
export class EmailService {
  constructor(/* Add @inject to inject parameters */) { }

  private static setup() {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT!,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  /*
   * Add service methods here
   */

  private getWelcomeEmail(user: User): Email {
    return new Email({
      from: process.env.SENDER_FROM,
      to: user.email,
      subject: '[Meeting-o-Matic] ¡Bienvenid@!',
      text: welcomeEmail.text(user.name),
      html: welcomeEmail.html(user.name),
    });
  }

  private async sendMail(template: Email): Promise<NodeMailerResponse> {
    const transporter = EmailService.setup();
    return transporter.sendMail(template);
  }

  sendWelcomeEmail(user: User): Promise<NodeMailerResponse> {
    const template = this.getWelcomeEmail(user);
    return this.sendMail(template);
  }

}
