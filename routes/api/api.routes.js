import { Router } from "express";
import authRouter from "./auth.routes.js";
import productsRouter from "./products.routes.js";

import sendEmailRouter from "./sendEmail.routes.js";
import todoRouter from "./todos.routes.js";

const router = new Router();

router.use("/auth", authRouter);
router.use(productsRouter);
router.use(sendEmailRouter);
router.use(todoRouter);

export default router;
