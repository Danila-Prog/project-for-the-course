import { httpClient, RequestConfig } from "@/shared/api/httpClient";
import { DriverDto, DriversRepository, UpdatesDriver } from "./types";

export class DriverApi implements DriversRepository {
  private readonly ENDPOINT = "drivers";

  getDrivers() {
    return httpClient.get<DriverDto[]>(this.ENDPOINT);
  }

  getDriverById(driverId: number) {
    return httpClient.get<DriverDto[]>(`${this.ENDPOINT}/${driverId}`);
  }

  getDriverByUserId(userId: number) {
    return httpClient.get<DriverDto[]>(`${this.ENDPOINT}/user/${userId}`);
  }

  uploadPhoto(driverId: number, { payload }: RequestConfig<FormData>) {
    return httpClient.patch<DriverDto>(`${this.ENDPOINT}/${driverId}`, payload);
  }

  updateDriver({
    payload,
  }: RequestConfig<{
    driver_id: number;
    updates: UpdatesDriver;
  }>) {
    return httpClient.patch<DriverDto[]>(this.ENDPOINT, payload);
  }
}
