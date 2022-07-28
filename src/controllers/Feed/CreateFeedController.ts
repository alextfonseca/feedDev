import { Request, Response } from "express";
import { connectToDatabase } from "../../services/mongodb";

class CreateFeedController {
  async handle(req: Request, res: Response) {
    const { title, description, url } = req.body;

    if (!title || !description || !url) {
      return res.status(400).json({ message: "Dados insuficientes" });
    }
    const db = await connectToDatabase();
    const collection = db.collection("feeds");

    const { id }: any = req;

    const checkUser = await collection.findOne({ id });

    if (checkUser) {
      return res.status(400).json({ message: "Usuário não encontrado" });
    }

    const { insertedId } = await collection.insertOne({
      title,
      description,
      url,
      userId: id,
    });

    return res
      .status(200)
      .json({ message: "Feed criado com sucesso", id: insertedId });
  }
}

export { CreateFeedController };
