import { Router } from "express";
import { createFeedController } from "../controllers/Feed/CreateFeedController";
import { deleteFeedController } from "../controllers/Feed/DeleteFeedController";
import { getFeedsController } from "../controllers/Feed/GetFeedsController";
import { updateFeedController } from "../controllers/Feed/UpdateFeedController";
import { Authenticated } from "../middlewares/Authenticated";

// import * as FeedController from "../controllers/Feed/FeedController";


// FeedController.create
// FeedController.update
// FeedController.delete

const feedRoutes = Router();

feedRoutes.post("/", Authenticated, createFeedController.handle);
feedRoutes.get("/", Authenticated, getFeedsController.handle);
feedRoutes.put("/:id", Authenticated, updateFeedController.handle);
feedRoutes.delete("/:id", Authenticated, deleteFeedController.handle);

export { feedRoutes };

