import {
  ApiResponse,
  httpClient,
  RequestConfig,
} from "@/shared/api/httpClient";
import { RoutesDto, RouteRepository, UpdatesRoute } from "./types";

export class RouteApi implements RouteRepository {
  private readonly ENDPOINT = "routes";

  getRoutes(config?: RequestConfig) {
    return httpClient.get<RoutesDto[]>(this.ENDPOINT, config?.options);
  }

  getRouteByDriverId(id: number) {
    return httpClient.get<RoutesDto[]>(`${this.ENDPOINT}/${id}`);
  }

  createRoute({
    payload,
  }: RequestConfig<{
    driver_id: number;
    start_point: string;
    end_point: string;
    date_start: string;
    date_end: string;
  }>): ApiResponse<RoutesDto> {
    return httpClient.post<RoutesDto>(this.ENDPOINT, payload);
  }

  updateRoute({
    payload,
  }: RequestConfig<{
    routeId: number;
    updates: UpdatesRoute;
  }>) {
    return httpClient.patch<RoutesDto[]>(this.ENDPOINT, payload);
  }

  deleteRoute(id: number) {
    return httpClient.delete<RoutesDto>(`${this.ENDPOINT}/${id}`);
  }

  uploadConfirmationPhoto(
    routeId: number,
    { payload }: RequestConfig<FormData>,
  ) {
    return httpClient.patch<RoutesDto>(`${this.ENDPOINT}/${routeId}`, payload);
  }
}
