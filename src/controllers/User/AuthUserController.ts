import { Request, Response } from "express";
import { connectToDatabase } from "../../services/mongodb";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { handleResponse } from "../../util/response";
import { ExtendedAuthRequest } from "../../types";

export const AuthUserController = async (
  req: ExtendedAuthRequest,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    const db = await connectToDatabase();
    const collection = db.collection("users");

    const user = await collection.findOne({ email });

    if (!email || !(await bcrypt.compare(password, user.password))) {
      handleResponse(res, 400, "Invalid credentials");
    }

    const accessToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_PASSWORD,
      { subject: user._id.toString(), expiresIn: "30d" },
    );
    handleResponse(res, 200, accessToken);
  } catch (error) {
    handleResponse(res, 400, error);
  }
};
