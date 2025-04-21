import { IUser } from "@/pages/AccountePage/model/types";
import Image from "next/image";
import { ReactElement } from "react";

interface ICardUser extends IUser {
  buttons?: ReactElement;
  pathRoute?: ReactElement;
}

export default function CardUser({
  imageSrc,
  nameDriver,
  status,
  typeCar,
  capacity,
  experience,
  numberCar,
  buttons,
  pathRoute,
}: ICardUser) {
  return (
    <div className="shadow-card rounded-[15px] p-[25px] grid gap-[12px]">
      <article className="flex">
        <Image
          src={imageSrc}
          alt=""
          className="w-[120px] h-[120px] mr-[25px] rounded-[8px]"
        />
        <div>
          <h1 className="text-[24px] font-bold mb-[4px]"> {nameDriver}</h1>
          <p className="text-[15px] text-[#7b92a4]">
            Статуc водителя: {status}
          </p>
          {buttons}
        </div>
      </article>

      {pathRoute}

      <p className="font-bold text-[16px]">
        Тип автомобиля:{" "}
        <span className="font-medium">{typeCar} автомобиль</span>
      </p>
      <p className="font-bold text-[16px]">
        Грузоподъёмность: <span className="font-medium">{capacity}</span>
      </p>
      <p className="font-bold text-[16px]">
        Стаж: <span className="font-medium">{experience}</span>
      </p>
      <p className="font-bold text-[16px]">
        Номерной знак: <span className="font-medium">{numberCar}</span>
      </p>
    </div>
  );
}
