"use client";

import clsx from "clsx";
import { Ref, useState } from "react";
import { Map, YMapsProps } from "react-yandex-maps";
import { useMutation } from "@/shared/api/useMutation";
import { useDI } from "@/shared/lib";
import { ConfirmRouteModel } from "./ConfirmRouteModel";
import { useMap } from "../model";
import { Route } from "@/entities/Route/model/types";
import { useAsync } from "@/shared/api/useAsync";

export default function RouteItemInfo({
  endPoint,
  driverId,
  startPoint,
}: Pick<Route, "endPoint" | "startPoint" | "driverId">) {
  const { driverService } = useDI();

  const [isOpenConfirmRoute, setIsOpenConfirmRoute] = useState(false);
  const [isUpdateDriver, setIsUpdateDriver] = useState(false);

  const { data: drivers } = useAsync(
    () => driverService.getDriverById(driverId),
    [isUpdateDriver],
  );

  const { distance, duration, addRoute, mapState, map } = useMap(
    startPoint,
    endPoint,
  );

  const { mutate: updateDriverStatus } = useMutation(
    async (newStatusDriverId: number) => {
      await driverService.updateDriver(driverId, {
        status_driver_id: newStatusDriverId,
      });
    },
  );

  const toggleConfirmRoute = () => setIsOpenConfirmRoute((curr) => !curr);

  const handleButtonClick = async () => {
    if (drivers?.statusDriverId !== 3) {
      await updateDriverStatus(3);
      setIsUpdateDriver(true);
    } else {
      toggleConfirmRoute();
    }
  };

  return (
    <>
      <main className="mt-2.5 mb-7">
        <section className="flex flex-col gap-1.5 text-sm font-semibold [&>span>span]:font-normal">
          <span>
            Расчётное время поездки: <span>{duration}</span>
          </span>
          <span>
            Расстояние: <span>{distance}</span>
          </span>
        </section>

        <button
          className={clsx(
            drivers?.statusDriverId !== 3
              ? "bg-button-grey hover:bg-[#464646]"
              : "bg-green-700 hover:bg-green-800",
            "px-5 py-2 rounded-xl mt-4 font-medium text-white transition",
          )}
          onClick={handleButtonClick}
        >
          {drivers?.statusDriverId !== 3 ? "Взять заказ" : "Выполнил заказ"}
        </button>
      </main>

      <div className="w-full h-[300px] md:h-[445px]">
        <Map
          width="100%"
          height="100%"
          modules={["multiRouter.MultiRoute"]}
          state={mapState}
          instanceRef={(instance: Ref<YMapsProps>) => (map.current = instance)}
          onLoad={addRoute}
        />
      </div>
      
      <ConfirmRouteModel
        isOpen={isOpenConfirmRoute}
        onClose={toggleConfirmRoute}
      />
    </>
  );
}
