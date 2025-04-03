import { IRouteItemLayout } from "../model/types";

export default function RouteItemLayout({
  routeButton,
  routeMain,
  visible,
}: IRouteItemLayout) {
  return (
    <div className="grid border-2 rounded-[7px]">
      {routeButton}

      {visible && <main className="px-[15px] pb-[25px]">{routeMain}</main>}
    </div>
  );
}
