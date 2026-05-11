import { UiModal, UploadPhoto } from "@/shared";
import { useConfirmRoute } from "../model/useConfirmRouteModel";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ConfirmRouteModel = ({ isOpen, onClose }: Props) => {
  const { handleSubmitConfirmRoute } = useConfirmRoute();

  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      classNameContent="h-fit max-h-[95%] overflow-y-auto"
      width="w-[95%] sm:w-[60%] md:w-[50%] lg:w-[35%] xl:w-[30%]"
    >
      <UiModal.Header onClose={onClose} className="mb-6">
        Завершить маршрут
      </UiModal.Header>

      <UiModal.Main>
        <UploadPhoto
          onSubmit={(selectedFile) => {
            handleSubmitConfirmRoute(selectedFile);
            onClose();
          }}
          textConfirm="Подтвердить"
        />
      </UiModal.Main>
    </UiModal>
  );
};
