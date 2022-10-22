import { Router } from "express";
import bcrypt from "bcryptjs";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Role from "../models/Role.js";

const router = new Router();

router.post(
    "/register",
    [
        check("username", "Can not be empty").notEmpty(),
        check("password", "Password should be from 3 to 20 symbol").isLength({
            min: 3,
            max: 20,
        }),
        check("status", "Not correct status"),
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res
                    .status(400)
                    .json({ message: "Not correct request" }, errors);
            }

            const { username, password } = req.body;

            const candidate = await User.findOne({ username });

            if (candidate) {
                return res.status(400).json({
                    message: `User with username ${username} already exist`,
                });
            }

            const hashPassword = await bcrypt.hash(password, 4);
            const userRole = await Role.findOne({ value: "USER" });
            const user = new User({
                username,
                password: hashPassword,
                roles: [userRole.value],
            });
            await user.save();

            return res.json({ message: "User was created" });
        } catch (e) {
            console.log(e);
            res.send({ message: "Server error" });
        }
    }
);

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPassValid = bcrypt.compareSync(password, user.password);
        if (!isPassValid) {
            return res.status(400).json({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.secretJwt, {
            expiresIn: "1h",
        });

        return res.json({
            token,
            user: {
                id: user.id,
                username: user.username,
                role: user.roles[0],
            },
            message: "You enter in the system",
        });
    } catch (e) {
        res.send({ message: "Server error" });
    }
});

router.get("/users", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (e) {}
});

export default router;
