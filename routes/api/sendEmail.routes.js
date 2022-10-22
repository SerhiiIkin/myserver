import Router from "express";
import { sendMyEmail } from "../../utils/sendEmail.js";

const route = new Router();

route.post("/sendemail", async (req, res) => {
    const { email, title, text } = req.body;

    try {
        const send_to = process.env.EMAIL_TO;
        const send_from = process.env.EMAIL_FROM;
        const reply_to = process.env.EMAIL_TO;
        const subject = title;
        const message = `<p>${text}</p>
        Message from: ${email}`;

        await sendMyEmail(subject, message, send_to, send_from, reply_to);

        res.status(200).json({ success: true, message: "Email send" });
    } catch (error) {
        res.status(500).json({ success: false, message: error });
    }
});

export default route;
