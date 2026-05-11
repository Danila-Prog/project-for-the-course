"use client";

import { useDI } from "@/shared/lib/di";
import { useAsync } from "@/shared/api/useAsync";
import { useRouteDI } from "../provider";

interface Props {
  driverId: number;
}

export const DriverRoutes = ({ driverId }: Props) => {
  const { routeService } = useDI();

  const { RouteItem, isUpdateRoute } = useRouteDI();

  const { data: route } = useAsync(
    () => routeService.getRouteByDriverId(driverId),
    [isUpdateRoute, driverId],
  );

  return (
    <section className="xl:w-[57%] h-fit bg-white py-5 px-6 xl:px-8 rounded-2xl">
      <h1 className="text-xl xl:text-2xl font-bold mb-4">
        {route ? "Доступен 1 маршрут:" : "Доступно 0 маршрутов("}
      </h1>

      {route && <RouteItem key={route.id} route={route} driverId={driverId} />}
    </section>
  );
};
