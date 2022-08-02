import { Request } from "express";

export interface ExtendedAuthRequest extends Request {
  locals: {
    auth: {
      id: string;
    };
  };
}
