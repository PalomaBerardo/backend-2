import nodemailer from 'nodemailer';
import { config } from '../config/config.js';

export class MailService {
    constructor() {
    this.transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: config.mail.user,
        pass: config.mail.pass
        }
    });
    }

    async sendTestMail(to) {
    const mailOptions = {
        from: config.mail.from,
        to,
        subject: 'Prueba de Nodemailer - Coder Eats',
        html: `
        <h2>Coder Eats</h2>
        <p>Correo de prueba.</p>
        `
    };
    return this.transporter.sendMail(mailOptions);
    }

    async sendPasswordResetMail(to, resetUrl) {
    const mailOptions = {
        from: config.mail.from,
        to,
        subject: 'Restablecer contraseña',
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5;">
            <h2>Restablecer contraseña</h2>
            <p>Recibimos una solicitud para restablecer tu contraseña.</p>
            <p>Este enlace vence en 1 hora.</p>
            <p style="margin: 24px 0;">
            <a href="${resetUrl}" style="background:#111827;color:#fff;padding:12px 16px;border-radius:8px;text-decoration:none;display:inline-block;">
                Cambiar contraseña
            </a>
            </p>
            <p>Si no fuiste vos, podés ignorar este correo.</p>
        </div>
        `
    };

    return this.transporter.sendMail(mailOptions);
    }
} 