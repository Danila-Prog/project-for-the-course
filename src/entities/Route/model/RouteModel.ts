"use client";

import { startOfToday } from "date-fns";
import { Route, RoutesDto } from "./types";

export class RouteModel {
  public static findRouteByDriverId(routes: Route[], driverId: number) {
    return routes.find(
      (route) => route.driverId === driverId && route.idStatusRoute === 1,
    );
  }
  public static filterRouteByDriverId(routes: Route[], driverId: number) {
    return routes.filter(
      (route) => route.driverId === driverId && route.idStatusRoute === 1,
    );
  }
  public static findRouteById(routes: Route[], routeId: number) {
    return routes.find((route) => route.id === routeId);
  }

  public static mapDtoToRoutes(routesDto: RoutesDto[]): Route[] {
    return routesDto.map((route) => ({
      id: route.route_id,
      driverId: route.driver_id,
      startPoint: route.start_point,
      endPoint: route.end_point,
      dateStart: route.date_start,
      dateEnd: route.date_end,
      confirmationPhoto: route.confirmation_photo,
      idStatusRoute: route.id_status_route,
      weight: route.weight,
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
      confirmationPhoto: routeDto.confirmation_photo,
      idStatusRoute: routeDto.id_status_route,
      weight: routeDto.weight,
    };
  }

  public static formErrorWithDate(dateStart: string, dateEnd: string) {
    if (!dateStart || !dateEnd) return "";

    const today = startOfToday().getTime();
    const start = new Date(dateStart).getTime();
    const end = new Date(dateEnd).getTime();

    if (Number.isNaN(start) || Number.isNaN(end)) {
      return "Некорректная дата";
    }

    if (start < today) {
      return "Дата загрузки не может быть раньше текущей даты";
    }

    if (end < today) {
      return "Дата выгрузки не может быть раньше текущей даты";
    }

    if (start > end) {
      return "Дата выгрузки не может быть раньше даты загрузки";
    }

    return "";
  }
}
