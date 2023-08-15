const emailTemplate = (name: string, award: string): string => {
    return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <title>Parabéns!</title>
    <style type="text/css">
        html,
        body,
        .body-wrap,
        .body-wrap-cell {
        margin: 0;
        padding: 0;
        background: #ffffff;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        color: #222222;
        text-align: left;
        font-size: 12px;
        }

        p, 
        h5,
        a {
        font-size: 14px;
        }
      
        h1 {
          font-size: 18px;
        }
    
    </style>
    </head>
    
    <body class="body" style="padding:0; margin:0; display:block; background:#ffffff; -webkit-text-size-adjust:none" bgcolor="#ffffff">
    <img src="	https://sempresupra.com.br/wp-content/uploads/2020/03/LOGO-NOVA-2016-2.png" />
     <br /><br />
      <p><h1><b>Parabéns ${name}!</b></h1></p>

    <p>Seu prêmio foi: <b> ${award}</b></p>

    <p>Obrigado por participar da nossa Campanha de Indicação: <b>ARRAIÁ DE PRÊMIOS! SEMPRE SUPRA</b></p>

    <p>Em breve entraremos em contato para informar o próximo passo para a utilização. <br />
    Continue indicando e acumule vantagens!</p>

    <p> <a href="https://sempresupra.com.br/campanha-de-indicacao">Acesse aqui<a/> a campanha deste mês. </p>

    <p><h5>A entrega dos prêmios será até 30/09, exceto o desconto no boleto, que será gerado para o mês de Outubro de 2023*.</h5> </p>
    </body>
</html>
    `
}

export default emailTemplate
