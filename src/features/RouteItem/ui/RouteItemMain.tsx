import { Map, RouteButton, RoutePanel } from "@pbe/react-yandex-maps";
import { TRouteMain } from "../model/types";

export default function RouteItemMain({
  routeFrom,
  routeBefore,
  travelTime,
}: TRouteMain) {
  return (
    <>
      <div className="mb-[20px] text-[18px]">
        <h2>Точка от: {routeFrom}</h2>
        <h2>Точка до: {routeBefore}</h2>
        <h2>Расчётное время поездки: {travelTime}</h2>
        <h2>Расстояние: {travelTime} км</h2>
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
