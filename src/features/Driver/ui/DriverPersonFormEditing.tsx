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
      classNameContent="h-fit max-h-[95%] overflow-y-auto"
      width="w-[95%] sm:w-[60%] md:w-[50%] lg:w-[35%] xl:w-[30%]"
    >
      <UiModal.Header className="mb-6" onClose={onClose}>
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
        />
      </UiModal.Main>
    </UiModal>
  );
}
