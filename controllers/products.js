import { validationResult } from "express-validator";
import Product from "../models/Product.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

export async function createProduct(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res
                .status(400)
                .json({ message: "Not correct request", errors });
        }
        const { title, price, category, description } = req.body;

        console.log(req.host);

        let imageName = Date.now().toString() + req.files.image.name;
        const __dirname = dirname(fileURLToPath(import.meta.url));
        req.files.image.mv(path.join(__dirname, "..", "uploads", imageName));

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
            image: `https://${req.hostname}/${imageName}`,
        });

        await prod.save();

        return res.json({ message: "Product was created" });
    } catch (e) {
        res.send({ message: "Server error" });
    }
}

export async function getProducts(req, res) {
    try {
        const products = await Product.find({}).sort("-createdAt");

        if (!products) {
            return res.json({ message: "Products not founded" });
        }

        return res.json(products);
    } catch (e) {
        res.send({ message: "Server error" });
    }
}

export async function getOneProduct(req, res) {
    const product = await Product.findOne({ _id: req.params.id });
    try {
        return res.json(product);
    } catch (e) {
        res.send({ message: "Server error" });
    }
}
