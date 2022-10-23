import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import apiRouter from "./routes/api/api.routes.js";
import { home, products, comments, todos } from "./controllers/pages.js";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.set("view engine", "ejs");

app.use("/api", apiRouter);

app.get("/", home);
app.get("/products", products);
app.get("/comments", comments);
app.get("/todos", todos);

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
