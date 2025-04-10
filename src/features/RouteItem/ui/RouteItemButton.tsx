import { TRouteButton } from "../model/types";

export default function RouteItemButton({
  handleVisible,
  routeFrom,
  routeBefore,
}: TRouteButton) {
  return (
    <button
      onClick={handleVisible}
      className={"h-[50px] font-medium text-[21px]"}
    >
      {`${routeFrom}—${routeBefore}`}
    </button>
  );
}
