import { ReactNode } from "react";

export interface IRouteItem {
  visible: boolean;
  handleVisible?: () => void;
  routeName: string;
  routeFrom: string;
  routeBefore: string;
}
export type TRouteButton = Pick<
  IRouteItem,
  "visible" | "handleVisible" | "routeName"
>;
export type TRouteMain = Pick<IRouteItem, "routeFrom" | "routeBefore">;

export interface IRouteItemLayout extends Pick<IRouteItem, "visible"> {
  routeButton: ReactNode;
  routeMain: ReactNode;
}
