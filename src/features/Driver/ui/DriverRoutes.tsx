"use client";

import { useDI } from "@/shared/lib/di";
import { useAsync } from "@/shared/api/useAsync";
import { YMaps } from "react-yandex-maps";
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

  if (!route) return;

  return (
    <section className=" bg-white px-[30px] pt-[20px] pb-[30px] rounded-xl mb-2.5">
      <h1 className="text-xl min826:text-2xl font-bold mb-4">
        Доступно {route ? 1 : 0} маршрут:
      </h1>

      <YMaps query={{ apikey: "cbc6f517-56a2-455d-b68b-aed0465d40d0" }}>
        <RouteItem key={route.id} route={route} driverId={driverId} />
      </YMaps>
    </section>
  );
};
