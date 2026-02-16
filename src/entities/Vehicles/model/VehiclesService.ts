import { Vehicles, VehiclesRepository } from "./types";
import { VehiclesModel } from "./VehiclesModel";

export class VehiclesService {
  constructor(private readonly repository: VehiclesRepository) {}

  async getVehicles() {
    const [{ data }, { data: vehiclesType }] = await Promise.all([
      this.repository.getVehicles(),
      this.repository.getVehiclesType(),
    ]);

    const normalizeVehiclesType =
      VehiclesModel.mapDtoToVehiclesType(vehiclesType);

    return VehiclesModel.mapDtoToVehicles(data).map((vehicle) => ({
      ...vehicle,
      vehiclesType: normalizeVehiclesType.find(
        (vehiclesType) =>
          vehicle.vehiclesTypeId === vehiclesType.vehiclesTypeId,
      )?.vehiclesType,
    }));
  }

  findVehiclesById(vehicles: Vehicles[], driverVehiclesId: number) {
    return VehiclesModel.findVehiclesById(vehicles, driverVehiclesId);
  }
}
