import Router from "express";

import { checkDataProduct } from "../../middlewares.js";
import {
    createProduct,
    getProducts,
    getOneProduct,
    deleteProduct,
    updateProduct
} from "../../controllers/products.js";
import commentsRouter from "./comments.routes.js";

const route = new Router();

route.use("/product", commentsRouter);

route.post("/product", checkDataProduct, createProduct);

route.get("/products", getProducts);

route.get(`/product/:id`, getOneProduct);

route.delete("/product/:id", deleteProduct);

route.put("/product", checkDataProduct, updateProduct)

export default route;
