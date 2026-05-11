import { List, Maybe } from "@/shared";
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
      <Maybe
        conditionFallback={!accessDriversAggregates.length}
        fallback={
          <span className="text-lg md:text-2xl text-center block">
            Водителей нету(
          </span>
        }
      >
        <List
          className="grid grid-cols-1 md:grid-cols-2 gap-5 min-[1700px]:grid-cols-3"
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
      </Maybe>
    );
  }

  if (currentTab === "activeDrivers") {
    return (
      <Maybe
        conditionFallback={!activeDriversAggregates.length}
        fallback={
          <span className="text-lg md:text-2xl text-center block">
            Активных водителей нету(
          </span>
        }
      >
        <List
          className="grid grid-cols-1 md:grid-cols-2 gap-5 min-[1700px]:grid-cols-3"
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
      </Maybe>
    );
  }

  if (currentTab === "historyDrivers") {
    return (
      <Maybe
        conditionFallback={!filteredHistoryRoutes.length}
        fallback={
          <span className="text-lg md:text-2xl text-center block">
            Истории заказов водителей нету(
          </span>
        }
      >
        <List
          className="grid grid-cols-1 md:grid-cols-2 gap-5 min-[1700px]:grid-cols-3"
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
      </Maybe>
    );
  }

  return null;
};
