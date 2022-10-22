import Router from "express";
import { checkDataComments } from "../../middlewares.js";
import { createComment, getComments, getOneComment } from "../../controllers/comments.js";

const route = new Router();

route.post("/comment", [checkDataComments], createComment);

route.get("/comments", getComments);

route.get(`/comment/:id`, getOneComment);

export default route;
