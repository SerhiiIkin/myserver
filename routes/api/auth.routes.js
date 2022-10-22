import { Router } from "express";
import { register, login, getUsers } from "../../controllers/auth.js";
import { checkDataRegisterForm } from "../../middlewares.js";

const router = new Router();

router.post("/register", [checkDataRegisterForm], register);

router.post("/login", login);
router.get("/users", getUsers);

export default router;
