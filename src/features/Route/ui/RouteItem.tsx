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
    <div className="flex flex-col border-2 rounded-xl">
      <button
        onClick={handleVisible}
        className="text-start py-2 px-4 font-medium flex flex-col my-auto gap-1"
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
