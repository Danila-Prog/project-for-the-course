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
    [isUpdateRoute],
  );
  
  if (!route) return null;

  return (
    <section className="w-[80%] mx-auto bg-white px-[30px] pt-[20px] pb-[30px] rounded-[16px]">
      <h1 className="text-[30px] font-bold mb-4">
        Доступно {route ? 1 : 0} маршрут:
      </h1>

      <YMaps query={{ apikey: "cbc6f517-56a2-455d-b68b-aed0465d40d0" }}>
        <RouteItem key={route.id} route={route} driverId={driverId} />
      </YMaps>
    </section>
  );
};
