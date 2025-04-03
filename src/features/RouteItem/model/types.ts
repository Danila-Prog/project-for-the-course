import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IRouteItem {
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  routeName: string;
  routeFrom: string;
  routeBefore: string;
  travelTime: string;
}
export type TRouteButton = Pick<
  IRouteItem,
  "visible" | "setVisible" | "routeName"
>;
export type TRouteMain = Pick<
  IRouteItem,
  "routeFrom" | "routeBefore" | "travelTime"
>;

export interface IRouteItemLayout extends Pick<IRouteItem, "visible"> {
  routeButton: ReactNode;
  routeMain: ReactNode;
}
