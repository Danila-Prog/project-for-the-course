"use client";

import { useEffect } from "react";
import { withYMaps, YMapsApi } from "react-yandex-maps";

interface Props {
  startPoint: string;
  endPoint: string;
  onChange: (minutes: number) => void;
  ymaps?: YMapsApi;
}

function RouteDurationLoaderBase({
  startPoint,
  endPoint,
  onChange,
  ymaps,
}: Props) {
  useEffect(() => {
    const loadRouteDuration = async () => {
      if (!ymaps || !startPoint || !endPoint) {
        onChange(0);
        return;
      }

      try {
        const route = await ymaps.route([startPoint, endPoint], {
          routingMode: "truck",
          avoidTrafficJams: true,
        });
        const duration = route.properties._data.RouterRouteMetaData.time;
        onChange(Math.ceil(duration / 60));
      } catch (error) {
        console.error("Ошибка расчёта маршрута:", error);
        onChange(0);
      }
    };

    loadRouteDuration();
  }, [ymaps, startPoint, endPoint, onChange]);

  return null;
}

export const RouteDurationLoader = withYMaps(RouteDurationLoaderBase, true, [
  "route",
]);
