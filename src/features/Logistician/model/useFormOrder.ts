"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { updateField, useDI } from "@/shared/lib";
import { useMutation } from "@/shared/api/useMutation";
import { addMinutes, format, parse } from "date-fns";

export const useFormOrder = (driverId: number, userId: number) => {
  const [form, setForm] = useState({
    start: "",
    end: "",
    weight: 0,
    carId: 0,
    dateStart: "",
    dateEnd: "",
  });

  const [durationMinutes, setDurationMinutes] = useState(0);

  const { routeService } = useDI();

  const minDateEnd = useMemo(() => {
    if (!form.dateStart) return "";
    if (!durationMinutes) return form.dateStart;

    const parsedDate = parse(form.dateStart, "yyyy-MM-dd", new Date());
    return format(addMinutes(parsedDate, durationMinutes), "yyyy-MM-dd");
  }, [form.dateStart, durationMinutes]);

  useEffect(() => {
    if (!form.dateEnd || !minDateEnd) return;

    if (form.dateEnd <= minDateEnd) {
      setForm((prev) => ({
        ...prev,
        dateEnd: "",
      }));
    }
  }, [form.dateEnd, minDateEnd]);

  const errorDate = routeService.formErrorWithDate(
    form.dateStart,
    form.dateEnd,
  );

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
      weight: form.weight ?? 0,
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
    !errorDate &&
    !isDuplicateAddress;

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
    isDuplicateAddress,
    reset,
    durationMinutes,
    setDurationMinutes,
    minDateEnd,
  };
};
