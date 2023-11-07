import { catchErrors } from "errors";
import prisma from "utils/prisma";

// Create a new Car with function
export const createNewCar = catchErrors(async (req, res) => {
  const newCar = req.body;
  const car = await prisma.car.create({
    data: newCar,
  });
  res.respond({ car });
});

/**
 * Get all the cars
 * parameter is required
 * example parameter to be passed
 * page=1&limit=10
 */
export const getAllCars = catchErrors(async (req, res) => {
  const pageParam = req.query.page as string;
  const page = parseInt(pageParam, 10);
  if (isNaN(page)) {
    res.status(400).json({ error: "Invalid page parameter" });
    return;
  }
  const limitParam = req.query.limit as string;
  const limit = parseInt(limitParam, 10);
  if (isNaN(limit)) {
    res.status(400).json({ error: "Invalid limit parameter" });
    return;
  }

  const offset = (page - 1) * limit;
  const cars = await prisma.car.findMany({
    skip: offset,
    take: limit,
  });
  res.respond({ cars });
});

//Get a single cars based on id of the car
export const getCarById = catchErrors(async (req, res) => {
  const carId = parseInt(req.params.id);
  if (isNaN(carId)) {
    res.status(400).json({ error: "Invalid car id provided" });
    return;
  }
  const car = await prisma.car.findUnique({
    where: {
      id: carId,
    },
  });
  if (!car) {
    return res.status(404).json({ error: "Car not found." });
  }
  res.respond(car);
});

//Delete a car based on the id of the car
export const deleteCarById = catchErrors(async (req, res) => {
  const carId = parseInt(req.params.id);
  if (isNaN(carId)) {
    res.status(400).json({ error: "Invalid car id provided" });
    return;
  }
  const car = await prisma.car.delete({
    where: {
      id: carId,
    },
  });
  if (!car) {
    return res.status(404).json({ error: "Car not found." });
  }
  res.respond({ message: "Car deleted Successfully" });
});

//Update a car details based on the id of the car
export const updateCarById = catchErrors(async (req, res) => {
  const carId = parseInt(req.params.id);
  if (isNaN(carId)) {
    res.status(400).json({ error: "Invalid car id provided" });
    return;
  }
  const newStatus = req.body.shippingStatus;

  await prisma.car.update({
    where: { id: carId },
    data: { shippingStatus: newStatus },
  });
  res.respond({ message: "Car updated Successfully" });
});
