"use client";
import { RouteItem } from "@/features/RouteItem";
import { mockRoute } from "../lib/mock";
import { YMaps } from "react-yandex-maps";

export default function UserDriver() {
  return (
    <>
      <main className="flex justify-between my-[25px]">
        <div className="w-[49%] bg-white px-[20px] pt-[15px] pb-[20px] rounded-[16px] [&>h1]:text-[25px] [&>h1]:font-bold">
          <h1>Водитель:</h1>
          <h1>Ваш стаж:</h1>
          <h1>Номерной знак:</h1>
        </div>

        <div className="bg-white w-[49%] px-[20px] pt-[15px] pb-[20px] rounded-[16px] [&>h1]:text-[25px] [&>h1]:font-bold">
          <h1>Тип авто:</h1>
          <h1>Email адрес:</h1>
          <h1>Номер телефона:</h1>
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
