import { Filters } from "@/features/Logistician/lib/types";
import { DriverModel } from "./DriverModel";
import { Driver, DriversRepository, UpdatesDriver } from "./types";
import { User, UserService } from "@/entities/User";
import { VehiclesService } from "@/entities/Vehicles/model/VehiclesService";
import { Vehicles } from "@/entities/Vehicles";

export class DriverService {
  constructor(
    private readonly repository: DriversRepository,
    private readonly userService: UserService,
    private readonly vehicleService: VehiclesService,
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
    vehicles: Vehicles[],
    filters: Filters,
  ): Driver[] {
    return drivers.filter((driver) => {
      const user = this.userService.findUserById(users, driver.userId);

      if (!user) return;

      const vehicle =
        vehicles &&
        this.vehicleService.findVehiclesById(vehicles, driver.vehiclesId);

      const userExperience = Number(driver.experienceYears);
      const userCapacity = vehicle ? Number(vehicle.vehiclesCapacity) : 0;
      const onlyTypeCar = vehicle?.vehiclesType?.split(" ")[0] || "";

      const {
        search,
        experienceFrom,
        experienceBefore,
        capacityFrom,
        capacityBefore,
        typeCar,
      } = filters;

      const matchUser =
        (user.name &&
          `${user.name} ${user.surname}`
            .toLowerCase()
            .includes(search.toLowerCase())) ||
        (vehicle?.numberCar &&
          vehicle.numberCar.toLowerCase().includes(search.toLowerCase()));

      const matchesExperience =
        (experienceFrom ? userExperience >= Number(experienceFrom) : true) &&
        (experienceBefore ? userExperience <= Number(experienceBefore) : true);

      const matchCapacity =
        (capacityFrom ? userCapacity >= Number(capacityFrom) : true) &&
        (capacityBefore ? userCapacity <= Number(capacityBefore) : true);

      const matchesTypeCar =
        (typeCar === "passenger" && onlyTypeCar === "Легковой") ||
        (typeCar === "truck" && onlyTypeCar === "Грузовой") ||
        !typeCar;

      return matchUser && matchesExperience && matchesTypeCar && matchCapacity;
    });
  }

  public getStatusDrivers(drivers: Driver[], status: number) {
    return DriverModel.getStatusDrivers(drivers, status);
  }

  public findDriveById(drivers: Driver[], userId: number): Driver | undefined {
    return DriverModel.findDriveById(drivers, userId);
  }

  public getDriversVehiclesIds(drivers: Driver[]) {
    return DriverModel.getDriversVehiclesIds(drivers);
  }
}
