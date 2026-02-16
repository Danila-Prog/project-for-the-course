import { Route } from "@/entities/Route/model/types";
import { ReactNode } from "react";

export type TRouteButton = Omit<Route, "id" | "driverId"> & {
  handleVisible: () => void;
  visible: boolean;
};

export type TRouteMain = {
  localStatus?: number;
} & Omit<Route, "id" | "dateStart" | "dateEnd">;

export interface IRouteItemLayout {
  routeButton: ReactNode;
  routeMain: ReactNode;
  visible: boolean;
}
