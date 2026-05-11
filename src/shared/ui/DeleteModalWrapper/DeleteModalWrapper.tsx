import { UiButton } from "../UiButton";
import { UiModal } from "../UiModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDelete: () => void;
}

export const DeleteModalWrapper = ({ isOpen, onClose, onDelete }: Props) => {
  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      width="sm:w-[60%] md:w-[50%] lg:w-[35%]"
    >
      <UiModal.Header className="mb-2" onClose={onClose}>
        Вы уверенны?
      </UiModal.Header>

      <UiModal.Main className="flex gap-[15px]">
        <UiButton
          textButton="Отменить"
          sizeButton="full"
          onClick={onClose}
          sizesText="text-sm md:text-base lg:text-lg min-[1750px]:text-xl"
          rounded="rounded-xl"
          className="py-1.5 lg:py-2 max-w-[80%] bg-primary-gray text-primary-white hover:scale-[1.02] transition mt-3"
        />
        <UiButton
          textButton="Удалить"
          sizeButton="full"
          onClick={() => {
            onDelete();
            onClose();
          }}
          sizesText="text-sm  md:text-base lg:text-lg min-[1750px]:text-xl"
          rounded="rounded-xl"
          className="py-1.5 lg:py-2 max-w-[80%] bg-red-700 text-primary-white hover:scale-[1.02] transition mt-3"
        />
      </UiModal.Main>
    </UiModal>
  );
};
