import { httpClient } from "@/shared/api/httpClient";
import { VehiclesDTO, VehiclesRepository, VehiclesTypeDTO } from "./types";

export class VehiclesApi implements VehiclesRepository {
  private readonly ENDPOINT_VEHICLES = "vehicles";

  public getVehicles() {
    return httpClient.get<VehiclesDTO[]>(this.ENDPOINT_VEHICLES);
  }

  public getVehiclesType() {
    return httpClient.get<VehiclesTypeDTO[]>(
      `${this.ENDPOINT_VEHICLES}/vehiclesType`,
    );
  }
}
