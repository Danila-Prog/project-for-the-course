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
    <div className="flex flex-col border-2 rounded-md ">
      <button
        onClick={handleVisible}
        className="text-start py-1.5 px-4 font-medium text-base flex flex-col gap-1"
      >
        <RouteItemCard
          startPoint={route.startPoint}
          endPoint={route.endPoint}
          dateStart={route.dateStart}
          dateEnd={route.dateEnd}
        />
      </button>

      {visible && (
        <main className="px-4 pb-6">
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
