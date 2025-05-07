"use client";
import { RouteItem } from "@/features/RouteItem";
import { YMaps } from "react-yandex-maps";
import { useEffect, useState } from "react";
import { useFetch } from "@/shared/api/useFetch";

export default function UserDriver() {
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [surname, setSurname] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [activeRouteId, setActiveRouteId] = useState<number | null>(null);

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
    setName(localStorage.getItem("name"));
    setSurname(localStorage.getItem("surname"));
    setUserId(localStorage.getItem("userId"));
    const savedActiveRoute = localStorage.getItem("activeRouteId");
    if (savedActiveRoute) {
      setActiveRouteId(Number(savedActiveRoute));
    }
  }, []);

  const { drivers, company, vehicles, vehiclesType, routes } = useFetch(
    userId,
    companyId
  );

  return (
    <>
      <main className="flex justify-between my-[25px]">
        <div className="w-[49%] bg-white px-[20px] pt-[15px] pb-[20px] rounded-[16px] [&>h1]:text-[25px] [&>h1]:font-bold">
          <h1>
            Водитель: {name} {surname}
          </h1>
          <h1>Ваш стаж: {drivers?.experience_years} года</h1>
          <h1>Номерной знак: {vehicles?.number_car}</h1>
        </div>

        <div className="bg-white w-[49%] px-[20px] pt-[15px] pb-[20px] rounded-[16px] [&>h1]:text-[25px] [&>h1]:font-bold">
          <h1>Тип авто: {vehiclesType?.vehicles_type}</h1>
          <h1>Ваш автомобиль: {vehicles?.name_vehicles}</h1>
          <h1>Компания: {company?.company_name}</h1>
        </div>
      </main>

      <section className="w-[80%] mx-auto bg-white px-[30px] pt-[20px] pb-[30px] rounded-[16px]">
        <h1 className="text-[30px] font-bold">
          Доступно {routes.length} маршрутов:
        </h1>

        <YMaps query={{ apikey: "cbc6f517-56a2-455d-b68b-aed0465d40d0" }}>
          <div className="grid gap-[15px] mt-[15px] ">
            {routes.map((route) => (
              <RouteItem
                key={route.route_id}
                routeId={route.route_id}
                setActiveRouteId={setActiveRouteId}
                routeFrom={route.start_point}
                routeBefore={route.end_point}
                isDisabled={
                  activeRouteId !== null && activeRouteId !== route.route_id
                }
              />
            ))}
          </div>
        </YMaps>
      </section>
    </>
  );
}
