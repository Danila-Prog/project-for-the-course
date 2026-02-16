import { ApiResponse, RequestConfig } from "@/shared/api/httpClient";

export interface RoutesDto {
  route_id: number;
  driver_id: number;
  start_point: string;
  end_point: string;
  date_start: string;
  date_end: string;
}

export interface Route {
  id: number;
  driverId: number;
  startPoint: string;
  endPoint: string;
  dateStart: string;
  dateEnd: string;
}

export type RouteRepository = {
  getRoutes: (config?: RequestConfig) => ApiResponse<RoutesDto[]>;
  getRouteByDriverId: (id: number) => ApiResponse<RoutesDto[]>;
  createRoute: (
    config: RequestConfig<{
      driver_id: number;
      start_point: string;
      end_point: string;
      date_start: string;
      date_end: string;
    }>,
  ) => ApiResponse<RoutesDto>;

  updateRoute: (
    config: RequestConfig<{
      driver_id: number;
      start_point: string;
      end_point: string;
      date_start: string;
      date_end: string;
    }>,
  ) => ApiResponse<RoutesDto>;

  deleteRoute: (id: number) => ApiResponse<RoutesDto>;
};
