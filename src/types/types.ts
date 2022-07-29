import { Request } from "express";

export interface ExtendedAuthRequest extends Request {
  id: string;
}
