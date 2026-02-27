import { ApiResponse, RequestConfig } from "@/shared/api/httpClient";

export interface RoutesDto {
  route_id: number;
  driver_id: number;
  start_point: string;
  end_point: string;
  date_start: string;
  date_end: string;
  confirmation_photo: string;
  id_status_route: 1 | 2;
}

export interface Route {
  id: number;
  driverId: number;
  startPoint: string;
  endPoint: string;
  dateStart: string;
  dateEnd: string;
  confirmationPhoto: string;
  idStatusRoute: 1 | 2;
}

export type UpdatesRoute = Partial<{
  driver_id: number | null;
  start_point: string | null;
  end_point: string | null;
  date_start: string | null;
  date_end: string | null;
  id_status_route: 1 | 2 | null;
}>;

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

  updateRoute: ({
    payload,
  }: RequestConfig<{
    routeId: number;
    updates: UpdatesRoute;
  }>) => ApiResponse<RoutesDto[]>;

  deleteRoute: (id: number) => ApiResponse<RoutesDto>;
  uploadConfirmationPhoto: (
    routeId: number,
    { payload }: RequestConfig<FormData>,
  ) => ApiResponse<RoutesDto>;
};
