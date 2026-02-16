import { startOfToday } from "date-fns";

export const formErrorWithDate = (dateStart: string, dateEnd: string) => {
  const today = startOfToday().getTime();
  if (!dateStart || !dateEnd) return "";

  if (dateStart === dateEnd) {
    return "Дата выгрузки не может быть равна дате загрузки";
  }

  if (today > new Date(dateStart).getTime()) {
    return "Дата загрузки не может быть раньше текущей даты";
  }

  if (today > new Date(dateEnd).getTime()) {
    return "Дата выгрузки не может быть раньше текущей даты";
  }

  if (new Date(dateStart).getTime() > new Date(dateEnd).getTime()) {
    return "Дата выгрузки не может быть раньше даты загрузки";
  }

  return "";
};
