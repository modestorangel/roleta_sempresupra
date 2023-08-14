import nodemailer from 'nodemailer'
import emailTemplate from '../templates/email';

export default async function send(to: string, name: string, award: string) {
    const transporter = nodemailer.createTransport({
        host: 'mail.sempresupra.com.br',
        port: 465, // port for secure SMTP
        tls: {
            ciphers: 'SSLv3'
        },
        auth: {
            user: 'noreply@sempresupra.com.br',
            pass: 'S3mpr3supr@2022',
        },
    });

    await transporter.sendMail({
        from: 'noreply@sempresupra.com.br', 
        to: [to, 'marketing@sempresupra.com.br'],
        subject: "Ei, já vimos que você girou! Consulte seu prêmio aqui", 
        html: emailTemplate(name, award),
    });
} 