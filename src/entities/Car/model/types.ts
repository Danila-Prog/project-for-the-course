import { ApiResponse } from "@/shared/api/httpClient";

export interface CarDTO {
  number_car: string;
  car_id: number;
  car_type_id: number;
  weight: string;
  name: string;
}

export interface CarTypeDTO {
  car_type_id: number;
  car_type: "Легковой" | "Грузовой";
}

export interface Car extends Pick<CarDTO, "name" | "weight"> {
  numberCar: string;
  carId: number;
  carTypeId: number;
  carType?: "Легковой" | "Грузовой";
}

export interface CarRepository {
  getCar: () => ApiResponse<CarDTO[]>;
  getCarType: () => ApiResponse<CarTypeDTO[]>;
}
