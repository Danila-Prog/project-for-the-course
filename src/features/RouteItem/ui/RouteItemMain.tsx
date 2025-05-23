import clsx from "clsx";
import { TRouteMain } from "../model/types";
import { Ref, useCallback, useRef, useState } from "react";
import { Map, YMapsApi, YMapsProps } from "react-yandex-maps";
import { useUpdate } from "@/shared/api/useUpdate";

export default function RouteItemMain({
  routeId,
  routeFrom,
  routeBefore,
  localStatus,
  setLocalStatus,
}: TRouteMain) {
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");

  const { updateDriverStatus } = useUpdate();

  const deleteRoutes = useCallback(async () => {
    const response = await fetch(
      `http://localhost:8080/api/routes/${routeId}`,
      {
        method: "DELETE",
      }
    );
    return response;
  }, [routeId]);

  const handleButtonClick = () => {
    if (localStatus !== 3) {
      const newStatus = localStatus !== 3 ? 3 : 1;
      setLocalStatus(newStatus);

      updateDriverStatus(3);
    } else {
      updateDriverStatus(1);
      deleteRoutes();
      window.location.reload();
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
      <main className="flex justify-between items-center mt-[10px] mb-[30px]">
        <section className="flex flex-col gap-[5px] w-[6%] text-[18px] font-semibold [&>h2>span]:font-normal">
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
        </section>
        <button
          className={clsx(
            localStatus !== 3
              ? "bg-button-grey hover:bg-[#464646]"
              : "bg-green-700 hover:bg-green-800",
            "px-[20px] h-[45px] mr-[50px] rounded-[16px]",
            "flex justify-center items-center font-medium text-white transition"
          )}
          onClick={handleButtonClick}
        >
          {localStatus !== 3 ? "Взять заказ" : "Выполнил заказ"}
        </button>
      </main>

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
