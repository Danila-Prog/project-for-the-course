import { useState } from "react";
import RouteItemLayout from "./ui/RouteItemLayout";
import RouteItemButton from "./ui/RouteItemButton";
import RouteItemMain from "./ui/RouteItemMain";
import { IRouteItem } from "./model/types";

export default function RouteItem({
  routeBefore,
  routeFrom,
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
          routeFrom={routeFrom}
          routeBefore={routeBefore}
        />
      }
      routeMain={
        <RouteItemMain routeBefore={routeBefore} routeFrom={routeFrom} />
      }
    />
  );
}
