import { InputDropDown } from "@/features/InputDropDown";
import { UiModal } from "@/shared";
import { useState } from "react";

export default function FormOrder({
  modalFormOrder,
  handleCloseModalFormOrder,
}: {
  modalFormOrder: boolean;
  handleCloseModalFormOrder: () => void;
}) {
  const [selectStartLocation, setSelectStartLocation] = useState<string | null>(
    ""
  );
  const [selectEndLocation, setSelectEndLocation] = useState<string | null>("");

  return (
    <UiModal isOpen={modalFormOrder} onClose={handleCloseModalFormOrder}>
      <form action="">
        <UiModal.Header className="mb-[10px]">Форма заказов</UiModal.Header>

        <UiModal.Main className="grid gap-[15px]">
          <InputDropDown
            idInputDropDown="start_location"
            setSelectedOption={setSelectStartLocation}
            placeholder="Введите адрес подачи"
            label={
              <label
                className="font-medium mb-[8px] text-[17px]"
                htmlFor="start_location"
              >
                Адрес погрузки
              </label>
            }
          />

          <InputDropDown
            idInputDropDown="end_location"
            setSelectedOption={setSelectEndLocation}
            placeholder="Введите адрес выгрузки"
            label={
              <label
                className="font-medium mb-[8px] text-[17px]"
                htmlFor="end_location"
              >
                Адрес выгрузки
              </label>
            }
          />
        </UiModal.Main>

        <UiModal.Footer className="flex justify-center mt-[30px]">
          <button className="w-[250px] h-[50px] px-[16px] rounded-[25px] bg-button-grey transition hover:bg-[#464646] text-white text-[20px] font-medium mt-[12px]">
            Отдать заказ
          </button>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
