import { TRouteButton } from "../lib/types";
import { formatDate } from "@/shared/lib";

export default function RouteItemButton({
  handleVisible,
  startPoint,
  endPoint,
  dateEnd,
  dateStart,
}: TRouteButton) {
  return (
    <button
      onClick={handleVisible}
      className={
        "text-start py-[5px] px-[15px] font-medium text-[20px] flex flex-col gap-2"
      }
    >
      <span>
        <span className="font-semibold">Маршрут:</span>{" "}
        {`${startPoint} → ${endPoint}`}
      </span>
      <span>
        <span className="font-semibold">Дата:</span>{" "}
        {`${formatDate(dateStart, "normal")} — ${formatDate(dateEnd, "normal")}`}
      </span>
    </button>
  );
}
