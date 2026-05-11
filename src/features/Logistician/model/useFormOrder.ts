"use client";

import { FormEvent, useState } from "react";
import { updateField, useDI } from "@/shared/lib";
import { useMutation } from "@/shared/api/useMutation";

export const useFormOrder = (driverId: number, userId: number) => {
  const [form, setForm] = useState({
    start: "",
    end: "",
    weight: 0,
    carId: 0,
    dateStart: "",
    dateEnd: "",
  });

  const { routeService } = useDI();

  const reset = () =>
    setForm({
      start: "",
      end: "",
      weight: 0,
      carId: 0,
      dateStart: "",
      dateEnd: "",
    });

  const createRoute = useMutation(() =>
    routeService.createAndAssignNewRoute({
      driverId,
      userId,
      carId: form.carId,
      start: form.start,
      end: form.end,
      dateStart: form.dateStart,
      dateEnd: form.dateEnd,
      weight: Number(form.weight) ?? 0,
    }),
  );

  const isDuplicateAddress =
    form.start == form.end && !!form.start && !!form.end;

  const isValid =
    form.start &&
    form.end &&
    form.carId &&
    form.dateStart &&
    form.dateEnd &&
    form.weight &&
    !isDuplicateAddress;

  const isRouteUnavailable = !form.start || !form.end || isDuplicateAddress;

  const updateFieldFunc = updateField<typeof form, keyof typeof form>(setForm);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isValid) return;

    await createRoute.mutate();

    window.location.reload();
  };

  return {
    isValid,
    handleSubmit,
    form,
    updateFieldFunc,
    isDuplicateAddress,
    isRouteUnavailable,
    reset,
    setForm,
  };
};
