import Router from "express";

import { checkDataTodo } from "../../middlewares.js";
import {
    createTodo,
    getTodos,
    getOneTodo,
    deleteTodo,
} from "../../controllers/todo.js";

const route = new Router();

route.post("/todo", [checkDataTodo], createTodo);
route.delete("/todo/:id", deleteTodo);

route.get("/todos", getTodos);

route.get(`/todo/:id`, getOneTodo);

export default route;
