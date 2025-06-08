import { Dispatch, SetStateAction, useEffect, useState } from "react";
import RouteItemLayout from "./ui/RouteItemLayout";
import RouteItemButton from "./ui/RouteItemButton";
import RouteItemMain from "./ui/RouteItemMain";
import { IRouteItem } from "./model/types";
import { useFetch } from "@/shared/api/useFetch";

export default function RouteItem({
  routeId,
  routeBefore,
  routeFrom,
}: Omit<IRouteItem, "visible" | "setVisible">) {
  const [visible, setVisible] = useState(false);
  const [userId, setUserId] = useState<string | null>("");
  const { drivers } = useFetch(userId);
  const [localStatus, setLocalStatus] = useState(drivers?.status_driver_id);

  useEffect(() => {
    setUserId(localStorage.getItem("userId"));
  }, []);

  useEffect(() => {
    setLocalStatus(drivers?.status_driver_id);
  }, [drivers?.status_driver_id]);

  const handleVisible = () => setVisible((visible) => !visible);

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
        <RouteItemMain
          routeId={routeId}
          routeBefore={routeBefore}
          routeFrom={routeFrom}
          localStatus={localStatus}
          setLocalStatus={setLocalStatus as Dispatch<SetStateAction<number>>}
        />
      }
    />
  );
}
