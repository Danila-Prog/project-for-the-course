import { ApiResponse, RequestConfig } from "@/shared/api/httpClient";

export interface CreateRouteForHistory {
  driverId: number;
  routeId: number;
  vehicleId: number;
  userId: number;
}

export interface HistoryRoutesRepository {
  getHistoryRoutes: () => ApiResponse<HistoryRouteDTO[]>;
  createRouteForHistory: (
    config: RequestConfig<{
      driverId: number;
      routeId: number;
      vehicleId: number;
      userId: number;
    }>,
  ) => ApiResponse<HistoryRouteDTO>;
}

export interface HistoryRouteDTO {
  id_history_routes: number;
  id_driver: number;
  id_route: number;
  id_vehicle: number;
  id_user: number;
}

export interface HistoryRoute {
  id: number;
  driverId: number;
  routeId: number;
  vehicleId: number;
  userId: number;
}
