import { TRouteMain } from "../model/types";
import { Ref, useRef } from "react";
import { Map, YMapsApi, YMapsProps } from "react-yandex-maps";
export default function RouteItemMain({ routeFrom, routeBefore }: TRouteMain) {
  const map = useRef<YMapsApi | null>(null);

  const mapState = {
    center: [55.739625, 37.5412],
    zoom: 12,
  };

  const addRoute = (ymaps: YMapsProps) => {
    const pointA = routeFrom;
    const pointB = routeBefore;

    const multiRoute = new ymaps.multiRouter.MultiRoute(
      {
        referencePoints: [pointA, pointB],
        params: {
          routingMode: "auto",
          avoidTrafficJams: true,
        },
      },
      {
        boundsAutoApply: true,
      }
    );
    map.current?.geoObjects.add(multiRoute);
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
            Расчётное время поездки: <span></span>
          </h2>
          <h2>
            Расстояние: <span> км</span>
          </h2>
        </div>

        <button className="px-[20px] h-[45px] mr-[50px] rounded-[16px] flex justify-center items-center font-medium bg-button-grey text-white transition hover:bg-[#464646]">
          Взять заказ
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
