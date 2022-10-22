import Router from "express";
import Product from "../models/Product.js";
import { check, validationResult } from "express-validator";

const route = new Router();

route.post(
    "/products",
    [
        check("title", "Not correct title").notEmpty(),
        check("price", "Not correct price").notEmpty(),
        check("category", "Not correct category").notEmpty(),
        check("description", "Not correct description").notEmpty(),
        check("image", "Not correct image").notEmpty(),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Not correct request", errors });
            }
            const { title, price, category, description, image } = req.body;

            const product = await Product.findOne({ title });

            if (product) {
                return res.status(400).json({
                    message: `Product already exist`,
                });
            }

            const prod = new Product({
                title,
                price,
                category,
                description,
                image,
            });
            await prod.save();
            return res.json({ message: "Product was created" });
        } catch (e) {
            res.send({ message: "Server error" });
        }
    }
);

route.get("/products", async (req, res) => {
    const products = await Product.find({});
    try {
        return res.json(products);
    } catch (e) {
        res.send({ message: "Server error" });
    }
});

route.get(`/products/:id`, async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    try {
        return res.json(product);
    } catch (e) {
        res.send({ message: "Server error" });
    }
});

export default route;
