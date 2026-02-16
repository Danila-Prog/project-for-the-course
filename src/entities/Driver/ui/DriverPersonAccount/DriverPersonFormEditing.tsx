import { UiModal } from "@/shared";
import { UploadPhoto } from "@/features/UploadPhoto/UploadPhoto";
import { useDI } from "@/shared/lib";
import { useMutation } from "@/shared/api/useMutation";

export default function DriverPersonFormEditing({
  isOpen,
  onClose,
  driverId,
  toggleIsEditPhoto,
}: {
  isOpen: boolean;
  onClose: () => void;
  driverId: string;
  toggleIsEditPhoto: () => void;
}) {
  const { driverService } = useDI();
  const { mutate } = useMutation(
    (formData: FormData) =>
      driverService.uploadDriverPhoto(Number(driverId), formData),
    {
      onSuccess: () => {
        toggleIsEditPhoto();
        onClose();
      },
    },
  );
  return (
    <UiModal isOpen={isOpen} onClose={onClose} width="w-[40%]">
      <UiModal.Header className="mb-[10px]" onClose={onClose}>
        Редактирования фото
      </UiModal.Header>

      <UiModal.Main className="w-[60%] mx-auto">
        <UploadPhoto
          onSubmit={async (selectedFile) => {
            const formData = new FormData();
            formData.append("profilePhoto", selectedFile);
            await mutate(formData);
          }}
        />
      </UiModal.Main>
    </UiModal>
  );
}
