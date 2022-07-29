import { verify } from "jsonwebtoken";

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
    const { sub } = verify(token, "superSenha") as IPayload;

    // req.locals = {
    //   auth: <ExtendedAuthRequest['locals']['auth']>(
    //     verify(token, process.env.JWT_USER_TOKEN || '')
    //   )
    // }

    // Recuperar informações do usuário
    req.id = sub;

    next();
  } catch (err) {
    return res.status(401).json({ message: "Not authorized!" });
  }
}


// const UserControl = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<Response | void> => {
//   const bearer = req.headers.authorization || ''
//   const token = bearer.split(' ')[1]

//   if (!token) {
//     return res.status(401).send({ error: 'Não autorizado!' })
//   }

//   try {
//     res.locals.auth = <any>verify(token, process.env.JWT_USER_TOKEN || '')
//     next()
//   } catch (e) {
//     console.log(e)
//     return res.status(401).send({ error: 'Não autorizado!' })
//   }
// }
