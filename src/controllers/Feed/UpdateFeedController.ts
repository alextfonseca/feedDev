import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../services/mongodb";
import { ExtendedAuthRequest } from "../../types";

class UpdateFeedController {
  async handle(req: ExtendedAuthRequest, res: Response) {
    const { title, description, url } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection("feeds");

    const { id } = req;

    const feeds = await collection.findOne({ _id: new ObjectId(req.params.id) });

    if (feeds.userId.toString() !== id) {
      return res
        .status(401)
        .json({ statusCode: 401, errors: "Não autorizado" });
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

    return res.status(200).json({ message: "Feed atualizado com sucesso" });
  }
}

export const updateFeedController = new UpdateFeedController();
