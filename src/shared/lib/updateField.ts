import { StateSetter } from "../types";

export const updateField =
  <T, K extends keyof T>(
    setter: StateSetter<T>,
    conditionFunc?: (key: K) => void,
  ) =>
  (key: K, value: T[K]) => {
    if (conditionFunc) {
      conditionFunc(key);
    }

    setter((prev) => ({ ...prev, [key]: value }));
  };
