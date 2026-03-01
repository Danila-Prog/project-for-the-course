import { Driver, DriverDto } from "./types";

export class DriverModel {
  public static findDriveById(
    drivers: Driver[],
    userId: number,
  ): Driver | undefined {
    return drivers.find((driver) => driver.userId === userId);
  }

  public static getDriversVehiclesIds(drivers: Driver[]) {
    return new Set(drivers.map((driver) => driver.vehiclesId));
  }

  public static mapDtoToDrivers(driverDto: DriverDto[]): Driver[] {
    return driverDto.map((driver) => ({
      driverId: driver.driver_id,
      experienceYears: driver.experience_years,
      statusDriverId: driver.status_driver_id,
      userId: driver.user_id,
      vehiclesId: driver.vehicles_id,
      photoUrl: driver.photo_url,
    }));
  }

  public static mapDtoToDriver(driverDto: DriverDto): Driver {
    return {
      driverId: driverDto.driver_id,
      experienceYears: driverDto.experience_years,
      statusDriverId: driverDto.status_driver_id,
      userId: driverDto.user_id,
      vehiclesId: driverDto.vehicles_id,
      photoUrl: driverDto.photo_url,
    };
  }

  public static getStatusDrivers(drivers: Driver[], status: number) {
    return drivers.filter((driver) => driver.statusDriverId === status);
  }
}
