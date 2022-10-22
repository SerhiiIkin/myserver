import Comments from "../models/Comments.js";
import Product from "../models/Product.js";

export  function home(req, res) {
    res.render("index", { title: "My server", active: "main" });
}

export  async function products(req, res) {
    const products = await Product.find({});
    res.render("products", { title: "Products", active: "products", products });
}
export  async function comments(req, res) {
    const comments = await Comments.find({});
    res.render("comments", { title: "Comments", active: "comments", comments });
}