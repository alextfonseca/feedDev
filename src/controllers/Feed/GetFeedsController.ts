import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../services/mongodb";
import { ExtendedAuthRequest } from "../../types";
import { handleResponse } from "../../util/response";

export const GetFeedsController = async (
  req: ExtendedAuthRequest,
  res: Response,
) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("feeds");
    const userId = req.locals.auth.id;

    const feeds = await collection
      .find({ userId: new ObjectId(userId) })
      .toArray();

    console.log(userId);

    handleResponse(res, 200, feeds);
  } catch (error) {
    handleResponse(res, 500, error);
  }
};
