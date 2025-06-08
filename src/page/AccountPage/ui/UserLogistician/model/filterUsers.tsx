import { IFilters } from "../lib/types";
import {
  IDriverDto,
  IUsersDto,
  IVehiclesDto,
  IVehiclesTypeDto,
} from "@/page/AuthPage/model/types";

export const filterDrivers = (
  drivers: IDriverDto[],
  users: IUsersDto[],
  vehicles: IVehiclesDto[],
  vehiclesTypes: IVehiclesTypeDto[],
  filters: IFilters
) => {
  return drivers.filter((driver) => {
    const user = users.find((u) => u.user_id === driver.user_id);
    if (!user) return false;

    const vehicle = vehicles.find((v) => v.vehicles_id === driver.vehicles_id);
    const vehicleType = vehicle
      ? vehiclesTypes.find(
          (vt) => vt.vehicles_type_id === vehicle.vehicles_type_id
        )
      : null;

    const userExperience = Number(driver.experience_years);
    const userCapacity = vehicle ? Number(vehicle.vehicles_capacity) : 0;
    const onlyTypeCar = vehicleType?.vehicles_type?.split(" ")[0] || "";

    const {
      search,
      experienceFrom,
      experienceBefore,
      capacityFrom,
      capacityBefore,
      typeCar,
    } = filters;

    const matchsUser =
      (user.name &&
        `${user.name} ${user.surname}`
          .toLowerCase()
          .includes(search.toLowerCase())) ||
      (vehicle?.number_car &&
        vehicle.number_car.toLowerCase().includes(search.toLowerCase()));

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

    return matchsUser && matchesExperience && matchesTypeCar && matchCapacity;
  });
};
