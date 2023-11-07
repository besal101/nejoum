import { Cars, PaginationOption } from "../../types";
import { useQuery } from "@tanstack/react-query";
import { QUERYKEYS } from "../constants";
import { API_URL } from "../../utils/routes";

const FetchAllCars = async (options: PaginationOption) => {
  const { page, limit } = options;
  let url = `${API_URL}/cars?`;
  if (limit) {
    url += `&limit=${limit}`;
  }
  if (page) {
    url += `&page=${page}`;
  }
  const response = await fetch(url);
  return response.json();
};

const useFetchAllCars = (options: PaginationOption) => {
  return useQuery<{ cars: Cars[]; totalPages: number; status: boolean }, Error>(
    {
      queryKey: [QUERYKEYS.GETALLCARS, options],
      queryFn: () => FetchAllCars(options),
    }
  );
};

export { useFetchAllCars };
