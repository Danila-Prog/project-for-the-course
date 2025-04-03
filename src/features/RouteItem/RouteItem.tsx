import { useState } from "react";
import RouteItemLayout from "./ui/RouteItemLayout";
import RouteItemButton from "./ui/RouteItemButton";
import RouteItemMain from "./ui/RouteItemMain";
import { IRouteItem } from "./model/types";

export default function RouteItem({
  routeName,
  routeBefore,
  routeFrom,
  travelTime,
}: Omit<IRouteItem, "visible" | "setVisible">) {
  const [visible, setVisible] = useState(false);
  const handleVisible = () => setVisible((visib) => !visib);

  return (
    <RouteItemLayout
      visible={visible}
      routeButton={
        <RouteItemButton
          visible={visible}
          handleVisible={handleVisible}
          routeName={routeName}
        />
      }
      routeMain={
        <RouteItemMain
          routeBefore={routeBefore}
          routeFrom={routeFrom}
          travelTime={travelTime}
        />
      }
    />
  );
}
