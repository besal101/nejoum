import { z } from "zod";

export const CarsSchema = z.object({
  make: z
    .string({
      required_error: "Make is required",
    })
    .trim()
    .min(1, "Make cannot be empty"),
  model: z
    .string({
      required_error: "Model is required",
    })
    .trim()
    .min(1, "Model cannot be empty"),
  year: z
    .number({
      required_error: "Year is required",
    })
    .min(2, "Year cannot be empty"),
  vin: z
    .string({
      required_error: "Vin is required",
    })
    .trim()
    .min(2, "Vin cannot be empty"),
  shippingStatus: z
    .string({
      required_error: "Shipping Status is required",
    })
    .trim()
    .min(2, "Shipping Status cannot be empty"),
});

export type CreateCarsDto = z.infer<typeof CarsSchema>;

export const PartialCarschema = CarsSchema.partial();

export type UpdateCarsDto = z.infer<typeof PartialCarschema>;
