import mongoose from "mongoose";

const Todo = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    description: { type: String, required: true },
    isDone: { type: Boolean, required: true },
});

export default mongoose.model("Todo", Todo);
