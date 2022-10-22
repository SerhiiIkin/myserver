import User from "../models/User.js";
import Role from "../models/Role.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";

export async function register(req, res) {
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

export async function login(req, res) {
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
}

export async function getUsers(req, res) {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (e) {
        res.status(500).send({ message: "Server error" });
    }
}
