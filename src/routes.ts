import { Router } from "express";
import { CreateFeedController } from "./controllers/Feed/CreateFeedController";
import { DeleteFeedController } from "./controllers/Feed/DeleteFeedController";
import { GetFeedsController } from "./controllers/Feed/GetFeedsController";
import { UpdateFeedController } from "./controllers/Feed/UpdateFeedController";
import { AuthUserController } from "./controllers/User/AuthUserController";
import { CreateUserController } from "./controllers/User/CreateUserController";
import { Authenticated } from "./middlewares/Authenticated";

const router = Router();

const createUserController = new CreateUserController();
const authUserController = new AuthUserController();

const createFeedController = new CreateFeedController();
const getFeedsController = new GetFeedsController();
const updateFeedController = new UpdateFeedController();
const deleteFeedController = new DeleteFeedController();

router.post("/user", createUserController.handle);
router.post("/user/auth", authUserController.handle);

router.post("/feed", Authenticated, createFeedController.handle);
router.get("/feeds", Authenticated, getFeedsController.handle);
router.put("/feed/:id", Authenticated, updateFeedController.handle);
router.delete("/feed/:id", Authenticated, deleteFeedController.handle);

export { router };
