import { httpClient, RequestConfig } from "@/shared/api/httpClient";
import { DriverDto, DriversRepository, Updates } from "./types";

export class DriverApi implements DriversRepository {
  private readonly ENDPOINT = "drivers";

  getDrivers() {
    return httpClient.get<DriverDto[]>(this.ENDPOINT);
  }

  getDriverById(driverId: number) {
    return httpClient.get<DriverDto[]>(`${this.ENDPOINT}/${driverId}`);
  }

  uploadPhoto(driverId: number, { payload }: RequestConfig<FormData>) {
    return httpClient.patch<DriverDto>(`${this.ENDPOINT}/${driverId}`, payload);
  }

  updateDriver({
    payload,
  }: RequestConfig<{
    driver_id: number;
    updates: Updates;
  }>) {
    return httpClient.patch<DriverDto[]>(this.ENDPOINT, payload);
  }
}
