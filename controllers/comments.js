import Comment from "../models/Comment.js";
import Product from "../models/Product.js";
import { validationResult } from "express-validator";

export async function createComment(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: "Not correct request", errors });
        }
        const { postId, username, body, date } = req.body;

        const newComment = new Comment({
            postId,
            username,
            body,
            date,
        });

        await newComment.save();

        await Product.findByIdAndUpdate(postId, {
            $push: {
                comments: newComment._id,
            },
        });

        return res.json({
            newComment,
            message: "Comments was created",
        });
    } catch (e) {
        res.send({ message: "Server error" });
    }
}

export async function getComments(req, res) {
    try {
        const comments = await Comment.find({ postId: req.params.id });
        if (!comments) {
            return res.status(404).send({ message: "No comments found!" });
        }

        return res.json(comments);
    } catch (e) {
        res.send({ message: "Server error" });
    }
}

export async function deleteComment(id) {
    await Comment.findOneAndRemove({ id });
}
