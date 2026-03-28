import { Driver } from "@/entities/Driver/model/types";
import { declensionWord, formatDate } from "@/shared/lib";
import avatar_users from "/public/icons/avatar_users.webp";
import Image from "next/image";
import { CardDriver, Route, User, Car } from "@/entities";

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
      car={car?.name}
      numberCar={car?.numberCar ?? ""}
      capacity={`${car?.weight} ${declensionWord(Number(car?.weight), [
        "тонна",
        "тонны",
        "тонн",
      ])}`}
      status="Выполнен"
      typeCar={car?.carType ?? ""}
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

            <p className="font-bold text-[16px]">
              Масса груза:{" "}
              <span className="font-medium">
                {route.weight}{" "}
                {declensionWord(Number(car?.weight), [
                  "тонна",
                  "тонны",
                  "тонн",
                ])}
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
            src={route?.confirmationPhoto ?? avatar_users}
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
