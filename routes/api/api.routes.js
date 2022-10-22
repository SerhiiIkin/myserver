import { Router } from "express";
import authRouter from "./auth.routes.js";
import productsRouter from "./products.routes.js";
import commentsRouter from "./comments.routes.js";
import sendEmailRouter from "./sendEmail.routes.js";

const router = new Router();

router.use("/auth", authRouter);
router.use(productsRouter);
router.use(commentsRouter);
router.use(sendEmailRouter);

export default router;
