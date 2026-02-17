import { Hono } from "hono";
import { UserController } from "../controllers/user.controller";
const api = new Hono();

const userController = new UserController();
api.get("/users/:id", userController.getUserDetail);
export default api;
