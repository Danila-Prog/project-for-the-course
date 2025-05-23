import { Dispatch, ReactNode, SetStateAction } from "react";

export interface IRouteItem {
  routeId?: number;
  visible: boolean;
  handleVisible?: () => void;
  routeFrom: string;
  routeBefore: string;
}
export type TRouteButton = IRouteItem;
export type TRouteMain = {
  localStatus?: number;
  setLocalStatus: Dispatch<SetStateAction<number>>;
} & Pick<IRouteItem, "routeId" | "routeFrom" | "routeBefore">;

export interface IRouteItemLayout extends Pick<IRouteItem, "visible"> {
  routeButton: ReactNode;
  routeMain: ReactNode;
}
