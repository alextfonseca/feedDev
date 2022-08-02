import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../services/mongodb";
import { ExtendedAuthRequest } from "../../types";
import { handleResponse } from "../../util/response";

export const UpdateFeedController = async (
  req: ExtendedAuthRequest,
  res: Response,
) => {
  try {
    const { title, description, url } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection("feeds");

    const userId = req.locals.auth.id;

    const feeds = await collection.findOne({
      _id: new ObjectId(req.params.id),
    });

    if (feeds.userId.toString() !== userId) {
      handleResponse(res, 401, "Not authorized");
    }

    await collection.updateOne(
      { _id: new ObjectId(req.params.id) },
      {
        $set: {
          title,
          description,
          url,
        },
      },
    );
    handleResponse(res, 200, "Feed updated successfully");
  } catch (error) {
    handleResponse(res, 500, error);
  }
};
