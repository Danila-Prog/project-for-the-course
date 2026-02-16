import clsx from "clsx";
import { TRouteMain } from "../lib/types";
import { Ref, useState } from "react";
import { Map, YMapsProps } from "react-yandex-maps";
import { useMutation } from "@/shared/api/useMutation";
import { useDI } from "@/shared/lib";
import { ConfirmRouteModel } from "./ConfirmRouteModel";
import { useMap } from "../model";

export default function RouteItemMain({
  endPoint,
  driverId,
  startPoint,
  localStatus,
}: TRouteMain) {
  const { driverService } = useDI();

  const [isOpenConfirmRoute, setIsOpenConfirmRoute] = useState(false);

  const { distance, duration, addRoute, mapState, map } = useMap(
    startPoint,
    endPoint,
  );

  const { mutate: updateDriverStatus } = useMutation(
    (newStatusDriverId: number) =>
      driverService.updateDriver(driverId, {
        status_driver_id: newStatusDriverId,
      }),
  );

  const toggleConfirmRoute = () => setIsOpenConfirmRoute((curr) => !curr);

  const handleButtonClick = () => {
    if (localStatus !== 3) {
      updateDriverStatus(3);
    } else {
      toggleConfirmRoute();
      // deleteRoutes();
      // window.location.reload();
    }
  };

  return (
    <>
      <main className="flex justify-between items-center mt-[10px] mb-[30px]">
        <section className="flex flex-col gap-[5px] text-[18px] font-semibold [&>h2>span]:font-normal">
          <h2>
            Точка от: <span>{startPoint}</span>
          </h2>
          <h2>
            Точка до: <span>{endPoint}</span>
          </h2>
          <h2>
            Расчётное время поездки: <span>{duration}</span>
          </h2>
          <h2>
            Расстояние: <span>{distance}</span>
          </h2>
        </section>

        <button
          className={clsx(
            localStatus !== 3
              ? "bg-button-grey hover:bg-[#464646]"
              : "bg-green-700 hover:bg-green-800",
            "px-[20px] h-[45px] mr-[50px] rounded-[16px]",
            "flex justify-center items-center font-medium text-white transition",
          )}
          onClick={handleButtonClick}
        >
          {localStatus !== 3 ? "Взять заказ" : "Выполнил заказ"}
        </button>
      </main>

      <Map
        modules={["multiRouter.MultiRoute"]}
        width={"100%"}
        height={"445px"}
        state={mapState}
        instanceRef={(instance: Ref<YMapsProps | null>) =>
          (map.current = instance)
        }
        onLoad={addRoute}
      />

      <ConfirmRouteModel
        isOpen={isOpenConfirmRoute}
        onClose={toggleConfirmRoute}
      />
    </>
  );
}
