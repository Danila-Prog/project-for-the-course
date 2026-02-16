import { DriverService } from "@/entities/Driver/model/DriverService";
import { RouteModel } from "./RouteModel";
import { Route, RouteRepository } from "./types";
import { Updates } from "@/entities/Driver/model/types";

export class RouteService {
  constructor(
    private readonly repository: RouteRepository,
    private readonly driverService: DriverService,
  ) {}

  async getRoutes(): Promise<Route[]> {
    const { data } = await this.repository.getRoutes();

    return RouteModel.mapDtoToRoutes(data);
  }

  async getRouteByDriverId(id: number): Promise<Route> {
    const { data } = await this.repository.getRouteByDriverId(id);
    return RouteModel.mapDtoToRoute(data[0]);
  }

  async updateRoute(payload: {
    driver_id: number;
    start_point: string;
    end_point: string;
    date_start: string;
    date_end: string;
  }): Promise<void> {
    await this.repository.updateRoute({ payload });
  }

  async createRoute(payload: {
    driver_id: number;
    start_point: string;
    end_point: string;
    date_start: string;
    date_end: string;
  }): Promise<void> {
    try {
      await this.repository.createRoute({ payload });
    } catch (error) {
      console.error("Error creating route:", error);
      throw error;
    }
  }

  async deleteRouteForDriver(
    driverId: number,
    routeId: number,
    updates: Updates,
  ): Promise<void> {
    try {
      await this.driverService.updateDriver(driverId, updates);
      await this.repository.deleteRoute(routeId);
    } catch {
      throw new Error("");
    }
  }
}
