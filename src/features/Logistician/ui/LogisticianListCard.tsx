import { List } from "@/shared";
import { LogisticianCardFabric } from "./LogisticianCardFabric";
import { useDI } from "@/shared/lib/di";
import { useAsync } from "@/shared/api/useAsync";
import { CurrentTabLogistician, Filters } from "../lib/types";
import { useRenderForm } from "../model";

interface Props {
  filters: Filters;
  currentTab: CurrentTabLogistician;
}

export const LogisticianListCard = ({ filters, currentTab }: Props) => {
  const { driverService, routeService } = useDI();

  const { data: filteredDrivers } = useAsync(
    () => driverService.getFilteredDrivers(filters),
    [filters],
  );

  const { data: routes } = useAsync(() => routeService.getRoutes());

  const {
    formOrder,
    formEditingOrder,
    deleteOrder,
    setSelectedDriverId,
    setSelectedUserId,
    toggleFormDeleteOrder,
    toggleFormEditingOrder,
    toggleFormOrder,
  } = useRenderForm();

  if (!filteredDrivers) return null;

  const routesWhereStatus1 = routes?.filter(
    (route) => route.idStatusRoute === 1,
  );

  const route = new Map(
    routesWhereStatus1?.map((route) => [route.driverId, route]),
  );

  const filteredAndSortedDrivers = driverService.getActiveDrivers(
    filteredDrivers,
    currentTab === "activeDrivers",
  );

  return (
    <>
      <List
        className="grid gap-[25px]"
        entity={filteredAndSortedDrivers}
        idKey="driverId"
        renderCard={(driver) => (
          <LogisticianCardFabric
            key={driver.driverId}
            driver={driver}
            setSelectedDriverId={setSelectedDriverId}
            setSelectedUserId={setSelectedUserId}
            toggleFormDeleteOrder={toggleFormDeleteOrder}
            toggleFormEditingOrder={toggleFormEditingOrder}
            toggleFormOrder={toggleFormOrder}
            currentTab={currentTab}
            route={route?.get(driver.driverId)}
          />
        )}
      />

      {formOrder}

      {formEditingOrder}

      {deleteOrder}
    </>
  );
};
