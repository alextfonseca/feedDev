import { Request } from "express";

export interface ExtendedAuthRequest extends Request {
  id: string;
}

// export interface ExtendedAuthRequest extends NextApiRequest {
//   locals: {
//     auth: {
//       id: string
//     }
//   }
// }
