type StatusKey = 1 | 2 | 3 | 4;
type StatusValue = "Доступен" | "Назначенный" | "Активный" | "Выполнен";

export const STATUS_DRIVER = {
  1: "Доступен",
  2: "Назначенный",
  3: "Активный",
  4: "Выполнен",
} as const satisfies Record<StatusKey, StatusValue>;
