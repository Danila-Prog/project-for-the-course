import { ICardUser } from "@/entities/CardUser/CardUser";
import mockImage from "/public/icons/mockImage.webp";

export const mockRoute = [
  {
    id: 1,
    routeFrom: "Самара 3 проезд 44",
    routeBefore: "Самара Советской Армии, 134",
  },
  {
    id: 2,
    routeFrom: "Самара",
    routeBefore: "Екатеринбург",
  },
  {
    id: 3,
    routeFrom: "Самара",
    routeBefore: "Москва",
  },
  {
    id: 4,
    routeFrom: "Самара",
    routeBefore: "Питер",
  },
  {
    id: 5,
    routeFrom: "Самара",
    routeBefore: "Сахалин",
  },
];

export const mockUsers: ICardUser[] = [
  {
    id: 1,
    imageSrc: mockImage,
    nameDriver: "Александр",
    status: "Доступен",
    typeCar: "Легковой",
    loadCapacity: "1 тонна",
    experience: "3 года",
    numberCar: "Х1632",
  },
  {
    id: 2,
    imageSrc: mockImage,
    nameDriver: "Сергей",
    status: "Занят",
    typeCar: "Грузовой",
    loadCapacity: "1 тонна",
    experience: "1 года",
    numberCar: "Н123Н163",
  },
];
