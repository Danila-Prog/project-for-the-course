import { User, UserService } from "@/entities/User";
import { HistoryRoutesRepository, CreateRouteForHistory } from "../api/type";
import { HistoryRouteModel } from "./HistoryRouteModel";
import {
  CarService,
  Car,
  RouteService,
  Route,
  Driver,
  DriverService,
} from "@/entities";
import { Filters } from "@/features";

export class HistoryRoutesService {
  private _routeService: RouteService | null = null;

  constructor(
    private readonly historyRouteRepository: HistoryRoutesRepository,
    private readonly userService: UserService,
    private readonly carService: CarService,
    private readonly driverService: DriverService,
  ) {}

  public setRouteService(service: RouteService) {
    this._routeService = service;
  }

  async getHistoryRoutes() {
    const { data } = await this.historyRouteRepository.getHistoryRoutes();
    return HistoryRouteModel.mapDTOToHistoryRoutes(data);
  }

  async createRouteForHistory(payload: CreateRouteForHistory) {
    return this.historyRouteRepository.createRouteForHistory({ payload });
  }

  async getDataForCardHistoryRoute() {
    try {
      const [allHistoryRoutes, users, cars, routes, drivers] =
        await Promise.all([
          this.getHistoryRoutes(),
          this.userService.getUsers(),
          this.carService.getCars(),
          this._routeService?.getRoutes(),
          this.driverService.getDrivers(),
        ]);

      if (!routes || !users || !cars) return [];

      return allHistoryRoutes
        .map((historyRoute) => {
          const driver = this.driverService.findDriveById(
            drivers,
            historyRoute.userId,
          );

          const user = this.userService.findUserById(
            users,
            historyRoute.userId,
          );

          const car = this.carService.findCarById(cars, historyRoute.carId);

          const route = this._routeService?.findRouteById(
            routes,
            historyRoute.routeId,
          );

          if (!driver || !user || !car || !route) {
            return;
          }

          return {
            driver,
            user,
            car,
            route,
          };
        })
        .filter(
          (
            item,
          ): item is {
            driver: Driver;
            user: User;
            car: Car;
            route: Route;
          } => item !== undefined,
        );
    } catch (error) {
      console.error("Error in getDataForCardHistoryRoute:", error);
      throw new Error("Failed to retrieve data for history routes.");
    }
  }
  public getFilteredHistoryRoutes(
    historyRoutes: {
      driver: Driver;
      user: User;
      car: Car;
      route: Route;
    }[],
    filters: Filters,
  ) {
    return historyRoutes.filter((item) => {
      const driver = item.driver;
      const user = item.user;
      const car = item.car;

      const userExperience = Number(driver.experienceYears);
      const userCapacity = car ? Number(car.weight) : 0;
      const onlyTypeCar = car.carType?.split(" ")[0] || "";

      const {
        search,
        experienceFrom,
        experienceBefore,
        capacityFrom,
        capacityBefore,
        typeCar,
      } = filters;

      const matchUser =
        `${user.name} ${user.surname}`
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        car.numberCar?.toLowerCase().includes(search.toLowerCase());

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
}
