import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import apiRouter from "./routes/api/api.routes.js";
import { home, products, comments, todos, users } from "./controllers/pages.js";
import fileupload from "express-fileupload";
import http from "http";

import socketIo from "./utils/socketServer.js"

const app = express();
const server = http.createServer(app);
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});
dotenv.config();

const PORT = process.env.PORT || 6000;

app.use(cors());
app.use(fileupload());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static("uploads"));

app.set("view engine", "ejs");

app.use("/api", apiRouter);

app.get("/", home);
app.get("/products", products);
app.get("/comments", comments);
app.get("/todos", todos);
app.get("/users", users);

start();
socketIo(server);

async function start() {
    try {
        await mongoose.connect(process.env.dbURL);

        
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
}
