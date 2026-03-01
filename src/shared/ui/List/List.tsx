import { ComponentProps, ReactElement } from "react";

type Props<T> = {
  entity: T[];
  renderCard: (item: T) => ReactElement;
  keyExtractor: (item: T) => string | number;
} & ComponentProps<"ul">;

export const List = <T,>({
  entity,
  renderCard,
  keyExtractor,
  ...rest
}: Props<T>) => {
  return (
    <ul {...rest}>
      {entity.map((item) => (
        <li key={keyExtractor(item)}>{renderCard(item)}</li>
      ))}
    </ul>
  );
};
