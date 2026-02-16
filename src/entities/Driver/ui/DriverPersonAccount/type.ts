import { ComponentProps, ComponentType } from "react";


export type CurrentFieldComponent = ComponentType<
  Pick<ComponentProps<"select">, "value" | "onChange">
>;
