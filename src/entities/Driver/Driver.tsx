import { DriverTabs } from "./ui/DriverTabs";
import { DriverFabric } from "./ui/DriverFabric";

export default function Driver() {
  return (
    <div className="flex justify-between w-full">
      <DriverTabs />

      <DriverFabric />
    </div>
  );
}
