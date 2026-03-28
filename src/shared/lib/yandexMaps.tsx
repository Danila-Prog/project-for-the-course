"use client";

import { PropsWithChildren } from "react";
import { YMaps } from "react-yandex-maps";

export function YandexMapsProvider({ children }: PropsWithChildren) {
  return (
    <YMaps query={{ apikey: "cbc6f517-56a2-455d-b68b-aed0465d40d0" }}>
      {children}
    </YMaps>
  );
}
