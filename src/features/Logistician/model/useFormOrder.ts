"use client";

import { FormEvent, useState } from "react";
import { updateField, useDI } from "@/shared/lib";
import { useMutation } from "@/shared/api/useMutation";

export const useFormOrder = (driverId: number, userId: number) => {
  const [form, setForm] = useState({
    start: "",
    end: "",
    vehicleId: 0,
    dateStart: "",
    dateEnd: "",
  });

  const { routeService } = useDI();

  const errorDate = routeService.formErrorWithDate(
    form.dateStart,
    form.dateEnd,
  );

  const createRoute = useMutation(() =>
    routeService.createAndAssignNewRoute({
      driverId,
      userId,
      vehicleId: form.vehicleId,
      start: form.start,
      end: form.end,
      dateStart: form.dateStart,
      dateEnd: form.dateEnd,
    }),
  );

  const isValid =
    form.start &&
    form.end &&
    form.vehicleId &&
    form.dateStart &&
    form.dateEnd &&
    !errorDate;

  const updateFieldFunc = updateField<typeof form, keyof typeof form>(setForm);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    await createRoute.mutate();
    window.location.reload();
  };

  return {
    isValid,
    errorDate,
    handleSubmit,
    form,
    updateFieldFunc,
  };
};
