import { UiModal } from "@/shared";
import { useFetch } from "@/shared/api/useFetch";

export default function ModalDeleteOrder({
  driverId,
  modalDeleteOrder,
  handleCloseModalDeleteOrder,
}: {
  driverId: number;
  modalDeleteOrder: boolean;
  handleCloseModalDeleteOrder: () => void;
}) {
  const { dataRoutes } = useFetch();

  const currentRouter = dataRoutes.data.find(
    (route) => route.driver_id === driverId
  );
  const updateDriverStatus = async () => {
    const response = await fetch("http://localhost:8080/api/drivers", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        driver_id: driverId,
        status_driver_id: 1,
      }),
    });

    const data = await response.json();
    return data;
  };
  const deleteRoutes = async () => {
    const response = await fetch(
      `http://localhost:8080/api/routes/${currentRouter?.route_id}`,
      {
        method: "DELETE",
      }
    );
    return response;
  };

  const deleteRoutesForUser = () => {
    updateDriverStatus();
    deleteRoutes();
    window.location.reload();
  };
  return (
    <UiModal isOpen={modalDeleteOrder} onClose={handleCloseModalDeleteOrder}>
      <UiModal.Header className="mb-[10px]">Вы уверенны?</UiModal.Header>

      <UiModal.Main className="flex gap-[15px]">
        <button
          onClick={handleCloseModalDeleteOrder}
          className="w-full h-[50px] rounded-[25px] bg-button-grey transition hover:bg-[#464646] text-white text-[20px] font-medium mt-[12px]"
        >
          Отменить
        </button>
        <button
          className="w-full h-[50px] rounded-[25px] bg-red-700 transition hover:bg-red-800 text-white text-[20px] font-medium mt-[12px]"
          onClick={deleteRoutesForUser}
        >
          Удалить
        </button>
      </UiModal.Main>
    </UiModal>
  );
}
