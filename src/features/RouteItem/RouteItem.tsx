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

  return (
    <RouteItemLayout
      visible={visible}
      routeButton={
        <RouteItemButton
          visible={visible}
          setVisible={setVisible}
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
