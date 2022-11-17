import Comments from "../models/Comment.js";
import Product from "../models/Product.js";
import Todo from "../models/Todo.js";

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

export async function todos(req, res) {
    const todos = await Todo.find({});
    res.render("todos", { title: "Todos", active: "todos", todos });
}