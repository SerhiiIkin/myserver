import mongoose from "mongoose";

const Comment = new mongoose.Schema({
    postId: { type: String, required: true, },
    username: { type: String, required: true },
    body: { type: String, required: true },
    date: { type: String, required: true },
});

export default mongoose.model("Comment", Comment);
