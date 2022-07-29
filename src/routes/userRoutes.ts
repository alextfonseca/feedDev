import { Router } from "express";
import { authUserController } from "../controllers/User/AuthUserController";
import { createUserController } from "../controllers/User/CreateUserController";

const userRoutes = Router();

userRoutes.post("/", createUserController.handle);
userRoutes.post("/auth", authUserController.handle);

export { userRoutes };
