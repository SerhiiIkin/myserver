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

        const newTodo = new Todo({
            title,
            description,
            isDone,
        });
        await newTodo.save();
        return res.status(200).json({ message: "Todo was created", newTodo });
    } catch (e) {
        res.send({ message: "Server error" });
    }
}

export async function deleteTodo(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Not correct request", errors });
    }

    try {
        await Todo.findOneAndDelete({ _id: req.params.id });

        return res.status(200).send({ message: "Todo deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Cant delete Todo" });
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

export async function updateTodo(req, res, next) {
    const { _id, title, description, isDone } = req.body;

    try {
        const todo = await Todo.findOneAndUpdate(
            { _id },
            { title, description, isDone },
            {
                returnOriginal: false,
            }
        );

        return res
            .status(200)
            .json({ message: "Todo updated successfully", todo });
    } catch (e) {
        res.status(500).json({ message: "Cant update todo!" });
    }
}
