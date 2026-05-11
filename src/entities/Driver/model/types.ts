import { ApiResponse, RequestConfig } from "@/shared/api/httpClient";

export interface DriverDto {
  driver_id: number;
  experience_years: number;
  status_driver_id: 1 | 2 | 3;
  user_id: number;
  car_id: number;
  photo_url: string | null;
}

export interface Driver {
  driverId: number;
  experienceYears: number;
  statusDriverId: 1 | 2 | 3;
  userId: number;
  carId: number;
  photoUrl: string | null;
}
export type UpdatesDriver = Partial<{
  status_driver_id: number | null;
  car_id: number | null;
}>;

export type DriversRepository = {
  getDrivers: () => ApiResponse<DriverDto[]>;
  getDriverById: (driverId: number) => ApiResponse<DriverDto[]>;
  getDriverByUserId: (userId: number) => ApiResponse<DriverDto[]>;
  updateDriver: ({
    payload,
  }: RequestConfig<{
    driver_id: number;
    updates: UpdatesDriver;
  }>) => ApiResponse<DriverDto[]>;

  uploadPhoto: (
    driverId: number,
    { payload }: RequestConfig<FormData>,
  ) => ApiResponse<DriverDto>;
};
