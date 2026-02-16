import { useState } from "react";
import RouteItemLayout from "./ui/RouteItemLayout";
import RouteItemButton from "./ui/RouteItemButton";
import RouteItemMain from "./ui/RouteItemMain";
import type { Route } from "../../model/types";
import { useDI } from "@/shared/lib/di";
import { useAsync } from "@/shared/api/useAsync";

export default function RouteItem({
  route,
  driverId,
}: {
  route: Route;
  driverId: string;
}) {
  const [visible, setVisible] = useState(false);
  const { driverService } = useDI();

  const { data } = useAsync(() =>
    driverService.getDriverById(Number(driverId)),
  );

  if (!data) return;

  const handleVisible = () => setVisible((visible) => !visible);
  return (
    <RouteItemLayout
      visible={visible}
      routeButton={
        <RouteItemButton
          visible={visible}
          handleVisible={handleVisible}
          startPoint={route.startPoint}
          endPoint={route.endPoint}
          dateStart={route.dateStart}
          dateEnd={route.dateEnd}
        />
      }
      routeMain={
        <RouteItemMain
          driverId={Number(driverId)}
          startPoint={route.startPoint}
          endPoint={route.endPoint}
          localStatus={data?.statusDriverId}
        />
      }
    />
  );
}
