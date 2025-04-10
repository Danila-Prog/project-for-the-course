import Image, { StaticImageData } from "next/image";

export interface ICardUser {
  id?: number;
  imageSrc: StaticImageData;
  nameDriver: string;
  status: "Доступен" | "Занят";
  typeCar: "Легковой" | "Грузовой";
  loadCapacity: string;
  experience: string;
  numberCar: string;
  handleCloseOpen?: () => void;
}

export default function CardUser({
  imageSrc,
  nameDriver,
  status,
  typeCar,
  loadCapacity,
  experience,
  numberCar,
  handleCloseOpen,
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
          <button
            className="h-[43px] px-[16px] rounded-[25px] bg-button-grey transition hover:bg-[#464646] text-white text-[17px] font-medium mt-[12px]"
            onClick={handleCloseOpen}
          >
            Дать заказ
          </button>
        </div>
      </article>
      <p className="font-bold text-[16px]">
        Тип автомобиля:{" "}
        <span className="font-medium">{typeCar} автомобиль</span>
      </p>
      <p className="font-bold text-[16px]">
        Грузоподъёмность: <span className="font-medium">{loadCapacity}</span>
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
