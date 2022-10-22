import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import productsRouter from "./routes/products.routes.js";
import commentsRouter from "./routes/comments.routes.js";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import sendEmailRouter from "./routes/sendEmail.routes.js"

const app = express();
dotenv.config();

const PORT = process.env.PORT || 6000;
const __dirname = path.dirname("")

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/auth", authRouter);
app.use(productsRouter);
app.use(commentsRouter);
app.use(sendEmailRouter);

app.use(express.static(path.join(__dirname,'public')))


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
