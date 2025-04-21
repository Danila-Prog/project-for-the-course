import { UiModal } from "@/shared";

export default function ModalDeleteOrder({
  modalDeleteOrder,
  handleCloseModalDeleteOrder,
}: {
  modalDeleteOrder: boolean;
  handleCloseModalDeleteOrder: () => void;
}) {
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
        <button className="w-full h-[50px] rounded-[25px] bg-red-700 transition hover:bg-red-800 text-white text-[20px] font-medium mt-[12px]">
          Удалить
        </button>
      </UiModal.Main>
    </UiModal>
  );
}
