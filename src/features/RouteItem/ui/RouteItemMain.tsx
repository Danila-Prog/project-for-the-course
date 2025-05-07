import clsx from "clsx";
import { TRouteMain } from "../model/types";
import { Ref, useRef, useState } from "react";
import { Map, YMapsApi, YMapsProps } from "react-yandex-maps";
import { useUpdate } from "@/shared/api/useUpdate";

export default function RouteItemMain({
  routeId,
  routeFrom,
  setActiveRouteId,
  routeBefore,
  isDisabled,
}: TRouteMain) {
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [status, setStatus] = useState(
    localStorage.getItem(`driverStatusOrder${routeId}`) || "Взять заказ"
  );

  const { updateDriverStatus } = useUpdate();

  const deleteRoutes = async () => {
    const response = await fetch(
      `http://localhost:8080/api/routes/${routeId}`,
      {
        method: "DELETE",
      }
    );
    return response;
  };

  const handleButtonClick = () => {
    if (status === "Взять заказ") {
      updateDriverStatus(3);
      setStatus("Выполнил заказ");
      localStorage.setItem(`driverStatusOrder${routeId}`, "Выполнил заказ");
      setActiveRouteId?.(routeId ?? 0);
      localStorage.setItem("activeRouteId", String(routeId));
    } else {
      updateDriverStatus(1);
      deleteRoutes();
      setActiveRouteId?.(null);
      localStorage.removeItem(`driverStatusOrder${routeId}`);
      localStorage.removeItem("activeRouteId");
    }
  };
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
    const pointA = routeFrom;
    const pointB = routeBefore;

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
      }
    );

    multiRoute.model.events.add("requestsuccess", () => {
      const activeRoute = multiRoute.getActiveRoute();
      setDistance(activeRoute.properties.get("distance").text);
      setDuration(activeRoute.properties.get("durationInTraffic").text);
    });

    map.current?.geoObjects.add(multiRoute);

    updateMapState();
  };
  return (
    <>
      <div className="flex justify-between items-center mb-[30px]">
        <div className="text-[18px] font-semibold [&>h2>span]:font-normal">
          <h2>
            Точка от: <span>{routeFrom}</span>
          </h2>
          <h2>
            Точка до: <span>{routeBefore}</span>
          </h2>
          <h2>
            Расчётное время поездки: <span>{duration}</span>
          </h2>
          <h2>
            Расстояние: <span>{distance}</span>
          </h2>
        </div>
        <button
          className={clsx(
            status === "Взять заказ"
              ? "bg-button-grey hover:bg-[#464646] disabled:opacity-70"
              : "bg-green-700 hover:bg-green-800",
            "px-[20px] h-[45px] mr-[50px] rounded-[16px]",
            "flex justify-center items-center font-medium text-white transition"
          )}
          disabled={isDisabled}
          onClick={handleButtonClick}
        >
          {status}
        </button>
      </div>

      <Map
        modules={["multiRouter.MultiRoute"]}
        width={"100%"}
        height={"445px"}
        state={mapState}
        instanceRef={(instance: Ref<YMapsProps | null>) =>
          (map.current = instance)
        }
        onLoad={addRoute}
      />
    </>
  );
}
