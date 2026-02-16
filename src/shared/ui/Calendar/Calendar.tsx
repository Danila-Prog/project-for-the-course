import { formatDate } from "@/shared/lib";
import { StateSetter } from "@/shared/types";
import clsx from "clsx";
import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameMonth,
  isToday,
  parse,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { ru } from "date-fns/locale";
import { useEffect, useState } from "react";

const DAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];

export const Calendar = ({
  currDate,
  setter,
}: {
  currDate: string;
  setter: StateSetter<string>;
}) => {
  const today = startOfToday();
  const [currMonth, setCurrMonth] = useState(() => format(today, "MMM-yyyy"));

  useEffect(() => {
    if (!currDate) return;

    const dateOnly = currDate.slice(0, 10);

    const parsedDate = parse(dateOnly, "yyyy-MM-dd", new Date());

    setCurrMonth(format(parsedDate, "MMM-yyyy"));
  }, [currDate]);

  const firstDayOfMonth = parse(currMonth, "MMM-yyyy", new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfWeek(firstDayOfMonth, { weekStartsOn: 1 }),
    end: endOfWeek(endOfMonth(firstDayOfMonth), { weekStartsOn: 1 }),
  });

  const getPrevMonth = () => {
    const firstDayOfPrevMonth = add(firstDayOfMonth, { months: -1 });
    setCurrMonth(format(firstDayOfPrevMonth, "MMM-yyyy"));
  };

  const getNextMonth = () => {
    const firstDayOfNextMonth = add(firstDayOfMonth, { months: 1 });
    setCurrMonth(format(firstDayOfNextMonth, "MMM-yyyy"));
  };

  return (
    <div className="p-3 w-full bg-white border rounded-lg shadow-sm">
      <div className="flex items-center justify-between mb-4 px-1">
        <h2 className="text-sm font-bold text-gray-700">
          {format(firstDayOfMonth, "LLLL yyyy", {
            locale: ru,
          })}
        </h2>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={getPrevMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            type="button"
            onClick={getNextMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((day) => (
          <div
            key={day}
            className="text-center text-[10px] font-medium text-gray-400 uppercase"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-1">
        {daysInMonth.map((day, idx) => {
          const isCurrentMonth = isSameMonth(day, firstDayOfMonth);

          return (
            <div key={idx} className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => {
                  setter(formatDate(day, "sql") as string);
                }}
                className={clsx(
                  formatDate(day, "sql") === currDate && "bg-gray-100",
                  !isCurrentMonth
                    ? "text-gray-300"
                    : "text-gray-700 font-medium",
                  isToday(day) ? "bg-red-700 !text-white" : "hover:bg-gray-100",

                  "h-7 w-7 text-xs flex items-center justify-center rounded-full transition-colors",
                )}
              >
                {format(day, "d")}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
