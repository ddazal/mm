import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import * as nodemailer from 'nodemailer';
import {Email, Meeting, NodeMailerResponse, User} from '../models';
import {MeetingDetailsTemplate, MeetingInvitationTemplate, WelcomeEmailTemplate} from './templates/';

@injectable({scope: BindingScope.TRANSIENT})
export class EmailService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  private static setup() {
    let options = {
      host: process.env.SMTP_HOST,
      port: +process.env.SMTP_PORT!,
    }
    if (process.env.SMTP_USER) {
      options = Object.assign({}, options, {
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD
        }
      })
    }
    return nodemailer.createTransport(options);
  }

  private async sendMail(template: Email): Promise<NodeMailerResponse> {
    const transporter = EmailService.setup();
    return transporter.sendMail(template);
  }

  async sendWelcomeEmail(user: User): Promise<NodeMailerResponse> {
    const template = new Email({
      from: process.env.SENDER_FROM,
      to: user.email,
      subject: '[Meeting-o-Matic] ¡Bienvenid@!',
      text: WelcomeEmailTemplate.text(user),
      html: WelcomeEmailTemplate.html(user),
    });
    return this.sendMail(template);
  }

  async sendMeetingDetailsEmail(baseUrl: string, user: User, meeting: Meeting): Promise<NodeMailerResponse> {
    const template = new Email({
      from: process.env.SENDER_FROM,
      to: user.email,
      subject: '[Meeting-o-Matic] Reunión programada',
      text: MeetingDetailsTemplate.text(user, meeting),
      html: MeetingDetailsTemplate.html(baseUrl, user, meeting),
    })
    return this.sendMail(template);
  }

  async sendMeetingInvitationEmail(baseUrl: string, user: User, meeting: Meeting): Promise<NodeMailerResponse> {
    const template = new Email({
      from: process.env.SENDER_FROM,
      to: meeting.guests?.join(','),
      subject: '[Meeting-o-Matic] Invitación a reunión',
      text: MeetingInvitationTemplate.text(user, meeting),
      html: MeetingInvitationTemplate.html(baseUrl, user, meeting),
    })
    return this.sendMail(template);
  }
}
