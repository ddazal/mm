import {Meeting, User} from '../../models'

export class MeetingInvitationTemplate {
  static text(user: User, meeting: Meeting): string {
    return `Hola. ${user.name} te ha invitado a la reunión ${meeting.title} y ha creado varias opciones para que puedas participar. Un saludo, Meeting-o-Matic.`
  }
  static html(baseUrl: string, user: User, meeting: Meeting): string {
    return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="Content-Type" content="text/html charset=UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <title>Bienvenid@ a Meeting-o-Matic</title>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&family=Pacifico&display=swap" rel="stylesheet">
      </head>
      <body style="box-sizing:border-box; font-family: Montserrat, sans-serif; padding: 0 16px; width: 100%; background-color: #fafafa">
        <table style="max-width: 768px; margin: 0 auto;">
          <tbody>
            <tr>
              <td style="font-family: Pacifico, cursive; color: #0331fd; font-size: 32px;">Meeting-o-Matic</td>
            </tr>
            <tr>
              <td style="font-size: 18px;">
                <p>👋🏼 Hola,</p>
                <p>${user.name} te ha invitado a la reunión ${meeting.title} y ha creado varias opciones para que puedas participar.</p>
                <p>Elige las que mejor se acomoden a tu horario en el siguiente enlace: <a href="${baseUrl}/${meeting.publicId}">${baseUrl}/${meeting.publicId}</a></p>
                <p>Utiliza el siguiente código de acceso para ingresar: <strong>${meeting.accessCode}</strong></p>
                <p>Un saludo,</p>
                <p>Meeting-o-Matic&copy;</p>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
    `
  }
}
