import { check } from "express-validator";

export function checkDataRegisterForm(req, res, next) {
    check("username", "Can not be empty").notEmpty(),
        check("password", "Password should be from 3 to 20 symbol").isLength({
            min: 3,
            max: 20,
        }),
        check("status", "Not correct status"),
        next();
}

export function checkDataComments(req, res, next) {
    check("postId", "Not correct postId").notEmpty(),
        check("username", "Not correct username").notEmpty(),
        check("body", "Not correct body").notEmpty(),
        check("date", "Not correct date").notEmpty();
    next();
}

export function checkDataProduct(req, res, next) {
    check("title", "Not correct title").notEmpty(),
        check("price", "Not correct price").notEmpty(),
        check("category", "Not correct category").notEmpty(),
        check("description", "Not correct description").notEmpty(),
        check("image", "Not correct image").notEmpty();
    next();
}

export function checkDataTodo(req, res, next) {
    check("title", "Not correct title").notEmpty(),
        check("description", "Not correct description").notEmpty(),
        check("isDone", "Not correct isDone").isBoolean();
    next();
}
export function checkDataTodoUpdate(req, res, next) {
    check("_id", "Not correct _id").notEmpty(),
    check("title", "Not correct title").notEmpty(),
        check("description", "Not correct description").notEmpty(),
        check("isDone", "Not correct isDone").isBoolean();
    next();
}
