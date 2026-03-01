import { useDI } from "@/shared/lib";
import { CurrentTabLogistician, Filters } from "../lib";
import { useAsync } from "@/shared/api/useAsync";
import { useMemo } from "react";

export const useLogisticianListViewModel = (
  filters: Filters,
  currentTab: CurrentTabLogistician,
) => {
  const {
    driverService,
    routeService,
    historyRouteService,
    userService,
    vehiclesService,
  } = useDI();

  const { data: drivers } = useAsync(() => driverService.getDrivers());
  const { data: users } = useAsync(() => userService.getUsers());
  const { data: vehicles } = useAsync(() => vehiclesService.getVehicles());
  const { data: routes } = useAsync(() => routeService.getRoutes());

  const { data: historyRoutes } = useAsync(() =>
    historyRouteService.getDataForCardHistoryRoute(),
  );

  const filteredDrivers = useMemo(() => {
    if (!drivers || !users || !vehicles) return [];

    return driverService.getFilteredDrivers(drivers, users, vehicles, filters);
  }, [drivers, users, vehicles, filters]);

  const filteredHistoryRoutes = useMemo(() => {
    if (!historyRoutes) return [];

    return historyRouteService.getFilteredHistoryRoutes(historyRoutes, filters);
  }, [historyRoutes, filters]).reverse();

  const accessDriversAggregates = useMemo(() => {
    const accessDrivers = driverService.getStatusDrivers(filteredDrivers, 1);

    return accessDrivers
      .map((driver) => {
        const user = users?.find((u) => u.userId === driver.userId);

        if (!user || !driver) return;

        return {
          driver,
          user,
        };
      })
      .filter((item) => item !== undefined);
  }, [filteredDrivers, currentTab]);

  const activeDriversAggregates = useMemo(() => {
    const activeDrivers = driverService.getStatusDrivers(filteredDrivers, 2);
    const assignedDrivers = driverService.getStatusDrivers(filteredDrivers, 3);

    const activeAndAssignedDrivers = [...activeDrivers, ...assignedDrivers];

    return activeAndAssignedDrivers
      .map((driver) => {
        const user = users?.find((u) => u.userId === driver.userId);
        const vehicle = vehicles?.find(
          (v) => v.vehiclesId === driver.vehiclesId,
        );
        const route = routes?.find((r) => r.driverId === driver.driverId);

        if (!user || !driver || !vehicle || !route) return;

        return {
          driver,
          user,
          vehicle,
          route,
        };
      })
      .filter((item) => item !== undefined);
  }, [filteredDrivers, currentTab, drivers, vehicles, routes, users]);

  return {
    accessDriversAggregates,
    activeDriversAggregates,
    filteredHistoryRoutes,
  };
};
