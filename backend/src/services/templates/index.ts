export const welcomeEmail = (name: string) => `
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
    <style>
      *,
      *:after,
      *:before {
        box-sizing: inherit;
      }
      html, body { box-sizing: border-box; }
    </style>
  </head>
  <body style="font-family: Montserrat, sans-serif; padding: 0 16px; width: 100%; background-color: #fafafa">
    <table style="max-width: 768px; margin: 0 auto;">
      <tbody>
      	<tr>
        	<td style="font-family: Pacifico, cursive; color: #0331fd; font-size: 32px;">Meeting-o-Matic</td>
      	</tr>
        <tr>
          <td style="font-size: 18px;">
            <p>Hola, ${name}.</p>
            <p>👋🏼 Bienvenido a <span style="font-weight: 600">Meeting-o-Matic</span>. El mejor lugar para programar tus reuniones sin enviar decenas de correos.</p>
            <p>Gracias por confiar en nosotros para gestionar los detalles de tus reuniones.</p>
            <p>Si no sabes de qué estamos hablando y no has usado nuestra plataforma, por favor haz caso omiso a este mensaje.</p>
            <p>Saludos cordiales,</p>
            <p>Meeting-o-Matic&copy;</p>
          </td>
      	</tr>
      </tbody>
    </table>
  </body>
</html>
`
