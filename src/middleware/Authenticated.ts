import { verify } from "jsonwebtoken";
import { ExtendedAuthRequest } from "../types";

interface IPayload {
  sub: string;
}

export function Authenticated(req, res, next) {
  // Receber o token
  const authToken = req.headers.authorization;

  // Validar se token está preenchido
  if (!authToken) {
    return res.status(401).json({ message: "Not authorized!" });
  }

  const [, token] = authToken.split(" ");

  try {
    // Validar se token é válido
    req.locals = {
      auth: <ExtendedAuthRequest["locals"]["auth"]>(
        verify(token, process.env.JWT_PASSWORD || "")
      ),
    };

    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized!" });
  }
}
