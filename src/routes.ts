import { Router } from "express";
import { CreateFeedController } from "./controllers/Feed/CreateFeedController";
import { AuthUserController } from "./controllers/User/AuthUserController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { Authenticated } from "./middlewares/Authenticated";

const router = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();

const createFeedController = new CreateFeedController();

router.post("/user", createUserController.handle);
router.post("/user/auth", authUserController.handle);

router.post("/feed", Authenticated, createFeedController.handle);
router.get("/feeds");
router.put("/feeds");
router.delete("/feeds");

export { router };
