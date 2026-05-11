import { Route } from "@/entities/Route/model/types";
import { formatDate } from "@/shared/lib";
import { LuMapPin } from "react-icons/lu";

export const RouteItemCard = ({
  startPoint,
  endPoint,
  dateEnd,
  dateStart,
}: Pick<Route, "startPoint" | "endPoint" | "dateEnd" | "dateStart">) => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex gap-1.5 items-center">
        <LuMapPin className="text-primary-gray flex flex-shrink-0" size={25} />
        <div>
          <span className="font-medium text-sm xl:text-base block">
            {startPoint}{" "}
          </span>
          <span className="text-primary-gray block text-sm xl:text-base font-medium">
            {formatDate(dateStart ?? "", "normal")}
          </span>
        </div>
      </div>

      <div className="flex gap-1.5 items-center">
        <LuMapPin
          className="text-secondary-green flex flex-shrink-0"
          size={25}
        />
        <div>
          <span className="font-medium text-sm xl:text-base block">
            {endPoint}{" "}
          </span>

          <span className="text-primary-gray block text-sm xl:text-base font-medium">
            {formatDate(dateEnd ?? "", "normal")}
          </span>
        </div>
      </div>
    </section>
  );
};
