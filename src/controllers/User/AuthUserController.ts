import { Request, Response } from "express";
import { connectToDatabase } from "../../services/mongodb";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection("users");

    const user = await collection.findOne({ email });

    if (!email || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        message: "Falha ao fazer o login! Verifique suas credenciais!",
      });
    }

    const accessToken = jwt.sign(
      {
        email: user.email,
      },
      "superSenha",
      { subject: user._id.toString(), expiresIn: "30d" },
    );

    res.status(200).json({ accessToken });
  }
}

export { AuthUserController };
