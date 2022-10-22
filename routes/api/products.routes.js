import Router from "express";

import { checkDataProduct } from "../../middlewares.js";
import { createProduct, getProducts, getOneProduct } from "../../controllers/products.js";

const route = new Router();

route.post("/product", [checkDataProduct], createProduct);

route.get("/products", getProducts);

route.get(`/product/:id`, getOneProduct);

export default route;
