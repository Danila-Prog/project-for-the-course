import { Route, RoutesDto } from "./types";

export class RouteModel {
  public findRouteByDriverId(routes: Route[], driverId: number) {
    return routes.find((route) => route.driverId === driverId);
  }

  public static mapDtoToRoutes(routesDto: RoutesDto[]): Route[] {
    return routesDto.map((route) => ({
      id: route.route_id,
      driverId: route.driver_id,
      startPoint: route.start_point,
      endPoint: route.end_point,
      dateStart: route.date_start,
      dateEnd: route.date_end,
    }));
  }

  public static mapDtoToRoute(routeDto: RoutesDto): Route {
    return {
      id: routeDto.route_id,
      driverId: routeDto.driver_id,
      startPoint: routeDto.start_point,
      endPoint: routeDto.end_point,
      dateStart: routeDto.date_start,
      dateEnd: routeDto.date_end,
    };
  }
}
