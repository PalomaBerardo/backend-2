import {MailService} from '../services/mail.service.js';
import { MessagingService } from '../services/messaging.service.js';
import { AppError } from '../utils/AppError.js';

const mailService = new MailService();

export const sendMail = async (req, res) => {
    try {
        const { to } = req.body;

        if (!to) {
            return res.status(400).send ({
                status: 'error',
                error: 'Falta "to" en el cuerpo de la solicitud',
            });
        }

    const info = await mailService.sendTestMail(to);
    return res.json({status: 'success',
        messageId: info.messageId});
    } catch (err) {
        return res.status(500).send ({
            status: 'error', error: err.message});
    }
};

export const sendSMS = async (req, res) => {
    try {
        const {nombre, producto, to} = req.query;

        if (!to || !nombre || !producto) {
            return res.status(400).json ({
                status: "error",
                error: "Faltan query params 'to', 'nombre' o 'producto'",
            });
        } 
        
        let toNormalized = String(to).trim().replace(/[^\d+]/g, "");
        if (!toNormalized.startsWith('+')) toNormalized = `+${toNormalized}`;
        const e164 = /^\+[1-9]\d{1,14}$/;
        if (!e164.test(toNormalized)) {
            throw new AppError("Formato inválido para 'to'. Use E.164, ej: +5491171417368", 400, "INVALID_PHONE");
        }


        const msg = `Hola ${nombre}, su pedido del producto ${producto} ha sido recibido y está siendo procesado. ¡Gracias por elegirnos!`;
        const result = await messagingService.sendSMS(toNormalized, msg);

            return res.json ({status: "success", sid: result.sid,  to: toNormalized});
            } catch (err) {
            return res.status(500).json ({status: "error", error: err.message});
            }
    };
