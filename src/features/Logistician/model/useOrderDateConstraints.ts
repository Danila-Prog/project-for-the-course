"use client";
import { StateSetter } from "@/shared/types";
import { addMinutes, format, parse } from "date-fns";
import { useEffect, useMemo, useState } from "react";

interface DateFields {
  dateStart: string;
  dateEnd: string;
}

export const useOrderDateConstraints = <T extends DateFields>(
  form: T,
  setForm: StateSetter<T>,
  isRouteUnavailable: boolean,
) => {
  const [durationMinutes, setDurationMinutes] = useState(0);

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

  const isDateEndUnavailable = isRouteUnavailable || !form.dateStart;

  const isDateStartDisabled = (formattedDay?: string) => {
    if (!formattedDay) return true;
    return isRouteUnavailable;
  };

  const isDateEndDisabled = (formattedDay?: string) => {
    if (!formattedDay) return true;
    if (isDateEndUnavailable) return true;

    return formattedDay <= minDateEnd;
  };
  return {
    minDateEnd,
    setDurationMinutes,
    isDateStartDisabled,
    isDateEndDisabled,
  };
};
