import { Map, RouteButton, RoutePanel } from "@pbe/react-yandex-maps";
import { TRouteMain } from "../model/types";

export default function RouteItemMain({
  routeFrom,
  routeBefore,
  travelTime,
}: TRouteMain) {
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
            Расчётное время поездки: <span>{travelTime}</span>
          </h2>
          <h2>
            Расстояние: <span>{travelTime} км</span>
          </h2>
        </div>

        <button className="px-[20px] h-[45px] mr-[50px] rounded-[16px] flex justify-center items-center font-medium bg-button-grey text-white transition hover:bg-[#464646]">
          Взять заказ
        </button>
      </div>

      <Map
        width={"100%"}
        height={450}
        defaultState={{
          center: [55.75, 37.57],
          zoom: 9,
          controls: ["zoomControl", "trafficControl"],
        }}
        modules={["control.ZoomControl", "control.TrafficControl"]}
      >
        <RouteButton options={{ float: "right" }} />
        <RoutePanel options={{ float: "right" }} />
      </Map>
    </>
  );
}
