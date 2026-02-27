import { Driver } from "@/entities/Driver/model/types";
import { useAsync } from "@/shared/api/useAsync";
import { declensionWord, formatDate, useDI } from "@/shared/lib";
import avatar_users from "/public/icons/avatar_users.webp";
import Image from "next/image";
import { CardDriver } from "@/entities";

export const CardHistoryRoutes = ({ driver }: { driver: Driver }) => {
  const { historyRouteService } = useDI();

  const { data: historyRoute } = useAsync(
    () => historyRouteService.getDataForCardHistoryRoute(driver),
    [driver.driverId],
  );

  return (
    <CardDriver
      nameDriver={`${historyRoute?.user?.name} ${historyRoute?.user?.surname}`}
      imageSrc={driver.photoUrl ?? avatar_users}
      experience={`${driver.experienceYears} ${declensionWord(
        Number(driver.experienceYears),
        ["год", "года", "лет"],
      )}`}
      vehicle={historyRoute?.vehicle?.nameVehicles}
      numberCar={historyRoute?.vehicle?.numberCar ?? ""}
      capacity={`${historyRoute?.vehicle?.vehiclesCapacity} ${declensionWord(
        Number(historyRoute?.vehicle?.vehiclesCapacity),
        ["тонна", "тонны", "тонн"],
      )}`}
      status="Выполнен"
      typeCar={historyRoute?.vehicle?.vehiclesType ?? ""}
      infoRoute={
        historyRoute?.route && (
          <>
            <p className="font-bold text-[16px]">
              Адрес погрузки:{" "}
              <span className="font-medium">
                {historyRoute.route?.startPoint}
              </span>
            </p>
            <p className="font-bold text-[16px]">
              Адрес выгрузки:{" "}
              <span className="font-medium">
                {historyRoute.route?.endPoint}
              </span>
            </p>

            <p className="font-bold text-[16px]">
              Дата начало маршрута:{" "}
              <span className="font-medium">
                {formatDate(historyRoute.route?.dateStart ?? "", "normal")}
              </span>
            </p>

            <p className="font-bold text-[16px]">
              Дата конца маршрута:{" "}
              <span className="font-medium">
                {formatDate(historyRoute.route?.dateEnd ?? "", "normal")}
              </span>
            </p>
          </>
        )
      }
      confirmPhoto={
        <figure className="flex flex-col gap-1">
          <figcaption className="font-bold text-[16px]">
            Фото подтверждение
          </figcaption>
          <Image
            src={historyRoute?.route?.confirmationPhoto ?? avatar_users}
            alt="Confirmation photo"
            width={200}
            height={200}
            className="w-[200px] h-[200px] rounded-[8px]"
          />
        </figure>
      }
    />
  );
};
