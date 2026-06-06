import { CardDriver, Driver, Route, User, Car } from "@/entities";
import { declensionWord, formatDate, STATUS_DRIVER } from "@/shared/lib";
import { StateSetter } from "@/shared/types";
import avatar_users from "/public/icons/avatar_users.webp";
import { Menu } from "@/shared";
import { LuMapPin, LuPencil, LuTrash, LuWeight } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";

interface Props {
  user: User;
  driver: Driver;
  car: Car;
  route: Route;
  toggleDeleteOrder: () => void;
  toggleEditOrder: () => void;
  setSelectedDriverId: StateSetter<number | null>;
}

export const CardActiveDrivers = ({
  user,
  driver,
  car,
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
      menu={
        <Menu
          items={[
            {
              label: "Редактировать",
              onClick: () => {
                setSelectedDriverId(driver.driverId);
                toggleEditOrder();
              },
              disabled: driver.statusDriverId === 3,
              icon: <LuPencil />,
            },
            {
              label: "Удалить",
              onClick: () => {
                setSelectedDriverId(driver.driverId);
                toggleDeleteOrder();
              },
              variant: "danger",
              disabled: driver.statusDriverId === 3,
              icon: <LuTrash />,
            },
          ]}
        />
      }
      infoRoute={
        route && (
          <section className="flex flex-col gap-5 mt-5">
            <section className="flex flex-col gap-3">
              <div className="flex gap-1.5 items-center">
                <LuMapPin
                  className="text-primary-gray flex flex-shrink-0"
                  size={22}
                />

                <span className="font-medium text-sm">
                  {route?.startPoint}{" "}
                  <span className="text-sm text-primary-gray">
                    {formatDate(route?.dateStart ?? "", "normal")}
                  </span>
                </span>
              </div>

              <div className="flex gap-1.5 items-center">
                <LuMapPin
                  className="text-secondary-green flex flex-shrink-0"
                  size={22}
                />

                <span className="font-medium text-sm">
                  {route?.endPoint}{" "}
                  <span className="text-sm text-primary-gray">
                    {formatDate(route?.dateEnd ?? "", "normal")}
                  </span>
                </span>
              </div>
            </section>

            <section className="flex gap-1.5 items-center">
              <LuWeight size={22} className="text-primary-gray" />

              <span className="font-medium text-sm">
                Груз: {route.weight}{" "}
                {declensionWord(Number(route.weight), [
                  "тонна",
                  "тонны",
                  "тонн",
                ])}
              </span>
            </section>

            <section className="flex gap-1.5 items-center">
              <TbTruckDelivery
                size={22}
                className="text-primary-gray flex flex-shrink-0"
              />

              <div className="flex flex-wrap gap-1.5">
                <span className="block font-medium text-sm">{car.name}</span>
                <span className="font-medium text-sm">{car?.numberCar}</span>
                <span className="font-medium text-sm">
                  {car?.weight}{" "}
                  {declensionWord(Number(car?.weight), [
                    "тонна",
                    "тонны",
                    "тонн",
                  ])}
                </span>
              </div>
            </section>
          </section>
        )
      }
    />
  );
};
