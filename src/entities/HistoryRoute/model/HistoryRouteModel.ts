import { HistoryRoute, HistoryRouteDTO } from "../api/type";

export class HistoryRouteModel {
  public static mapDTOToHistoryRoute(
    historyRouteDto: HistoryRouteDTO,
  ): HistoryRoute {
    return {
      id: historyRouteDto.id_history_routes,
      driverId: historyRouteDto.id_driver,
      routeId: historyRouteDto.id_route,
      vehicleId: historyRouteDto.id_vehicle,
      userId: historyRouteDto.id_user,
    };
  }

  public static mapDTOToHistoryRoutes(
    historyRouteDto: HistoryRouteDTO[],
  ): HistoryRoute[] {
    return historyRouteDto.map(HistoryRouteModel.mapDTOToHistoryRoute);
  }

  public static findHistoryRouteById(
    historyRoutes: HistoryRoute[],
    id: number,
  ): HistoryRoute | undefined {
    return historyRoutes.find((route) => route.driverId === id);
  }
}
