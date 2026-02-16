import { format } from "date-fns";

export const formatDate = (
  date: Date | string,
  formatPattern: "normal" | "sql",
) => {
  if (!date) {
    console.warn("Дата не предоставлена или невалидна");
    return;
  }

  const completeDate = typeof date === "string" ? new Date(date) : date;

  if (isNaN(completeDate.getTime())) {
    console.warn("Получена невалидная дата для форматирования:", date);
    return;
  }

  if (formatPattern === "normal") {
    return format(completeDate, "dd.MM.yyyy");
  }

  if (formatPattern === "sql") {
    return format(completeDate, "yyyy-MM-dd");
  }
};
