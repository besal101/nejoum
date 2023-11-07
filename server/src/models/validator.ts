import { validate } from "middleware/validate";
import { PartialCarschema, CarsSchema } from "./schema";

export const validateCarsCreate = validate(CarsSchema);

export const validateCarsUpdate = validate(PartialCarschema);
