import Router from "express";

import { checkDataTodo } from "../../middlewares.js";
import { createTodo, getTodos, getOneTodo } from "../../controllers/todo.js";

const route = new Router();

route.post("/todo", [checkDataTodo], createTodo);

route.get("/todos", getTodos);

route.get(`/todo/:id`, getOneTodo);

export default route;
