
export default function EmailSuscripcion(usuario,evento) {


    const htmlbody = `
    <body style="margin:0;padding:0;">
        <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;background:#ffffff;" lang="es">
        <tr>
            <td align="center" style="padding:0;">
            <table role="presentation" style="width:602px;border-collapse:collapse;border:1px solid #cccccc;border-spacing:0;text-align:left;">
                <tr>
                <td align="center" style="padding:40px 0 30px 0;background:#70bbd9;">
                    <h1 style="font-size:28px;margin:0 0 20px 0;font-family:Arial,sans-serif;">
                        Se ha suscrito al Evento : ${evento.titulo}
                    
                    </h1>
                </td>
                </tr>
                <tr>
                <td style="padding:36px 30px 42px 30px;">
                    <table role="presentation" style="width:100%;border-collapse:collapse;border:0;border-spacing:0;">
                    <tr>
                        <td style="padding:0 0 36px 0;color:#153643;">
                        <h1 style="font-size:24px;margin:0 0 20px 0;font-family:Arial,sans-serif;">
                            ¡Suscripcion realizada!
                        </h1>
                        <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                            Felicidades <strong>${usuario.nombre } ${usuario.apellido } </strong> por su suscripcion al evento <strong>${evento.titulo}</strong>
                            el evento se llevará acabo la fecha del <strong>${evento.fecha}</strong>. A continuacion le mostramos sus datos registrados, puede imprimir
                            su gafete de participación y diploma en nuestro portal web iniciando sesion en la siguiente URL
                        </p>
                        <p style="margin:0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                            <a href="https://eventosumg.microsystems.com.gt/login" target="_blank" style="color:#ee4c50;text-decoration:underline;">
                                Iniciar Sesion
                            </a>
                        </p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <table>
                                <td  style="padding:0;">
                                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;"> 
                                        <strong>
                                        Nombre: <br/>
                                        Usuario:<br/>
                                        Telefono: <br/>
                                        email:<br/>
                                    </strong>
                                    </p>
                                </td>
                                <td  style="padding:0;">
                                    <p style="margin:0 0 12px 0;font-size:16px;line-height:24px;font-family:Arial,sans-serif;">
                                    ${usuario.nombre } ${usuario.apellido }<br/>
                                    ${usuario.usuario }<br/>
                                    ${usuario.telefono }<br/>
                                    ${usuario.email }<br/>
                                    </p>
                                </td>
                            </table>
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <table>
                            <tr>
                                <td colspan="2">
                                    <p style="margin:0 0 12px 0;font-size:18px;line-height:24px;font-family:Arial,sans-serif;">
                                        <strong>Pago del Evento</strong>
                                    </p>  
                                    <p style="margin:0 0 12px 0;font-size:18px;line-height:24px;font-family:Arial,sans-serif;">
                                    Tiene un plazo de 5 dias para realizar el pago de su suscripción de lo contrario será anulada 
                                    dicha suscripción, puede realizar su pago a nuestra cuenta de <strong>BANRURAL</strong> 
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <img src="https://seeklogo.com/images/B/banrural-logo-BAAEBCABB3-seeklogo.com.png" width="100">
                                </td>
                                <td>
                                    <p style="margin:0 0 12px 0;font-size:18px;line-height:24px;font-family:Arial,sans-serif;">
                                        <strong>No. Cuenta:</strong>  8786524515 <br>
                                        <strong>Tipo:</strong> Monetaria<br>
                                        <strong>Moneda:</strong> Quetzales<br>
                                        <strong>Monton a cancelar:</strong> Q125<br>
                                    </p>
                                </td>
                            </tr>
                        </table>
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
        from: '"Inscripción Realizada 👻" <draslyrafael@cunsurori.edu.gt>', // sender address
        to: usuario.email, // list of receivers
        subject: `Inscripcion evento: ${evento.titulo} ✔`, // Subject line
        text: `Felicidades estas inscrito al evento:  ${evento.titulo}`, // plain text body
        html: htmlbody, // html body
      }
return MensajeEmail
}
