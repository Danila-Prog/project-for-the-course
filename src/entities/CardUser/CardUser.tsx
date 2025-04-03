import Image, { StaticImageData } from "next/image";

export interface ICardUser {
  id?: number;
  imageSrc: StaticImageData;
  name: string;
  status: "Доступен" | "Занят";
  typeCar: "Легковой" | "Грузовой";
  loadCapacity: string;
  experience: string;
  numberCar: string;
  handleCloseOpen?: () => void;
}

export default function CardUser({
  imageSrc,
  name,
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
          <h1 className="text-[24px] font-bold mb-[4px]"> {name}</h1>{" "}
          <p className="text-[15px] text-[#7b92a4]">
            Статуc водителя: {status}
          </p>
          <button
            className="w-[117px] h-[43px] px-[16px] rounded-[25px] bg-button-grey transition hover:bg-[#464646] text-white text-[17px] font-medium mt-[12px]"
            onClick={handleCloseOpen}
          >
            Дать заказ
          </button>
        </div>
      </article>
      <p className="font-bold text-[15px]">
        Тип автомобиля: {typeCar} автомобиль
      </p>
      <p className="font-bold text-[15px]">Грузоподъёмность: {loadCapacity}</p>
      <p className="font-bold text-[15px]">Стаж: {experience}</p>
      <p className="font-bold text-[15px]">Номерной знак: {numberCar}</p>
    </div>
  );
}
