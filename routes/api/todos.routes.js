import Router from "express";

import { checkDataTodo, checkDataTodoUpdate } from "../../middlewares.js";
import {
    createTodo,
    getTodos,
    getOneTodo,
    deleteTodo,
    updateTodo
} from "../../controllers/todo.js";

const route = new Router();

route.post("/todo", [checkDataTodo], createTodo);
route.delete("/todo/:id", deleteTodo);
route.put("/todo/:id",checkDataTodoUpdate, updateTodo);

route.get("/todos", getTodos);

route.get(`/todo/:id`, getOneTodo);

export default route;
