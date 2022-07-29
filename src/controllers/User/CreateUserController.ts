import { connectToDatabase } from "../../services/mongodb";

import bcrypt from "bcrypt";
import { Request, Response } from "express";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const { name, email, password: reqPass } = req.body;

    if (!name || !email || !reqPass) {
      return res.status(400).json({ message: "Dados insuficientes" });
    }

    const db = await connectToDatabase();
    const collection = db.collection("users");

    const checkUser = await collection.findOne({ email });

    if (checkUser) {
      return res
        .status(400)
        .json({ message: "Esse e-mail já esta sendo utilizado" });
    }

    const password = bcrypt.hashSync(reqPass, bcrypt.genSaltSync(10));

    const user = await collection.insertOne({
      name,
      email,
      password,
    });

    return res
      .status(200)
      .json({ message: "Usuário criado com sucesso", data: user });
  }
}

export const createUserController = new CreateUserController();
