import { List } from "@/shared";
import { LogisticianCardFabric } from "./LogisticianCardFabric";
import { useDI } from "@/shared/lib/di";
import { useAsync } from "@/shared/api/useAsync";
import { CurrentTabLogistician, Filters } from "../lib/types";
import { StateSetter } from "@/shared/types";

interface Props {
  filters: Filters;
  isDeleteOrder: boolean;
  isEditOrder: boolean;
  currentTab: CurrentTabLogistician;
  setSelectedDriverId: StateSetter<number | null>;
  onFormDeleteOrder: () => void;
  onFormEditingOrder: () => void;
  onFormOrder: () => void;
}

export const LogisticianListCard = ({
  filters,
  isDeleteOrder,
  isEditOrder,
  currentTab,
  onFormDeleteOrder,
  onFormEditingOrder,
  onFormOrder,
  setSelectedDriverId,
}: Props) => {
  const { driverService } = useDI();

  const { data: filteredDrivers } = useAsync(
    () => driverService.getFilteredDrivers(filters),
    [filters, isDeleteOrder, isEditOrder],
  );

  if (!filteredDrivers) return;

  const filteredAndSortedDrivers = driverService.getActiveDrivers(
    filteredDrivers,
    currentTab === "activeDrivers",
  );

  return (
    <List
      className="grid gap-[25px]"
      entity={filteredAndSortedDrivers ?? []}
      idKey="driverId"
      renderCard={(driver) => (
        <LogisticianCardFabric
          key={driver.driverId}
          driver={driver}
          setSelectedDriverId={setSelectedDriverId}
          toggleFormDeleteOrder={onFormDeleteOrder}
          toggleFormEditingOrder={onFormEditingOrder}
          toggleFormOrder={onFormOrder}
          currentTab={currentTab}
        />
      )}
    />
  );
};
