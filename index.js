import express from "express";
import mongoose from "mongoose";
import authRouter from "./routes/auth.routes.js";
import productsRouter from "./routes/products.routes.js";
import commentsRouter from "./routes/comments.routes.js";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use(productsRouter);
app.use(commentsRouter);

async function start() {
    await mongoose.connect(process.env.dbURL);

    try {
        app.listen(PORT, () => {
            console.log("server start on port ", PORT);
        });
    } catch (e) {}
}

start();
