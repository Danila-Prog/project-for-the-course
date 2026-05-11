import { PropsWithChildren, ReactElement } from "react";

interface Props {
  conditionFallback: boolean;
  fallback: ReactElement;
}
export const Maybe = ({
  children,
  conditionFallback,
  fallback,
}: PropsWithChildren<Props>) => {
  return conditionFallback ? fallback : children;
};
