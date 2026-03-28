"use client";

import { DriverApi } from "@/entities/Driver/model/DriverApi";
import { DriverService } from "@/entities/Driver/model/DriverService";
import { RouteApi } from "@/entities/Route/model/RouteApi";
import { RouteService } from "@/entities/Route/model/RouteService";
import { UserApi, UserService } from "@/entities/User";
import { CarApi, CarService } from "@/entities";
import { createStrictContext } from "@/shared/lib/createStrictContext";
import { PropsWithChildren } from "react";
import { useStrictContext } from "./useStrictContext";
import {
  HistoryRoutesApi,
  HistoryRoutesService,
} from "@/entities/HistoryRoute";

type InjectorDeps = {
  routeService: RouteService;
  driverService: DriverService;
  userService: UserService;
  carService: CarService;
  historyRouteService: HistoryRoutesService;
};

const userApi = new UserApi();
const userService = new UserService(userApi);

const carApi = new CarApi();
const carService = new CarService(carApi);

const driverApi = new DriverApi();
const driverService = new DriverService(
  driverApi,
  userService,
  carService,
);

const routeApi = new RouteApi();

const routeService = new RouteService(routeApi, driverService, userService);

const historyRouteApi = new HistoryRoutesApi();

const historyRouteService = new HistoryRoutesService(
  historyRouteApi,
  userService,
  carService,
  driverService,
);

routeService.setHistoryRouteService(historyRouteService);
historyRouteService.setRouteService(routeService);

const DEPS = {
  routeService,
  driverService,
  userService,
  carService,
  historyRouteService,
};

const Injector = createStrictContext<InjectorDeps>();

export const InjectorProvider = ({ children }: PropsWithChildren) => {
  return <Injector.Provider value={DEPS}>{children}</Injector.Provider>;
};

export const useDI = () => useStrictContext(Injector);
