import { connectToDatabase } from "../../services/mongodb";

import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { handleResponse } from "../../util/response";

export const CreateUserController = async (req: Request, res: Response) => {
  try {
    const { name, email, password: reqPass } = req.body;

    if (!name || !email || !reqPass) {
      handleResponse(res, 400, "insufficient data");
    }

    const db = await connectToDatabase();
    const collection = db.collection("users");

    const checkUser = await collection.findOne({ email });

    if (checkUser) {
      handleResponse(res, 400, "this email is already being used");
    }

    const password = bcrypt.hashSync(reqPass, bcrypt.genSaltSync(10));

    const user = await collection.insertOne({
      name,
      email,
      password,
    });

    handleResponse(res, 200, "User created successfully", user);
  } catch (error) {
    handleResponse(res, 400, error);
  }
};
