import { catchErrors } from "errors";

export const healthcheck = catchErrors(async (_req, res) => {
  res.status(200).send("OK");
});
