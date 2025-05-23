"use client";

import { useFetch } from "@/shared/api/useFetch";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { CardUser } from "@/entities/CardUser";
import { DRIVERS_STATUS } from "../lib/consts";
import mockImage from "/public/icons/mockImage.webp";
import { filterDrivers } from "./filterUsers";

export default function useRenderDriver(
  activeDriver: boolean,
  setSelectedDriverId: Dispatch<SetStateAction<number | null>>,
  toggleFormOrder: () => void,
  toggleFormEditingOrder: () => void,
  toggleFormDeleteOrder: () => void
) {
  const [companyId, setCompanyId] = useState<string | null>("");

  const { dataUsers, dataDrivers, dataVehicles, dataVehiclesType, dataRoutes } =
    useFetch();
  const [filters, setFilters] = useState({
    search: "",
    experienceFrom: "",
    experienceBefore: "",
    capacityFrom: "",
    capacityBefore: "",
    typeCar: "",
  });

  const filteredDrivers = filterDrivers(
    dataDrivers.data,
    dataUsers.data,
    dataVehicles.data,
    dataVehiclesType.data,
    filters
  );

  const handleFiltersChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    setCompanyId(localStorage.getItem("companyId"));
  }, []);

  const companyDrivers = dataUsers.data.filter(
    (user) =>
      Number(user.company_id) === Number(companyId) &&
      Number(user.role_id) === 1
  );

  const companyFilteredDrivers = filteredDrivers.filter((driver) =>
    companyDrivers.some(
      (user) =>
        user.user_id === driver.user_id &&
        (activeDriver
          ? driver.status_driver_id !== 1
          : driver.status_driver_id === 1)
    )
  );

  const renderDriverCard = (driver: (typeof dataDrivers.data)[0]) => {
    const user = companyDrivers.find((user) => user.user_id === driver.user_id);
    if (!user) return null;

    const vehicles = dataVehicles.data.find(
      (vehicles) => vehicles.vehicles_id === driver.vehicles_id
    );
    const vehiclesType = dataVehiclesType.data?.find(
      (vehiclesType) =>
        vehiclesType.vehicles_type_id === vehicles?.vehicles_type_id
    );

    const route = dataRoutes.data.find(
      (route) => route.driver_id === driver.driver_id
    );

    return (
      <CardUser
        key={user?.user_id}
        nameDriver={`${user?.name} ${user?.surname}`}
        imageSrc={mockImage}
        status={
          DRIVERS_STATUS[driver.status_driver_id as keyof typeof DRIVERS_STATUS]
        }
        experience={`${driver.experience_years} года`}
        numberCar={vehicles?.number_car}
        capacity={`${vehicles?.vehicles_capacity} тонны`}
        typeCar={vehiclesType?.vehicles_type}
        buttons={
          !activeDriver ? (
            <button
              className="h-[43px] px-[16px] rounded-[25px] bg-button-grey transition hover:bg-[#464646] text-white text-[17px] font-medium mt-[12px]"
              onClick={() => {
                toggleFormOrder();
                setSelectedDriverId(driver.driver_id);
              }}
            >
              Дать заказ
            </button>
          ) : (
            <div className="flex gap-[12px]">
              <button
                className="h-[43px] px-[16px] rounded-[25px] bg-orange-700 transition hover:bg-orange-800 text-white text-[17px] font-medium mt-[12px] disabled:opacity-50 disabled:hover:bg-orange-700"
                disabled={driver.status_driver_id === 3}
                onClick={() => {
                  setSelectedDriverId(driver.driver_id);
                  toggleFormEditingOrder();
                }}
              >
                Редактировать заказ
              </button>

              <button
                className="h-[43px] px-[16px] rounded-[25px] bg-red-700 transition hover:bg-red-800 text-white text-[17px] font-medium mt-[12px] disabled:opacity-50 disabled:hover:bg-red-700"
                disabled={driver.status_driver_id === 3}
                onClick={() => {
                  setSelectedDriverId(driver.driver_id);
                  toggleFormDeleteOrder();
                }}
              >
                Удалить заказ
              </button>
            </div>
          )
        }
        pathRoute={
          activeDriver &&
          route && (
            <>
              <p className="font-bold text-[16px]">
                Адресс погрузки:{" "}
                <span className="font-medium">{route?.start_point}</span>
              </p>
              <p className="font-bold text-[16px]">
                Адресс выгрузки:{" "}
                <span className="font-medium">{route?.end_point}</span>
              </p>
            </>
          )
        }
      />
    );
  };

  return {
    companyFilteredDrivers,
    renderDriverCard,
    handleFiltersChange,
    filters,
  };
}
