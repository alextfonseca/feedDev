import { Router } from "express";
import { AuthUserController } from "../controllers/User/AuthUserController";
import { CreateUserController } from "../controllers/User/CreateUserController";

const userRoutes = Router();

userRoutes.post("/", CreateUserController);
userRoutes.post("/auth", AuthUserController);

export { userRoutes };
