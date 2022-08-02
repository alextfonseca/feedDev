import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../services/mongodb";
import { ExtendedAuthRequest } from "../../types";
import { handleResponse } from "../../util/response";

export const DeleteFeedController = async (
  req: ExtendedAuthRequest,
  res: Response,
) => {
  try {
    const { id: feedId } = req.params;

    const db = await connectToDatabase();
    const collection = db.collection("feeds");

    const userId = req.locals.auth.id;

    const feeds = await collection.findOne({ _id: new ObjectId(feedId) });

    if (feeds.userId.toString() !== userId) {
      return handleResponse(res, 401, "Not authorized");
    }

    await collection.deleteOne({ _id: new ObjectId(feedId) });

    return handleResponse(res, 200, "feed successfully deleted");
  } catch (error) {
    return handleResponse(res, 500, error);
  }
};
