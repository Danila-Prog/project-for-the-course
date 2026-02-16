import { ComponentProps, ReactElement } from "react";

type Props<T> = {
  entity: T[];
  renderCard: (item: T) => ReactElement;
  idKey: keyof T;
} & ComponentProps<"ul">;

export const List = <T,>({ entity, renderCard, idKey, ...rest }: Props<T>) => {
  return (
    <ul {...rest}>
      {entity.map((item) => (
        <li key={String(item[idKey])}>{renderCard(item)}</li>
      ))}
    </ul>
  );
};
