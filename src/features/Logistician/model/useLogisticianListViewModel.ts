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
    carService,
  } = useDI();

  const { data: drivers } = useAsync(() => driverService.getDrivers());
  const { data: users } = useAsync(() => userService.getUsers());
  const { data: cars } = useAsync(() => carService.getCars());
  const { data: routes } = useAsync(() => routeService.getRoutes());

  const { data: historyRoutes } = useAsync(() =>
    historyRouteService.getDataForCardHistoryRoute(),
  );

  const filteredDrivers = useMemo(() => {
    if (!drivers || !users || !cars) return [];

    return driverService.getFilteredDrivers(drivers, users, cars, filters);
  }, [drivers, users, cars, filters]);

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
        const car = cars?.find((v) => v.carId === driver.carId);
        const route = routes?.find(
          (r) => r.driverId === driver.driverId && r.idStatusRoute !== 2,
        );

        if (!user || !driver || !car || !route) return;

        return {
          driver,
          user,
          car,
          route,
        };
      })
      .filter((item) => item !== undefined);
  }, [filteredDrivers, currentTab, drivers, cars, routes, users]);

  return {
    accessDriversAggregates,
    activeDriversAggregates,
    filteredHistoryRoutes,
  };
};
