import { Route } from "@/entities/Route/model/types";
import { formatDate } from "@/shared/lib";

export const RouteItemCard = ({
  startPoint,
  endPoint,
  dateEnd,
  dateStart,
}: Pick<Route, "startPoint" | "endPoint" | "dateEnd" | "dateStart">) => {
  return (
    <>
      <span>
        <span className="font-semibold">Точка от:</span> {startPoint}
      </span>

      <span>
        <span className="font-semibold">Точка до:</span> {endPoint}
      </span>

      <span>
        <span className="font-semibold">Дата:</span>{" "}
        {`${formatDate(dateStart, "normal")} — ${formatDate(dateEnd, "normal")}`}
      </span>
    </>
  );
};
