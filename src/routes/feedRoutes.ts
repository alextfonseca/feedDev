import { Router } from "express";
import { CreateFeedController } from "../controllers/Feed/CreateFeedController";
import { DeleteFeedController } from "../controllers/Feed/DeleteFeedController";
import { GetFeedsController } from "../controllers/Feed/GetFeedsController";
import { UpdateFeedController } from "../controllers/Feed/UpdateFeedController";
import { Authenticated } from "../middleware/Authenticated";

const feedRoutes = Router();

feedRoutes.post("/", Authenticated, CreateFeedController);
feedRoutes.get("/", Authenticated, GetFeedsController);
feedRoutes.put("/:id", Authenticated, UpdateFeedController);
feedRoutes.delete("/:id", Authenticated, DeleteFeedController);

export { feedRoutes };
