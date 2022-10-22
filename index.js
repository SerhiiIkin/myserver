import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import productsRouter from "./routes/products.routes.js";
import commentsRouter from "./routes/comments.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import { sendMyEmail } from "./utils/sendEmail.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use(productsRouter);
app.use(commentsRouter);

app.get("/", (req, res) => {
    res.send(`
    <p>For send mail use: "/api/sendemail"</p>
    <p>For look list of products: <a href="/products">products</a></p>
    <p>For look list of comments: <a href="/comments">comments</a></p>
    `);
});

app.post("/api/sendemail", async (req, res) => {
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

async function start() {
    await mongoose.connect(process.env.dbURL);

    try {
        app.listen(PORT, () => {
            console.log("server start on port ", PORT);
        });
    } catch (e) {
        console.error(e);
    }
}

start();
