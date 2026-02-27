"use client";

import { useDI } from "@/shared/lib/di";
import { useAsync } from "@/shared/api/useAsync";

export type VehicleOption = {
  value: string;
  label: string;
  data: {
    id: number;
    name: string;
    type: string;
    capacity: string;
  };
};

export const useSelectVehicles = () => {
  const { vehiclesService, driverService } = useDI();

  const { data: vehicles } = useAsync(() => vehiclesService.getVehicles());
  const { data: drivers } = useAsync(() => driverService.getDrivers());

  const driverVehicleIds =
    drivers && driverService.getDriversVehiclesIds(drivers);

  const options: VehicleOption[] =
    vehicles
      ?.filter((vehicle) => !driverVehicleIds?.has(vehicle.vehiclesId))
      .map((vehicle) => ({
        value: String(vehicle.vehiclesId),
        label: vehicle.nameVehicles,
        data: {
          id: vehicle.vehiclesId,
          name: vehicle.nameVehicles,
          type: vehicle.vehiclesType ?? "",
          capacity: vehicle.vehiclesCapacity,
        },
      })) ?? [];

  return {
    options,
  };
};
