import { Hono } from "hono";
import { UserController } from "../controllers/user.controller";
const api = new Hono();

const userController = new UserController();
api.get("/users", userController.getAllUsers);
api.get("/user/:id", userController.getUserDetail);
export default api;
