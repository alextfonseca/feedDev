import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../services/mongodb";
import { ExtendedAuthRequest } from "../../types/types";

class DeleteFeedController {
  async handle(req: ExtendedAuthRequest, res: Response) {
    const { id: feedId } = req.params;

    const db = await connectToDatabase();
    const collection = db.collection("feeds");

    const { id } = req;

    const feeds = await collection.findOne({ _id: new ObjectId(feedId) });

    if (feeds.userId.toString() !== id) {
      return res
        .status(401)
        .json({ statusCode: 401, errors: "Não autorizado" });
    }

    await collection.deleteOne({ _id: new ObjectId(feedId) });

    return res.status(200).json({ message: "Feed deletado com sucesso" });
  }
}

export { DeleteFeedController };
