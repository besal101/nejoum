import * as health from "controllers/health";
import { Application } from "express";
import * as cars from "controllers/cars";
import { validateCarsCreate, validateCarsUpdate } from "models/validator";

export const attachPublicRoutes = (app: Application): void => {
  app.get("/", health.healthcheck);

  app.get("/cars", cars.getAllCars);
  app.post("/cars", validateCarsCreate, cars.createNewCar);

  app.get("/cars/:id", cars.getCarById);
  app.delete("/cars/:id", cars.deleteCarById);
  app.patch("/cars/:id", validateCarsUpdate, cars.updateCarById);
};
