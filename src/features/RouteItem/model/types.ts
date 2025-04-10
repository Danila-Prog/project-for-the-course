import { ReactNode } from "react";

export interface IRouteItem {
  visible: boolean;
  handleVisible?: () => void;
  routeFrom: string;
  routeBefore: string;
}
export type TRouteButton = IRouteItem;
export type TRouteMain = Pick<IRouteItem, "routeFrom" | "routeBefore">;

export interface IRouteItemLayout extends Pick<IRouteItem, "visible"> {
  routeButton: ReactNode;
  routeMain: ReactNode;
}
