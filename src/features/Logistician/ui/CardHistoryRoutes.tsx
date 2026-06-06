import { Driver } from "@/entities/Driver/model/types";
import { declensionWord, formatDate } from "@/shared/lib";
import avatar_users from "/public/icons/avatar_users.webp";
import Image from "next/image";
import { CardDriver, Route, User, Car } from "@/entities";
import { LuMapPin, LuWeight } from "react-icons/lu";
import { TbTruckDelivery } from "react-icons/tb";

export const CardHistoryRoutes = ({
  driver,
  route,
  user,
  car,
}: {
  driver: Driver;
  route: Route;
  user: User;
  car: Car;
}) => {
  return (
    <CardDriver
      nameDriver={`${user?.name} ${user?.surname}`}
      imageSrc={driver.photoUrl ?? avatar_users}
      experience={`${driver.experienceYears} ${declensionWord(
        Number(driver.experienceYears),
        ["год", "года", "лет"],
      )}`}
      status="Выполнен"
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

            <section className="flex items-center gap-1.5">
              <LuWeight size={22} className="text-primary-gray" />

              <span className="font-medium text-sm">
                Груз: {route.weight}{" "}
                {declensionWord(Number(route?.weight), [
                  "тонна",
                  "тонны",
                  "тонн",
                ])}
              </span>
            </section>

            <section className="flex gap-1.5 items-center mb-5">
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
      confirmPhoto={
        <figure className="flex flex-col gap-1">
          <figcaption className="font-medium text-sm">
            Фото подтверждение:
          </figcaption>

          <Image
            src={route?.confirmationPhoto ?? avatar_users}
            alt="Confirmation photo"
            width={250}
            height={250}
            className="w-[180px] h-[180px] min-[425px]:w-[230px] min-[425px]:h-[230px] lg:w-[250px] lg:h-[250px] rounded-[8px]"
          />
        </figure>
      }
    />
  );
};
