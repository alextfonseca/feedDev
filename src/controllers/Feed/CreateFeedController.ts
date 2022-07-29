import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../../services/mongodb";
import { ExtendedAuthRequest } from "../../types";

class CreateFeedController {
  async handle(req: ExtendedAuthRequest, res: Response) {
    const { title, description, url } = req.body;

    if (!title || !description || !url) {
      return res.status(400).json({ message: "Dados insuficientes" });
    }

    // Joi Celebrate

    const db = await connectToDatabase();
    const collection = db.collection("feeds");

    const { id } = req;

    const checkUser = await collection.findOne({ id });

    if (checkUser) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const { insertedId } = await collection.insertOne({
      title,
      description,
      url,
      userId: new ObjectId(id),
    });

    return res
      .status(200)
      .json({ message: "Feed criado com sucesso", id: insertedId });
  }
}

export const createFeedController = new CreateFeedController();
