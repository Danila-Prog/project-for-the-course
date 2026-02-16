import { VehiclesDTO, Vehicles, VehiclesTypeDTO } from "./types";

export class VehiclesModel {
  public static findVehiclesById(
    vehicles: Vehicles[],
    driverVehiclesId: number,
  ): Vehicles | undefined {
    return vehicles.find((vehicle) => driverVehiclesId === vehicle.vehiclesId);
  }

  public static mapDtoToVehicles(vehicles: VehiclesDTO[]): Vehicles[] {
    return vehicles.map((vehicles) => ({
      vehiclesId: vehicles.vehicles_id,
      nameVehicles: vehicles.name_vehicles,
      vehiclesTypeId: vehicles.vehicles_type_id,
      vehiclesCapacity: vehicles.vehicles_capacity,
      numberCar: vehicles.number_car,
    }));
  }

  public static mapDtoToVehiclesType(
    vehiclesType: VehiclesTypeDTO[],
  ): Pick<Vehicles, "vehiclesTypeId" | "vehiclesType">[] {
    return vehiclesType.map((vehicleType) => ({
      vehiclesTypeId: vehicleType.vehicles_type_id,
      vehiclesType: vehicleType.vehicles_type,
    }));
  }
}
