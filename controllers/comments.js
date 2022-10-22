import Comments from "../models/Comments.js";
import { check, validationResult } from "express-validator";

export async function createComment(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: "Not correct request", errors });
        }
        const { postId, username, body, date } = req.body;

        const comment = new Comments({
            postId,
            username,
            body,
            date,
        });
        await comment.save();
        return res.json({
            postId,
            body,
            date,
            username,
            message: "Comments was created",
        });
    } catch (e) {
        res.send({ message: "Server error" });
    }
}

export async function getComments(req, res)  {
    const comments = await Comments.find({});
    try {
        return res.json(comments);
    } catch (e) {
        res.send({ message: "Server error" });
    }
}

export async function getOneComment(req, res) {
    const comment = await Comments.findOne({ _id: req.params.id });
    try {
        return res.json(comment);
    } catch (e) {
        res.send({ message: "Server error" });
    }
}