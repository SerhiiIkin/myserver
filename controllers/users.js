import User from "../models/User.js";

export async function deleteUser(req, res) {
    try {
        await User.findOneAndDelete({ _id: req.params.username });

        return res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: "Cant delete user" });
    }
}

export async function getAllUsers(req, res) {
    const users = await User.find({});

    try {
        return res.json(users);
    } catch (error) {
        res.status(500).send({ message: "Cant get users" });
    }
}
