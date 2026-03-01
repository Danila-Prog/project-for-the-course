import { CardDriver, Driver, Route, User, Vehicles } from "@/entities";
import { declensionWord, formatDate, STATUS_DRIVER } from "@/shared/lib";
import { StateSetter } from "@/shared/types";
import avatar_users from "/public/icons/avatar_users.webp";

interface Props {
  user: User;
  driver: Driver;
  vehicle: Vehicles;
  route: Route;
  toggleDeleteOrder: () => void;
  toggleEditOrder: () => void;
  setSelectedDriverId: StateSetter<number | null>;
}

export const CardActiveDrivers = ({
  user,
  driver,
  vehicle,
  route,
  setSelectedDriverId,
  toggleDeleteOrder,
  toggleEditOrder,
}: Props) => {
  return (
    <CardDriver
      key={user?.userId}
      nameDriver={`${user?.name} ${user?.surname}`}
      imageSrc={driver.photoUrl ?? avatar_users}
      status={STATUS_DRIVER[driver.statusDriverId]}
      experience={`${driver.experienceYears} ${declensionWord(
        Number(driver.experienceYears),
        ["год", "года", "лет"],
      )}`}
      vehicle={vehicle?.nameVehicles}
      numberCar={vehicle?.numberCar ?? ""}
      capacity={`${vehicle?.vehiclesCapacity} ${declensionWord(
        Number(vehicle?.vehiclesCapacity),
        ["тонна", "тонны", "тонн"],
      )}`}
      typeCar={vehicle?.vehiclesType ?? ""}
      buttons={
        <div className="flex gap-3">
          <button
            className="h-[43px] px-[16px] rounded-[25px] bg-orange-700 transition hover:bg-orange-800 text-white text-[17px] font-medium mt-[12px] disabled:opacity-50 disabled:hover:bg-orange-700"
            disabled={driver.statusDriverId === 3}
            onClick={() => {
              setSelectedDriverId(driver.driverId);
              toggleEditOrder();
            }}
          >
            Редактировать заказ
          </button>

          <button
            className="h-[43px] px-[16px] rounded-[25px] bg-red-700 transition hover:bg-red-800 text-white text-[17px] font-medium mt-[12px] disabled:opacity-50 disabled:hover:bg-red-700"
            disabled={driver.statusDriverId === 3}
            onClick={() => {
              setSelectedDriverId(driver.driverId);
              toggleDeleteOrder();
            }}
          >
            Удалить заказ
          </button>
        </div>
      }
      infoRoute={
        route && (
          <>
            <p className="font-bold text-[16px]">
              Адрес погрузки:{" "}
              <span className="font-medium">{route?.startPoint}</span>
            </p>
            <p className="font-bold text-[16px]">
              Адрес выгрузки:{" "}
              <span className="font-medium">{route?.endPoint}</span>
            </p>

            <p className="font-bold text-[16px]">
              Дата начало маршрута:{" "}
              <span className="font-medium">
                {formatDate(route?.dateStart ?? "", "normal")}
              </span>
            </p>

            <p className="font-bold text-[16px]">
              Дата конца маршрута:{" "}
              <span className="font-medium">
                {formatDate(route?.dateEnd ?? "", "normal")}
              </span>
            </p>
          </>
        )
      }
    />
  );
};
