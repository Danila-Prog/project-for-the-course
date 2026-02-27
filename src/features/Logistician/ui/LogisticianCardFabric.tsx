import { Driver, CardDriver, Route } from "@/entities";
import { useAsync } from "@/shared/api/useAsync";
import { formatDate, STATUS_DRIVER } from "@/shared/lib";
import { declensionWord, useDI } from "@/shared/lib";
import avatar_users from "/public/icons/avatar_users.webp";
import { StateSetter } from "@/shared/types";
import { CurrentTabLogistician } from "../lib/types";
import { CardHistoryRoutes } from "./CardHistoryRoutes";

interface Props {
  driver: Driver;
  setSelectedDriverId: StateSetter<number | null>;
  setSelectedUserId: StateSetter<number | null>;
  toggleFormEditingOrder: () => void;
  toggleFormDeleteOrder: () => void;
  toggleFormOrder: () => void;
  currentTab: CurrentTabLogistician;
  route?: Route;
}
export const LogisticianCardFabric = ({
  driver,
  setSelectedDriverId,
  setSelectedUserId,
  toggleFormEditingOrder,
  toggleFormDeleteOrder,
  toggleFormOrder,
  currentTab,
  route,
}: Props) => {
  const { userService, vehiclesService } = useDI();

  const { data: users } = useAsync(() => userService.getUsers());
  const { data: vehicles } = useAsync(() => vehiclesService.getVehicles());

  if (!users || !vehicles) return;

  const user = userService.findUserById(users, driver.userId);

  const vehicle =
    vehicles && vehiclesService.findVehiclesById(vehicles, driver.vehiclesId);
  
  if (currentTab === "allDrivers") {
    return (
      <CardDriver
        key={user?.userId}
        nameDriver={`${user?.name} ${user?.surname}`}
        imageSrc={driver.photoUrl ?? avatar_users}
        status={
          STATUS_DRIVER[driver.statusDriverId as keyof typeof STATUS_DRIVER]
        }
        experience={`${driver.experienceYears} ${declensionWord(
          Number(driver.experienceYears),
          ["год", "года", "лет"],
        )}`}
        buttons={
          <button
            className="h-[43px] px-[16px] rounded-[25px] bg-button-grey transition hover:bg-[#464646] text-white text-[17px] font-medium mt-[12px]"
            onClick={() => {
              toggleFormOrder();
              setSelectedDriverId(driver.driverId);
              setSelectedUserId(driver.userId);
            }}
          >
            Дать заказ
          </button>
        }
      />
    );
  }

  if (currentTab === "activeDrivers") {
    return (
      <CardDriver
        key={user?.userId}
        nameDriver={`${user?.name} ${user?.surname}`}
        imageSrc={driver.photoUrl ?? avatar_users}
        status={
          STATUS_DRIVER[driver.statusDriverId as keyof typeof STATUS_DRIVER]
        }
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
                toggleFormEditingOrder();
              }}
            >
              Редактировать заказ
            </button>

            <button
              className="h-[43px] px-[16px] rounded-[25px] bg-red-700 transition hover:bg-red-800 text-white text-[17px] font-medium mt-[12px] disabled:opacity-50 disabled:hover:bg-red-700"
              disabled={driver.statusDriverId === 3}
              onClick={() => {
                setSelectedDriverId(driver.driverId);
                toggleFormDeleteOrder();
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
  }

  if (currentTab === "historyDrivers") {
    return <CardHistoryRoutes key={driver?.driverId} driver={driver} />;
  }
};
