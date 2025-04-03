import { TRouteButton } from "../model/types";

export default function RouteItemButton({
  handleVisible,
  routeName,
}: TRouteButton) {
  return (
    <button onClick={handleVisible} className={"h-[45px] font-medium"}>
      {routeName}
    </button>
  );
}
