import {
  ApiResponse,
  httpClient,
  RequestConfig,
} from "@/shared/api/httpClient";
import { HistoryRouteDTO, HistoryRoutesRepository } from "./type";

export class HistoryRoutesApi implements HistoryRoutesRepository {
  private readonly ENDPOINT = "history-routes";

  getHistoryRoutes() {
    return httpClient.get<HistoryRouteDTO[]>(this.ENDPOINT);
  }

  createRouteForHistory({
    payload,
  }: RequestConfig<{
    driverId: number;
    routeId: number;
    vehicleId: number;
    userId: number;
  }>): ApiResponse<HistoryRouteDTO> {
    return httpClient.post<HistoryRouteDTO>(this.ENDPOINT, payload);
  }
}
