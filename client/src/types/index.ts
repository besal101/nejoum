export type PaginationOption = {
  limit: number;
  page: number;
};

export type SingleCarsOption = {
  id: number;
};

export type Cars = {
  id: number;
  make: string;
  model: string;
  shippingStatus: string;
  vin: string;
  year: number;
};
