import Image, { StaticImageData } from "next/image";
import { ReactElement } from "react";

interface CardDriver {
  imageSrc: StaticImageData | string;
  nameDriver: string;
  status: string;
  typeCar?: string;
  capacity?: string;
  experience: string;
  numberCar?: string;
  buttons: ReactElement;
  infoRoute?: ReactElement;
  vehicle?: string;
}

export default function CardDriver({
  imageSrc,
  nameDriver,
  status,
  typeCar,
  capacity,
  experience,
  numberCar,
  buttons,
  infoRoute,
  vehicle,
}: CardDriver) {
  return (
    <div className="shadow-card rounded-[15px] p-[25px] grid gap-[12px]">
      <article className="flex">
        <Image
          src={imageSrc}
          alt="Driver photo"
          width={120}
          height={120}
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

      {infoRoute}

      <p className="font-bold text-[16px]">
        Стаж: <span className="font-medium">{experience}</span>
      </p>

      {vehicle && (
        <p className="font-bold text-[16px]">
          Автомобиль: <span className="font-medium">{vehicle}</span>
        </p>
      )}

      {typeCar && (
        <p className="font-bold text-[16px]">
          Тип автомобиля:{" "}
          <span className="font-medium">{typeCar} автомобиль</span>
        </p>
      )}

      {capacity && (
        <p className="font-bold text-[16px]">
          Грузоподъёмность: <span className="font-medium">{capacity}</span>
        </p>
      )}

      {numberCar && (
        <p className="font-bold text-[16px]">
          Номерной знак: <span className="font-medium">{numberCar}</span>
        </p>
      )}
    </div>
  );
}
