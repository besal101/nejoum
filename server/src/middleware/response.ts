import { RequestHandler } from "express";

declare global {
  namespace Express {
    interface Response {
      respond: (data: any) => void;
    }
  }
}

export const addRespondToResponse: RequestHandler = (_req, res, next) => {
  res.respond = (data): void => {
    res.status(200).send(data);
  };
  next();
};
