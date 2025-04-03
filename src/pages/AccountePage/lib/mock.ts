import { ICardUser } from "@/entities/CardUser/CardUser";
import mockImage from "/public/icons/mockImage.webp";

export const mockRoute = [
  {
    id: 1,
    routeName: "Самара-Казань",
    routeFrom: "55.75",
    routeBefore: "Казань",
    travelTime: "300",
  },
  {
    id: 2,
    routeName: "Самара-Екатеринбург",
    routeFrom: "Самара",
    routeBefore: "Екатеринбург",
    travelTime: "300",
  },
  {
    id: 3,
    routeName: "Самара-Москва",
    routeFrom: "Самара",
    routeBefore: "Москва",
    travelTime: "300",
  },
  {
    id: 4,
    routeName: "Самара-Питер",
    routeFrom: "Самара",
    routeBefore: "Питер",
    travelTime: "300",
  },
  {
    id: 5,
    routeName: "Самара-Сахалин",
    routeFrom: "Самара",
    routeBefore: "Сахалин",
    travelTime: "300",
  },
];

export const mockUsers: ICardUser[] = [
  {
    id: 1,
    imageSrc: mockImage,
    name: "Александр",
    status: "Доступен",
    typeCar: "Легковой",
    loadCapacity: "1 тонна",
    experience: "3 года",
    numberCar: "Х1632",
  },
  {
    id: 2,
    imageSrc: mockImage,
    name: "Сергей",
    status: "Занят",
    typeCar: "Грузовой",
    loadCapacity: "1 тонна",
    experience: "1 года",
    numberCar: "Н123Н163",
  },
];
