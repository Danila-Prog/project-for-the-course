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
      width="w-[95%] md:w-[60%] lg:w-[40%]"
    >
      <UiModal.Header onClose={onClose}>
        Подтвердите окончание маршрута
      </UiModal.Header>

      <UiModal.Main className="mt-4">
        <UploadPhoto
          onSubmit={(selectedFile) => {
            handleSubmitConfirmRoute(selectedFile);
            onClose();
          }}
          textConfirm="Подтвердить"
          classNameConfirmButton="bg-green-700 hover:bg-green-800"
        />
      </UiModal.Main>
    </UiModal>
  );
};
