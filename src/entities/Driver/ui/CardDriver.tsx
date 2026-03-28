import Image, { StaticImageData } from "next/image";
import { ReactElement } from "react";

interface Props {
  imageSrc: StaticImageData | string;
  nameDriver: string;
  status: string;
  typeCar?: string;
  capacity?: string;
  experience: string;
  numberCar?: string;
  buttons?: ReactElement;
  infoRoute?: ReactElement;
  car?: string;
  confirmPhoto?: ReactElement;
}

export const CardDriver = ({
  imageSrc,
  nameDriver,
  status,
  typeCar,
  capacity,
  experience,
  numberCar,
  buttons,
  infoRoute,
  car,
  confirmPhoto,
}: Props) => {
  return (
    <div className="shadow-card rounded-2xl p-5 flex flex-col gap-3">
      <article className="flex">
        <Image
          src={imageSrc}
          alt="Driver photo"
          width={160}
          height={160}
          className="w-40 h-40 mr-5 rounded-xl"
        />

        <div>
          <h1 className="text-xl font-bold mb-1 text-accent-black">
            {nameDriver}
          </h1>

          <p className="text-xs text-primary-gray font-medium">
            Статуc водителя:{" "}
            <span className="text-secondary-green">{status}</span>
          </p>

          {buttons}
        </div>
      </article>

      {infoRoute}

      <p className="font-semibold text-xs">
        Стаж: <span className="font-normal">{experience}</span>
      </p>

      {car && (
        <p className="font-semibold text-xs">
          Автомобиль: <span className="font-normal">{car}</span>
        </p>
      )}

      {typeCar && (
        <p className="font-semibold text-xs">
          Тип автомобиля:{" "}
          <span className="font-normal">{typeCar} автомобиль</span>
        </p>
      )}

      {capacity && (
        <p className="font-semibold text-xs">
          Грузоподъёмность: <span className="font-normal">{capacity}</span>
        </p>
      )}

      {numberCar && (
        <p className="font-semibold text-xs">
          Номерной знак: <span className="font-normal">{numberCar}</span>
        </p>
      )}

      {confirmPhoto}
    </div>
  );
};
