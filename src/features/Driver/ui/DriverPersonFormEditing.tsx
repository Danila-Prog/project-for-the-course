import { UiModal, UploadPhoto } from "@/shared";
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
  driverId: number;
  toggleIsEditPhoto: () => void;
}) {
  const { driverService } = useDI();

  const { mutate } = useMutation(
    (formData: FormData) => driverService.uploadDriverPhoto(driverId, formData),
    {
      onSuccess: () => {
        toggleIsEditPhoto();
        onClose();
      },
    },
  );

  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      width="w-[95%] md:w-[60%] lg:w-[40%]"
    >
      <UiModal.Header className="mb-2.5" onClose={onClose}>
        Редактирования фото
      </UiModal.Header>

      <UiModal.Main>
        <UploadPhoto
          onSubmit={async (selectedFile) => {
            const formData = new FormData();
            formData.append("profilePhoto", selectedFile);
            await mutate(formData);
          }}
          textConfirm="Сохранить фото"
          classNameConfirmButton="bg-orange-700 hover:bg-orange-800"
        />
      </UiModal.Main>
    </UiModal>
  );
}
