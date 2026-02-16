import { UiModal } from "../UiModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteModalWrapper = ({ isOpen, onClose, onDelete }: Props) => {
  return (
    <UiModal isOpen={isOpen} onClose={onClose}>
      <UiModal.Header className="mb-[10px]" onClose={onClose}>
        Вы уверенны?
      </UiModal.Header>

      <UiModal.Main className="flex gap-[15px]">
        <button
          onClick={onClose}
          className="w-full h-[50px] rounded-[25px] bg-button-grey transition hover:bg-[#464646] text-white text-[20px] font-medium mt-[12px]"
        >
          Отменить
        </button>

        <button
          className="w-full h-[50px] rounded-[25px] bg-red-700 transition hover:bg-red-800 text-white text-[20px] font-medium mt-[12px]"
          onClick={() => {
            onDelete();
            onClose();
          }}
        >
          Удалить
        </button>
      </UiModal.Main>
    </UiModal>
  );
};
