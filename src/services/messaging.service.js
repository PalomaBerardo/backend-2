import twilio from "twilio";
import {config} from "../config/config.js";

export class MessagingService {
    constructor() {
        this.client = twilio(config.twilio.sid, config.twilio.token);
    }
    async sendSMS(to, body) {
        return await this.client.messages.create({
            from: config.twilio.phone,
            to,
            body,
        });
    }
}