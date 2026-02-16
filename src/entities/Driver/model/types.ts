import { ApiResponse, RequestConfig } from "@/shared/api/httpClient";

export interface DriverDto {
  driver_id: number;
  experience_years: number;
  status_driver_id: number;
  user_id: number;
  vehicles_id: number;
  photo_url: string | null;
}

export interface Driver {
  driverId: number;
  experienceYears: number;
  statusDriverId: number;
  userId: number;
  vehiclesId: number;
  photoUrl: string | null;
}
export type Updates = Partial<{
  status_driver_id: number | null;
  vehicles_id: number | null;
}>;

export type DriversRepository = {
  getDrivers: () => ApiResponse<DriverDto[]>;
  getDriverById: (driverId: number) => ApiResponse<DriverDto[]>;
  updateDriver: ({
    payload,
  }: RequestConfig<{
    driver_id: number;
    updates: Updates;
  }>) => ApiResponse<DriverDto[]>;

  uploadPhoto: (
    driverId: number,
    { payload }: RequestConfig<FormData>,
  ) => ApiResponse<DriverDto>;
};
