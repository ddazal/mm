import {Meeting, User} from '../../models'

export class MeetingDetailsTemplate {
  static text(user: User, meeting: Meeting): string {
    return `Hola, ${user.name}. La reunión ${meeting.title} se ha programado con éxito.`
  }
  static html(baseUrl: string, user: User, meeting: Meeting) {
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
                <p>Hola, ${user.name}.</p>
                <p>La reunión ${meeting.title} se ha programado con éxito.</p>
                <p>Envía el siguiente enlace a las personas que quieres que participen: <a href="${baseUrl}/${meeting.publicId}">${baseUrl}/${meeting.publicId}</a>.</p>
                <p>Revisa periódicamente los resultados en este enlace privado: <a href="${baseUrl}/${meeting.privateId}">${baseUrl}/${meeting.privateId}</a></p>
                <p><strong>El código de acceso para ambos enlaces es el siguiente: ${meeting.accessCode}</strong></p>
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
