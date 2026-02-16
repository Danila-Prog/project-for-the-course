"use client";

import { DriverApi } from "@/entities/Driver/model/DriverApi";
import { DriverService } from "@/entities/Driver/model/DriverService";
import { RouteApi } from "@/entities/Route/model/RouteApi";
import { RouteModel } from "@/entities/Route/model/RouteModel";
import { RouteService } from "@/entities/Route/model/RouteService";
import { UserApi, UserService } from "@/entities/User";
import { VehiclesApi } from "@/entities/Vehicles/model/VehiclesApi";
import { VehiclesService } from "@/entities/Vehicles/model/VehiclesService";
import { createStrictContext } from "@/shared/lib/createStrictContext";
import { PropsWithChildren } from "react";
import { useStrictContext } from "./useStrictContext";

type InjectorDeps = {
  routeService: RouteService;
  driverService: DriverService;
  routeModel: RouteModel;
  userService: UserService;
  vehiclesService: VehiclesService;
};
const userApi = new UserApi();
const userService = new UserService(userApi);

const vehiclesApi = new VehiclesApi();
const vehiclesService = new VehiclesService(vehiclesApi);

const driverApi = new DriverApi();
const driverService = new DriverService(
  driverApi,
  userService,
  vehiclesService,
);

const routeApi = new RouteApi();
const routeService = new RouteService(routeApi, driverService);

const routeModel = new RouteModel();

const DEPS = {
  routeService,
  driverService,
  routeModel,
  userService,
  vehiclesService,
};

const Injector = createStrictContext<InjectorDeps>();

export const InjectorProvider = ({ children }: PropsWithChildren) => {
  return <Injector.Provider value={DEPS}>{children}</Injector.Provider>;
};

export const useDI = () => useStrictContext(Injector);
