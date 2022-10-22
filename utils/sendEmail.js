import nodeMailer from "nodemailer";

export const sendMyEmail = async (
    subject,
    message,
    send_to,
    send_from,
    reply_to
) => {
    const transporter = nodeMailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: "587",
        auth: {
            user: process.env.EMAIL_FROM,
            pass: process.env.EMAIL_PASS,
        },

        tls: {
            rejectUnauthorized: false,
        },
    });

    const options = {
        from: send_from,
        to: send_to,
        subject,
        replyTo: reply_to,
        html: message,
    };

    transporter.sendMail(options, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log(info);
        }
    });
};
