import { TRouteButton } from "../model/types";

export default function RouteItemButton({
  setVisible,
  routeName,
}: TRouteButton) {
  const handleVisible = () => setVisible((visib) => !visib);

  return (
    <button onClick={handleVisible} className={"h-[45px] font-medium"}>
      {routeName}
    </button>
  );
}
