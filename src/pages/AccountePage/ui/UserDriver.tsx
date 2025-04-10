"use client";
import { RouteItem } from "@/features/RouteItem";
import { mockRoute } from "../lib/mock";
import { YMaps } from "react-yandex-maps";

interface IUserDriver {
  nameDriver: string;
  experience: string;
  numberCar: string;
  typeCar: "Легковой" | "Грузовой";
  email: string;
  company: string;
}

export default function UserDriver({
  nameDriver,
  experience,
  numberCar,
  typeCar,
  email,
  company,
}: IUserDriver) {
  return (
    <>
      <main className="flex justify-between my-[25px]">
        <div className="w-[49%] bg-white px-[20px] pt-[15px] pb-[20px] rounded-[16px] [&>h1]:text-[25px] [&>h1]:font-bold">
          <h1>Водитель: {nameDriver}</h1>
          <h1>Ваш стаж: {experience}</h1>
          <h1>Номерной знак: {numberCar}</h1>
        </div>

        <div className="bg-white w-[49%] px-[20px] pt-[15px] pb-[20px] rounded-[16px] [&>h1]:text-[25px] [&>h1]:font-bold">
          <h1>Тип авто: {typeCar}</h1>
          <h1>Email адрес: {email}</h1>
          <h1>Компания: {company}</h1>
        </div>
      </main>

      <section className="w-[80%] mx-auto bg-white px-[30px] pt-[20px] pb-[30px] rounded-[16px]">
        <h1 className="text-[30px] font-bold">
          Доступно {mockRoute.length} маршрутов:
        </h1>

        <YMaps query={{ apikey: "cbc6f517-56a2-455d-b68b-aed0465d40d0" }}>
          <div className="grid gap-[15px] mt-[15px] ">
            {mockRoute.map((route) => (
              <RouteItem key={route.id} {...route} />
            ))}
          </div>
        </YMaps>
      </section>
    </>
  );
}
