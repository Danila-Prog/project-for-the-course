import { ApiResponse } from "@/shared/api/httpClient";

export interface VehiclesDTO {
  number_car: string;
  vehicles_id: number;
  vehicles_type_id: number;
  vehicles_capacity: string;
  name_vehicles: string;
}

export interface VehiclesTypeDTO {
  vehicles_type_id: number;
  vehicles_type: "Легковой" | "Грузовой";
}

export interface Vehicles {
  numberCar: string;
  vehiclesId: number;
  vehiclesCapacity: string;
  nameVehicles: string;
  vehiclesTypeId: number;
  vehiclesType?: "Легковой" | "Грузовой";
}

export interface VehiclesRepository {
  getVehicles: () => ApiResponse<VehiclesDTO[]>;
  getVehiclesType: () => ApiResponse<VehiclesTypeDTO[]>;
}
