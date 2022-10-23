import { validationResult } from "express-validator";
import Todo from "../models/Todo.js";

export async function createTodo(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: "Not correct request", errors });
        }
        const { title, description, isDone } = req.body;

        const todo = await Todo.findOne({ title });

        if (todo) {
            return res.status(400).json({
                message: `Todo already exist`,
            });
        }

        const prod = new Todo({
            title,
            description,
            isDone,
        });
        await prod.save();
        return res.json({ message: "Todo was created" });
    } catch (e) {
        res.send({ message: "Server error" });
    }
}

export async function getTodos(req, res) {
    const todos = await Todo.find({});

    try {
        return res.json(todos);
    } catch (e) {
        res.send({ message: "Server error" });
    }
}

export async function getOneTodo(req, res) {
    const todo = await Todo.findOne({ _id: req.params.id });
    try {
        return res.json(todo);
    } catch (e) {
        res.send({ message: "Server error" });
    }
}