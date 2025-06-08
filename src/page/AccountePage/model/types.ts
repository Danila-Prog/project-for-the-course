import { StaticImageData } from "next/image";

export interface IUser {
  id?: number;
  imageSrc: StaticImageData;
  nameDriver: string;
  status?: string;
  typeCar?: string;
  capacity?: string;
  experience?: string;
  car?: string;
  numberCar?: string;
}
