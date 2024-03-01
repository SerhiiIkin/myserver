import Router from "express";
import { getAllUsers, deleteUser } from "../../controllers/users.js";

const route = new Router();

route.delete("/user/:username", deleteUser);

route.get("/users", getAllUsers);

export default route;
