import { SingleCarsOption } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "../constants";
import { API_URL } from "../../utils/routes";

const FetchSingleCar = async (options: SingleCarsOption) => {
  const { id } = options;
  let url = `${API_URL}/cars/${id}`;
  const response = await fetch(url);
  return response.json();
};

const useFetchSingleCar = (options: SingleCarsOption) => {
  return useQuery({
    queryKey: [QUERYKEYS.GETALLCARS, options],
    queryFn: () => FetchSingleCar(options),
  });
};

export { useFetchSingleCar };
