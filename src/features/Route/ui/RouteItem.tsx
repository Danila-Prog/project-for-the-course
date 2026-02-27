"use client";

import { useState } from "react";
import RouteItemMain from "./RouteItemInfo";
import { RouteItemCard, Route } from "@/entities";

export const RouteItem = ({
  route,
  driverId,
}: {
  route: Route;
  driverId: number;
}) => {
  const [visible, setVisible] = useState(false);

  const handleVisible = () => setVisible((visible) => !visible);

  return (
    <div className="grid border-2 rounded-[7px]">
      <button
        onClick={handleVisible}
        className={
          "text-start py-[5px] px-[15px] font-medium text-[20px] flex flex-col gap-2"
        }
      >
        <RouteItemCard
          startPoint={route.startPoint}
          endPoint={route.endPoint}
          dateStart={route.dateStart}
          dateEnd={route.dateEnd}
        />
      </button>

      {visible && (
        <main className="px-[15px] pb-[25px]">
          <RouteItemMain
            driverId={driverId}
            startPoint={route.startPoint}
            endPoint={route.endPoint}
          />
        </main>
      )}
    </div>
  );
};
