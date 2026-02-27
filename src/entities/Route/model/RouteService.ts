import { DriverService } from "@/entities/Driver/model/DriverService";
import { RouteModel } from "./RouteModel";
import { Route, RouteRepository, UpdatesRoute } from "./types";
import { UpdatesDriver } from "@/entities/Driver/model/types";
import { HistoryRoutesService } from "@/entities/HistoryRoute";
import { UserService } from "@/entities/User";

export class RouteService {
  private _historyRouteService: HistoryRoutesService | null = null;

  constructor(
    private readonly repository: RouteRepository,
    private readonly driverService: DriverService,
    private readonly userService: UserService,
  ) {}

  public setHistoryRouteService(service: HistoryRoutesService) {
    this._historyRouteService = service;
  }

  async getRoutes(): Promise<Route[]> {
    const { data } = await this.repository.getRoutes();

    return RouteModel.mapDtoToRoutes(data);
  }

  async getRouteByDriverId(id: number): Promise<Route> {
    const { data } = await this.repository.getRouteByDriverId(id);
    return RouteModel.mapDtoToRoute(data[0]);
  }

  async updateRoute(routeId: number, updates: UpdatesRoute): Promise<void> {
    await this.repository.updateRoute({
      payload: { routeId: routeId, updates: updates },
    });
  }

  async createRouteAction(
    payload: {
      driver_id: number;
      start_point: string;
      end_point: string;
      date_start: string;
      date_end: string;
    },
    updateDriver: { driverId: number; selectVehicle: number },

    sendEmail: { fullName: string; email: string },
  ): Promise<void> {
    try {
      await Promise.all([
        this.repository.createRoute({ payload }),
        this.driverService.updateDriver(updateDriver.driverId, {
          status_driver_id: 2,
          vehicles_id: updateDriver.selectVehicle,
        }),

        fetch("http://localhost:8080/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            to: sendEmail.email,
            subject: `Новый маршрут для ${sendEmail.fullName}`,
            html: "<h1>Здравствуйте, у вас появился новый маршрут! 🚛</h1>",
          }),
        }),
      ]);
    } catch (error) {
      console.error("Error creating route:", error);
      throw error;
    }
  }

  async createAndAssignNewRoute(input: {
    driverId: number;
    userId: number;
    vehicleId: number;
    start: string;
    end: string;
    dateStart: string;
    dateEnd: string;
  }) {
    const user = await this.userService.getUserById(input.userId);

    return this.createRouteAction(
      {
        driver_id: input.driverId,
        start_point: input.start,
        end_point: input.end,
        date_start: input.dateStart,
        date_end: input.dateEnd,
      },
      {
        driverId: input.driverId,
        selectVehicle: input.vehicleId,
      },
      {
        email: user.email,
        fullName: `${user.name} ${user.surname}`,
      },
    );
  }

  async deleteRouteForDriver(
    driverId: number,
    routeId: number,
    updates: UpdatesDriver,
  ): Promise<void> {
    try {
      await this.driverService.updateDriver(driverId, updates);
      await this.repository.deleteRoute(routeId);
    } catch {
      throw new Error("");
    }
  }

  public async uploadRoutePhoto(routeId: number, formData: FormData) {
    await this.repository.uploadConfirmationPhoto(routeId, {
      payload: formData,
    });
  }

  async confirmRoute(formData: FormData, userId: number) {
    const driver = await this.driverService.getDriverByUserId(userId);
    if (isNaN(driver.driverId)) {
      throw new Error("Invalid Driver ID. Cannot confirm route.");
    }

    const route = await this.getRouteByDriverId(driver.driverId);

    if (!route) {
      throw new Error(`Route for driver ID ${driver.driverId} not found.`);
    }
    const vehicleId = driver.vehiclesId;
    const routeId = route.id;

    await Promise.all([
      this.uploadRoutePhoto(routeId, formData),
      this.updateRoute(routeId, { id_status_route: 2 }),

      this._historyRouteService?.createRouteForHistory({
        driverId: driver.driverId,
        routeId,
        vehicleId,
        userId,
      }),

      this.driverService.updateDriver(driver.driverId, {
        vehicles_id: null,
        status_driver_id: 1,
      }),
    ]);
  }

  findRouteByDriverId(routes: Route[], driverId: number) {
    return RouteModel.findRouteByDriverId(routes, driverId);
  }

  filterRouteByDriverId(routes: Route[], driverId: number) {
    return RouteModel.filterRouteByDriverId(routes, driverId);
  }
  findRouteById(routes: Route[], routeId: number) {
    return RouteModel.findRouteById(routes, routeId);
  }

  formErrorWithDate(dateStart: string, dateEnd: string) {
    return RouteModel.formErrorWithDate(dateStart, dateEnd);
  }
}
