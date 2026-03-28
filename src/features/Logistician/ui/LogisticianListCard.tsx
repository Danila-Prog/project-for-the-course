import { List } from "@/shared";
import { CurrentTabLogistician, Filters } from "../lib/types";
import { useLogisticianListViewModel, useRenderForm } from "../model";
import { CardHistoryRoutes } from "./CardHistoryRoutes";
import { CardAllDrivers } from "./CardAllDrivers";
import { CardActiveDrivers } from "./CardActiveDrivers";

interface Props {
  filters: Filters;
  currentTab: CurrentTabLogistician;
}

export const LogisticianListCard = ({ filters, currentTab }: Props) => {
  const {
    accessDriversAggregates,
    activeDriversAggregates,
    filteredHistoryRoutes,
  } = useLogisticianListViewModel(filters, currentTab);

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

  if (currentTab === "allDrivers") {
    return (
      <>
        <List
          className="grid grid-cols-2 gap-5"
          entity={accessDriversAggregates}
          keyExtractor={(accessDriver) => accessDriver.driver.driverId ?? 0}
          renderCard={(accessDriver) => (
            <CardAllDrivers
              driver={accessDriver.driver}
              setSelectedDriverId={setSelectedDriverId}
              setSelectedUserId={setSelectedUserId}
              toggleFormOrder={toggleFormOrder}
              user={accessDriver.user}
            />
          )}
        />

        {formOrder}
      </>
    );
  }

  if (currentTab === "activeDrivers") {
    return (
      <>
        <List
          className="grid gap-[25px]"
          entity={activeDriversAggregates}
          keyExtractor={(activeDriver) => activeDriver.driver.driverId}
          renderCard={(activeDriver) => (
            <CardActiveDrivers
              driver={activeDriver.driver}
              route={activeDriver.route}
              user={activeDriver.user}
              car={activeDriver.car}
              setSelectedDriverId={setSelectedDriverId}
              toggleDeleteOrder={toggleFormDeleteOrder}
              toggleEditOrder={toggleFormEditingOrder}
            />
          )}
        />

        {formEditingOrder}

        {deleteOrder}
      </>
    );
  }

  if (currentTab === "historyDrivers") {
    return (
      <List
        className="grid gap-[25px]"
        entity={filteredHistoryRoutes ?? []}
        keyExtractor={(historyRoute) => historyRoute.route.id}
        renderCard={(historyRoute) => (
          <CardHistoryRoutes
            driver={historyRoute.driver}
            route={historyRoute.route}
            user={historyRoute.user}
            car={historyRoute.car}
          />
        )}
      />
    );
  }

  return null;
};
