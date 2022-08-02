import { Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../services/mongodb";
import { ExtendedAuthRequest } from "../../types";
import { handleResponse } from "../../util/response";

export const CreateFeedController = async (
  req: ExtendedAuthRequest,
  res: Response,
) => {
  try {
    const { title, description, url } = req.body;

    if (!title || !description || !url) {
      handleResponse(res, 400, "insufficient data");
    }

    // Joi Celebrate

    const db = await connectToDatabase();
    const collection = db.collection("feeds");

    const userId = req.locals.auth.id;

    const checkUser = await collection.findOne({ userId });

    if (checkUser) {
      handleResponse(res, 400, "User not found");
    }

    const { insertedId } = await collection.insertOne({
      title,
      description,
      url,
      userId: new ObjectId(userId),
    });

    handleResponse(res, 200, "Feed created successfully", insertedId);
  } catch (error) {
    handleResponse(res, 400, error);
  }
};
