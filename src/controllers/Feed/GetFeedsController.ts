import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../services/mongodb";
import { ExtendedAuthRequest } from "../../types/types";

class GetFeedsController {
  async handle(req: ExtendedAuthRequest, res: Response) {
    const db = await connectToDatabase();
    const collection = db.collection("feeds");
    const { id } = req;

    const feeds = await collection.find({ userId: new ObjectId(id) }).toArray();

    return res.status(200).json({ message: feeds });
  }
}

export { GetFeedsController };
