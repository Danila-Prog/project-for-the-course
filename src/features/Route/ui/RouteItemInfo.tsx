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
import { UiButton } from "@/shared";
import { LuClock5 } from "react-icons/lu";
import { FaRoute } from "react-icons/fa";

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
        <section className="flex flex-col min-[600px]:flex-row gap-5">
          <div className="flex flex-col gap-0.5 justify-between shadow-card w-full rounded-2xl px-4 py-2">
            <LuClock5
              size={30}
              className="text-secondary-green block xl:mb-2 w-[24px] xl:w-[30px]"
            />

            <span className="text-base xl:text-xl text-accent-black block font-semibold">
              {duration}
            </span>

            <span className="text-sm xl:text-base text-primary-gray">
              Расчётное время поездки
            </span>
          </div>

          <div className="flex flex-col gap-0.5 shadow-card w-full rounded-2xl px-4 py-2">
            <FaRoute
              size={30}
              className="text-secondary-green block  xl:mb-2 w-[24px] xl:w-[30px]"
            />

            <span className="text-base xl:text-xl text-accent-black block font-semibold">
              {distance}
            </span>

            <span className="text-sm xl:text-base text-primary-gray">
              Расстояние
            </span>
          </div>
        </section>

        <UiButton
          textButton={
            drivers?.statusDriverId !== 3 ? "Взять заказ" : "Выполнил заказ"
          }
          sizesText="text-sm xl:text-base"
          onClick={handleButtonClick}
          className={clsx(
            drivers?.statusDriverId !== 3
              ? "bg-accent-green"
              : "bg-secondary-green",
            "px-5 py-2 rounded-xl mt-4 font-medium text-white transition",
          )}
        />
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
