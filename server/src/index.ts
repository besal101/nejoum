import "module-alias/register";
import "dotenv/config";
import express, { Application } from "express";
import cors from "cors";
import { attachPublicRoutes } from "routes";
import { RouteNotFoundError } from "errors";
import { handleError } from "middleware/errors";
import { addRespondToResponse } from "middleware/response";

const initializeExpress = (): void => {
  const app: Application = express();

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(addRespondToResponse);

  attachPublicRoutes(app);

  app.use((req, _res, next) => next(new RouteNotFoundError(req.originalUrl)));
  app.use(handleError);

  app.listen(process.env.PORT || 5000);
};

const initializeApp = async (): Promise<void> => {
  initializeExpress();
};

initializeApp();
