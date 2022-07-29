import { Router } from "express";
import { feedRoutes } from "./routes/feedRoutes";
import { userRoutes } from "./routes/userRoutes";

const router = Router();

router.use("/feed", feedRoutes);
router.use("/user", userRoutes);

export { router };
