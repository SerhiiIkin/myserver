import Router from "express";
import { checkDataComments } from "../../middlewares.js";
import { createComment, getComments } from "../../controllers/comments.js";

const route = new Router();

route.post("/comment", checkDataComments, createComment);

route.get("/comments/:id", getComments);


export default route;
