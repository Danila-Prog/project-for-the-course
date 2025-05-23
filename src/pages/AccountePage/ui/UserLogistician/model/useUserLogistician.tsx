import { useState } from "react";

export default function useUserLogistician() {
  const [activeDriver, setActiveDriver] = useState<boolean>(false);

  const handleActiveDriver = (typeButton: string) => {
    if (typeButton === "active") {
      setActiveDriver(true);
    } else {
      setActiveDriver(false);
    }
  };

  return {
    activeDriver,
    handleActiveDriver,
  };
}
