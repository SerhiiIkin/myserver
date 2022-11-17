import mongoose from "mongoose";

const Product = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    price: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true, default: "" },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

export default mongoose.model("Product", Product);
