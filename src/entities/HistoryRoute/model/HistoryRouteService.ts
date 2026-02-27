import { UserService } from "@/entities/User";
import { HistoryRoutesRepository, CreateRouteForHistory } from "../api/type";
import { HistoryRouteModel } from "./HistoryRouteModel";
import { Driver } from "@/entities/Driver/model/types";
import { VehiclesService } from "@/entities/Vehicles/model/VehiclesService";
import { RouteService } from "@/entities/Route/model/RouteService";

export class HistoryRoutesService {
  private _routeService: RouteService | null = null;

  constructor(
    private readonly historyRouteRepository: HistoryRoutesRepository,
    private readonly userService: UserService,
    private readonly vehicleService: VehiclesService,
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

  async getDataForCardHistoryRoute(driver: Driver) {
    try {
      const [allHistoryRoutes, users, vehicles, routes] = await Promise.all([
        this.getHistoryRoutes(),
        this.userService.getUsers(),
        this.vehicleService.getVehicles(),
        this._routeService?.getRoutes(),
      ]);

      const historyRoute = HistoryRouteModel.findHistoryRouteById(
        allHistoryRoutes,
        driver.driverId,
      );

      if (!historyRoute || !routes || !users || !vehicles) {
        return null;
      }

      const user = this.userService.findUserById(users, driver.userId);

      if (!user) {
        console.warn(
          `User with ID ${historyRoute.driverId} not found for history route ${historyRoute.id}.`,
        );
        return null;
      }

      const vehicle = this.vehicleService.findVehiclesById(
        vehicles,
        historyRoute.vehicleId,
      );

      if (!vehicle) {
        console.warn(
          `Vehicle with ID ${historyRoute.vehicleId} not found for history route ${historyRoute.id}.`,
        );
        return null;
      }

      const route = this._routeService?.findRouteById(
        routes,
        historyRoute.routeId,
      );

      if (!route) {
        console.warn(
          `Associated route with ID ${historyRoute.routeId} not found for history route ${historyRoute.id}.`,
        );
        return null;
      }

      return {
        user,
        vehicle,
        route,
      };
    } catch (error) {
      console.error("Error in getDataForCardHistoryRoute:", error);
      throw new Error("Failed to retrieve data for history routes.");
    }
  }
}
