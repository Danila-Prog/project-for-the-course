"use client";

import { useDI } from "@/shared/lib/di";
import { useAsync } from "@/shared/api/useAsync";

export type CarOption = {
  value: string;
  label: string;
  data: {
    id: number;
    name: string;
    type: string;
    weight: string;
  };
};

export const useSelectCar = (weight: number) => {
  const { carService, driverService } = useDI();

  const { data: cars } = useAsync(() => carService.getCars());
  const { data: drivers } = useAsync(() => driverService.getDrivers());

  const driverCarsIds = drivers && driverService.getDriversCarsIds(drivers);

  const options: CarOption[] =
    cars
      ?.filter(
        (car) => !driverCarsIds?.has(car.carId) && Number(car.weight) >= weight,
      )
      .map((car) => ({
        value: String(car.carId),
        label: car.name,
        data: {
          id: car.carId,
          name: car.name,
          type: car.carType ?? "",
          weight: car.weight,
        },
      })) ?? [];

  return {
    options,
  };
};
