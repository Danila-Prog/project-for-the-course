import { useRef, useState } from "react";
import { YMapsApi, YMapsProps } from "react-yandex-maps";

export const useMap = (startPoint: string, endPoint: string) => {
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const map = useRef<YMapsApi | null>(null);

  const [mapState, setMapState] = useState({
    center: [53.196013, 50.099892],
    zoom: 12,
  });

  const updateMapState = () => {
    const currentCenter = map.current?.getCenter();
    const currentZoom = map.current?.getZoom();

    setMapState({
      center: currentCenter || mapState.center,
      zoom: currentZoom || mapState.zoom,
    });
  };

  const addRoute = (ymaps: YMapsProps) => {
    const pointA = startPoint;
    const pointB = endPoint;

    const multiRoute = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [pointA, pointB],
        params: {
          routingMode: "truck",
          avoidTrafficJams: true,
          results: 1,
        },
      },
      {
        boundsAutoApply: true,
        routeActiveStrokeWidth: 5,
        routeActiveStrokeStyle: "solid",
        routeActiveStrokeColor: "#212123",

        wayPointStartIconFillColor: "#212123",
        wayPointFinishIconFillColor: "#212123",
      },
    );

    multiRoute.model.events.add("requestsuccess", () => {
      const activeRoute = multiRoute.getActiveRoute();
      setDistance(activeRoute.properties.get("distance").text);
      setDuration(activeRoute.properties.get("durationInTraffic").text);
    });

    map.current?.geoObjects.add(multiRoute);

    updateMapState();
  };

  return { distance, duration, addRoute, mapState, map };
};
