
export default function EmailMensaje(usuario,evento) {


    const htmlbody = `
    <body style="margin:0;padding:0;">
        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;" lang="es">
        <tr>
            <td align="center" style="padding:0;">
            <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                <tr>
                <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
                    <h1 style="font-size:28px;margin:0 0 20px 0;font-family:Arial,sans-serif;">
                        ¡ Pago Registrado !
                    
                    </h1>
                </td>
                </tr>
                <tr>
                <td style="padding:36px 30px 42px 30px;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                        <td style="padding:0 0 36px 0;color:#153643;">
                        
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                            Muchas gracias  <strong>${usuario.nombre } ${usuario.apellido } </strong> por realizar su pago en el tiempo
                            estipulado. Ya puede realizar la impresión de su gafete para su participación en el evento <strong>${evento.titulo}</strong>.
                            Una vez terminado el evento podrá imprimir su diploma de participación. 
                            <br/><br/>
                            Recuerde que para poder imprimir su diploma y gafete debe de ingresar a nuestro portal web haciendo click en el siguiente enlace:
                        </p>
                        <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                            <a href="https://eventosumg.microsystems.com.gt/login" target="_blank" style="color:#ee4c50;text-decoration:underline;">
                                Iniciar Sesion
                            </a>
                        </p>
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
                <tr>
                <td style="padding:30px;background:#ee4c50;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;font-size:9px;font-family:Arial,sans-serif;">
                    <tr>
                        <td style="padding:0;width:50%;" align="left">
                        <p style="margin:0;font-size:14px;line-height:16px;font-family:Arial,sans-serif;color:#ffffff;">
                            &reg; Universidad Mariano Galvez<br/><a style="color:#ffffff;text-decoration:underline;">Centro Universitario de Jalapa</a>
                        </p>
                        </td>
                        <td style="padding:0;width:50%;" align="right">
                        
                        </td>
                    </tr>
                    </table>
                </td>
                </tr>
            </table>
            </td>
        </tr>
        </table>
    </body>
    `
    const MensajeEmail={
        from: '"Pago Registrado ✔" <draslyrafael@cunsurori.edu.gt>', // sender address
        to: usuario.email, // list of receivers
        subject: `Su pago fue registrado exitosamente`, // Subject line
        text: `Gracias por realizar su pago para participar en el evento: ${evento.titulo}`, // plain text body
        html: htmlbody, // html body
      }
return MensajeEmail
}
