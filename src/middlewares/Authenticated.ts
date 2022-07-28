import { verify } from "jsonwebtoken";

interface IPayload {
  sub: string;
}

export function Authenticated(req, res, next) {
  // Receber o token
  const authToken = req.headers.authorization;

  // Validar se token está preenchido
  if (!authToken) {
    return res.status(401).json({ message: "Token não encontrado" });
  }

  const [, token] = authToken.split(" ");

  try {
    // Validar se token é válido
    const { sub } = verify(token, "superSenha") as IPayload;

    // Recuperar informações do usuário
    req.id = sub;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Token inválido" });
  }
}
