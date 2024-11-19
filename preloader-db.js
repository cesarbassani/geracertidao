db.templates.remove({});

db.templates.insert([{
        name: 'REGISTER_EMAIL',
        subject: 'Confirmação de email',
        content: '<div style="font: 14px/20px Helvetica,Arial,sans-serif;margin: 0;padding: 75px 0;text-align: center;background-color: #f8f8f7;"> <table border="0" cellpadding="10" cellspacing="0" style="background-color:#f8f8f7;width:100%;height:100%"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" style="border-radius:6px;background-color:#ffffff;width:600px"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" style="border-radius:6px;background-color:#ffffff;width:600px;"> <td align="center" valign="top" style=" background: #243e58;padding: 20px 0;"> <h1 style="margin:0px;padding:0"> <a href="https://geracertidao.com"> <img alt="Gera Certidão" border="0" src="https://geracertidao.com/wp-content/themes/geracertidao/images/logo.png" width="220"> </a> </h1> </td> <tr> <td align="left" style="line-height:150%;font-family:Helvetica;font-size:14px;color:#6f6f6f;padding:10px 30px" valign="top"> <h2 style="text-align: center;line-height: 35px;margin: 30px 0;">Olá ${ userData.name }, tudo bem?<br>Seja bem-vindo ao Gera Certidão!</h2> <br> <br> Somos uma plataforma segura para geração, emissão e lote das principais certidões federais e estaduais para participar de licitações e processos de contratação! <br> <br> Confirme seu cadastro clicando no link abaixo: <br> <a style="background: #1d3d68;color: #fff;text-align: center;padding: 5px 26px;display: block;float: left;margin: 10px 0;text-decoration: none;border-radius: 20px;" href="${ process.env.URL_BASE }/?emailConfirmed=${ token }">CONFIRMAR CADASTRO</a><br> <br> <br><br> <strong>Atenciosamente,</strong> <br> Equipe Gera Certidão <br><br> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>'
},
{
        name: 'FORGET_PASSWORD',
        subject: 'Esqueci a senha',
        content: '<div style="font: 14px/20px Helvetica,Arial,sans-serif;margin: 0;padding: 75px 0;text-align: center;background-color: #f8f8f7;"> <table border="0" cellpadding="10" cellspacing="0" style="background-color:#f8f8f7;width:100%;height:100%"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" style="border-radius:6px;background-color:#ffffff;width:600px"> <tbody> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" style="border-radius:6px;background-color:#ffffff;width:600px;"> <td align="center" valign="top" style=" background: #243e58;padding: 20px 0;"> <h1 style="margin:0px;padding:0"> <a href="https://geracertidao.com"> <img alt="Gera Certidão" border="0" src="https://geracertidao.com/wp-content/themes/geracertidao/images/logo.png" width="220"> </a> </h1> </td> <tr> <td align="left" style="line-height:150%;font-family:Helvetica;font-size:14px;color:#6f6f6f;padding:10px 30px" valign="top"> <h2 style="text-align: center;line-height: 35px;margin: 30px 0;">Olá ${ userData.name }, tudo bem?</h2> <br> <br> Verificamos que você esqueceu sua senha. Não tem problema! <br> Você pode alterar sua senha clicando no link abaixo: <br> <a style="background: #1d3d68;color: #fff;text-align: center;padding: 5px 26px;display: block;float: left;margin: 10px 0;text-decoration: none;border-radius: 20px;" href="${ process.env.URL_BASE }/#/update-password?token=${ token }">ALTERAR SENHA</a><br> <br> <br><br> <strong>Atenciosamente,</strong> <br> Equipe Gera Certidão <br><br> </td> </tr> </table> </td> </tr> </tbody> </table> </td> </tr> </tbody> </table> </div>'
},
{
        name: 'DOCUMENTS_UPDATED',
        subject: 'Certidões atualizadas',
        content: '<div style="font: 14px/20px Helvetica,Arial,sans-serif;margin: 0;padding: 75px 0;text-align: center;background-color: #f8f8f7;"><table border="0" cellpadding="10" cellspacing="0" style="background-color:#f8f8f7;width:100%;height:100%"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" style="border-radius:6px;background-color:#ffffff;width:600px"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" style="border-radius:6px;background-color:#ffffff;width:600px;"><td align="center" valign="top" style=" background: #243e58;padding: 20px 0;"><h1 style="margin:0px;padding:0"><a href="https://geracertidao.com"><img alt="Gera Certidão" border="0" src="https://geracertidao.com/wp-content/themes/geracertidao/images/logo.png" width="220"></a></h1></td><tr><td align="left" style="line-height:150%;font-family:Helvetica;font-size:14px;color:#6f6f6f;padding:10px 30px" valign="top"><h2 style="text-align: center;line-height: 35px;margin: 30px 0;">Olá ${ userData.name }, tudo bem?</h2><br><br>Chegou o dia! Esse é o lembrete que enviamos no seu e-mail avisando que renovamos todas as as certidões federais da sua empresa automaticamente.<br><br>Clique abaixo para acessar a plataforma e baixar as suas certidões renovadas. <br><a style="background: #1d3d68;color: #fff;text-align: center;padding: 5px 26px;display: block;float: left;margin: 10px 0;text-decoration: none;border-radius: 20px;" href="https://geracertidao.com.br">BAIXAR CERTIDÕES</a><br><br><br><br><strong>Atenciosamente,</strong> <br>Equipe Gera Certidão<br><br></td></tr></table></td></tr></tbody></table></td></tr></tbody></table></div>'
}]);

