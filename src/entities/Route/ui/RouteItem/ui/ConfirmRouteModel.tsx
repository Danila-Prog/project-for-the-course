import { UploadPhoto } from "@/features/UploadPhoto/UploadPhoto";
import { UiModal } from "@/shared";
interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export const ConfirmRouteModel = ({ isOpen, onClose }: Props) => {
  return (
    <UiModal isOpen={isOpen} onClose={onClose}>
      <UiModal.Header onClose={onClose}>
        Подтвердите окончание маршрута
      </UiModal.Header>

      <UiModal.Main className="mt-4">
        <UploadPhoto onSubmit={() => {}} />
      </UiModal.Main>
    </UiModal>
  );
};
