import { StaticImageData } from "next/image";

export interface IUser {
  id?: number;
  imageSrc: StaticImageData;
  nameDriver: string;
  status?:
    | "Доступен"
    | "Назначенный"
    | "Активный"
    | "Отменённый"
    | "Выполненный";
  typeCar?: "Легковой" | "Грузовой";
  capacity?: string;
  experience?: string;
  car?: string;
  numberCar?: string;
}
