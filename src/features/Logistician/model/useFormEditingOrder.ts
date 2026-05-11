"use client";

import { useAsync } from "@/shared/api/useAsync";
import { useMutation } from "@/shared/api/useMutation";
import { useDI, updateField } from "@/shared/lib";
import { FormEvent, useEffect, useState } from "react";

export const useFormEditingOrder = (driverId: number) => {
  const { routeService, driverService } = useDI();

  const { data: route } = useAsync(
    () => routeService.getRouteByDriverId(driverId),
    [driverId],
  );

  const [form, setForm] = useState({
    selectedNewAddressSupply: "",
    selectedNewAddressDischarge: "",
    dateStart: "",
    dateEnd: "",
    weight: "" as number | "",
  });

  const [selectVehicle, setSelectVehicle] = useState(0);

  useEffect(() => {
    setForm({
      selectedNewAddressSupply: route?.startPoint ?? "",
      selectedNewAddressDischarge: route?.endPoint ?? "",
      dateStart: route?.dateStart.split("T")[0] ?? "",
      dateEnd: route?.dateEnd.split("T")[0] ?? "",
      weight: route?.weight ?? "",
    });
  }, [route]);

  const updateRoute = useMutation(() =>
    routeService.updateRoute(route?.id ?? 0, {
      driver_id: Number(driverId),
      start_point: form.selectedNewAddressSupply,
      end_point: form.selectedNewAddressDischarge,
      date_start: form.dateStart,
      date_end: form.dateEnd,
      weight: form.weight === "" ? 0 : form.weight,
    }),
  );

  const updateCar = useMutation(() =>
    driverService.updateDriver(
      driverId,
      selectVehicle ? { car_id: selectVehicle } : {},
    ),
  );

  const isDuplicateAddress =
    form.selectedNewAddressSupply === form.selectedNewAddressDischarge &&
    !!form.selectedNewAddressSupply &&
    !!form.selectedNewAddressDischarge;

  const isValid =
    form.selectedNewAddressDischarge ||
    form.selectedNewAddressSupply ||
    form.dateStart ||
    form.dateEnd;

  const isRouteUnavailable =
    !form.selectedNewAddressSupply ||
    !form.selectedNewAddressDischarge ||
    isDuplicateAddress;
  const updateFieldFunc = updateField<typeof form, keyof typeof form>(setForm);

  const handleSubmitEditingOrder = async (e: FormEvent) => {
    e.preventDefault();

    await updateRoute.mutate();

    if (selectVehicle) {
      await updateCar.mutate();
    }

    window.location.reload();
  };

  return {
    form,
    setForm,
    selectVehicle,
    setSelectVehicle,
    updateFieldFunc,
    isDuplicateAddress,
    isValid,
    isRouteUnavailable,
    handleSubmitEditingOrder,
    route,
  };
};
