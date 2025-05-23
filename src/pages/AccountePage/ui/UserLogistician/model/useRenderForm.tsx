import { useState } from "react";
import FormEditingOrder from "../ui/FormEditingOrder";
import FormOrder from "../ui/FormOrder";
import ModalDeleteOrder from "../ui/ModalDeleteOrder";

export default function useRenderForm() {
  const [modalFormOrder, setModaFormOrder] = useState<boolean>(false);
  const [modalFormEditingOrder, setModalFormEditingOrder] =
    useState<boolean>(false);
  const [modalDeleteOrder, setModalDeleteOrder] = useState<boolean>(false);
  const [selectedDriverId, setSelectedDriverId] = useState<number | null>(null);

  const toggleFormOrder = () => setModaFormOrder((modal) => !modal);

  const toggleFormEditingOrder = () =>
    setModalFormEditingOrder((modal) => !modal);

  const toggleFormDeleteOrder = () => setModalDeleteOrder((modal) => !modal);

  const formOrder = (
    <FormOrder
      driverId={selectedDriverId ?? 0}
      modalFormOrder={modalFormOrder}
      handleCloseModalFormOrder={toggleFormOrder}
    />
  );

  const formEditingOrder = (
    <FormEditingOrder
      driverId={selectedDriverId ?? 0}
      modalFormEditingOrder={modalFormEditingOrder}
      handleCloseModalFormEditingOrder={toggleFormEditingOrder}
    />
  );
  const deleteOrder = (
    <ModalDeleteOrder
      driverId={selectedDriverId ?? 0}
      modalDeleteOrder={modalDeleteOrder}
      handleCloseModalDeleteOrder={toggleFormDeleteOrder}
    />
  );

  return {
    formOrder,
    formEditingOrder,
    deleteOrder,
    setSelectedDriverId,
    toggleFormOrder,
    toggleFormEditingOrder,
    toggleFormDeleteOrder,
  };
}
