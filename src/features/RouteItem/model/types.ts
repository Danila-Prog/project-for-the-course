import { ReactNode } from "react";

export interface IRouteItem {
  routeId?: number;
  visible: boolean;
  handleVisible?: () => void;
  isDisabled?: boolean;
  setActiveRouteId?: (id: number | null) => void;
  routeFrom: string;
  routeBefore: string;
}
export type TRouteButton = IRouteItem;
export type TRouteMain = Pick<
  IRouteItem,
  "routeId" | "routeFrom" | "routeBefore" | "setActiveRouteId" | "isDisabled"
>;

export interface IRouteItemLayout extends Pick<IRouteItem, "visible"> {
  routeButton: ReactNode;
  routeMain: ReactNode;
}
