import { Filters } from "@/features/Logistician/lib/types";
import { DriverModel } from "./DriverModel";
import { Driver, DriversRepository, UpdatesDriver } from "./types";
import { User, UserService, CarService, Car } from "@/entities";

export class DriverService {
  constructor(
    private readonly repository: DriversRepository,
    private readonly userService: UserService,
    private readonly carService: CarService,
  ) {}

  public async getDrivers(): Promise<Driver[]> {
    const { data } = await this.repository.getDrivers();

    return DriverModel.mapDtoToDrivers(data);
  }

  public async getDriverById(driverId: number): Promise<Driver> {
    const { data } = await this.repository.getDriverById(driverId);
    return DriverModel.mapDtoToDriver(data[0]);
  }

  public async getDriverByUserId(userId: number): Promise<Driver> {
    const { data } = await this.repository.getDriverByUserId(userId);

    return DriverModel.mapDtoToDriver(data[0]);
  }

  public async createDriver(formData: {
    userId: number;
    experienceYears: number;
  }) {
    await this.repository.createDriver({ payload: formData });
  }

  public async uploadDriverPhoto(driverId: number, formData: FormData) {
    await this.repository.uploadPhoto(driverId, { payload: formData });
  }

  public async updateDriver(driverId: number, updates: UpdatesDriver) {
    try {
      await this.repository.updateDriver({
        payload: { driver_id: driverId, updates: updates },
      });
    } catch (error) {
      console.error("Error updating driver:", error);
      throw error;
    }
  }

  public getFilteredDrivers(
    drivers: Driver[],
    users: User[],
    cars: Car[],
    filters: Filters,
  ): Driver[] {
    return drivers.filter((driver) => {
      const user = this.userService.findUserById(users, driver.userId);

      if (!user) return;

      const car = cars && this.carService.findCarById(cars, driver.carId);

      const userExperience = Number(driver.experienceYears);
      const userCapacity = car ? Number(car.weight) : 0;

      const { experienceFrom, experienceBefore, capacityFrom, capacityBefore } =
        filters;

      const matchesExperience =
        (experienceFrom ? userExperience >= Number(experienceFrom) : true) &&
        (experienceBefore ? userExperience <= Number(experienceBefore) : true);

      const matchCapacity =
        (capacityFrom ? userCapacity >= Number(capacityFrom) : true) &&
        (capacityBefore ? userCapacity <= Number(capacityBefore) : true);

      return matchesExperience && matchCapacity;
    });
  }

  public getStatusDrivers(drivers: Driver[], status: number) {
    return DriverModel.getStatusDrivers(drivers, status);
  }

  public findDriveById(drivers: Driver[], userId: number): Driver | undefined {
    return DriverModel.findDriveById(drivers, userId);
  }

  public getDriversCarsIds(drivers: Driver[]) {
    return DriverModel.getDriversCarsIds(drivers);
  }
}
