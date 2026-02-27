"use client";

import { useState } from "react";
import { DeleteModalWrapper } from "@/shared";
import { useAsync } from "@/shared/api/useAsync";
import { useDI } from "@/shared/lib";
import { useMutation } from "@/shared/api/useMutation";
import { FormOrder } from "../ui/FormOrder";
import { FormEditingOrder } from "../ui/FormEditingOrder";

export const useRenderForm = () => {
  const [modalFormOrder, setModaFormOrder] = useState<boolean>(false);
  const [modalFormEditingOrder, setModalFormEditingOrder] =
    useState<boolean>(false);
  const [modalDeleteOrder, setModalDeleteOrder] = useState<boolean>(false);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { routeService } = useDI();

  const { data: route } = useAsync(
    () => routeService.getRouteByDriverId(selectedDriverId ?? 0),
    [selectedDriverId],
  );

  const { mutate: deleteRoutesForUser } = useMutation(() =>
    routeService.deleteRouteForDriver(selectedDriverId ?? 0, route?.id ?? 0, {
      status_driver_id: 1,
      vehicles_id: null,
    }),
  );

  const toggleFormOrder = () => setModaFormOrder((modal) => !modal);

  const toggleFormEditingOrder = () =>
    setModalFormEditingOrder((modal) => !modal);

  const toggleFormDeleteOrder = () => setModalDeleteOrder((modal) => !modal);

  const formOrder = (
    <FormOrder
      driverId={selectedDriverId ?? 0}
      userId={selectedUserId ?? 0}
      isOpen={modalFormOrder}
      onClose={toggleFormOrder}
    />
  );

  const formEditingOrder = (
    <FormEditingOrder
      driverId={selectedDriverId ?? 0}
      isOpen={modalFormEditingOrder}
      onClose={() => {
        toggleFormEditingOrder();
      }}
    />
  );

  const deleteOrder = (
    <DeleteModalWrapper
      isOpen={modalDeleteOrder}
      onClose={toggleFormDeleteOrder}
      onDelete={async () => {
        await deleteRoutesForUser();
        window.location.reload();
      }}
    />
  );

  return {
    formOrder,
    formEditingOrder,
    deleteOrder,
    setSelectedDriverId,
    setSelectedUserId,
    toggleFormOrder,
    toggleFormEditingOrder,
    toggleFormDeleteOrder,
  };
};
