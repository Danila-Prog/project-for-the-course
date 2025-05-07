import { InputDropDown } from "@/shared";
import { UiModal } from "@/shared";
import { useState } from "react";

export default function FormEditingOrder({
  modalFormEditingOrder,
  handleCloseModalFormEditingOrder,
}: {
  modalFormEditingOrder: boolean;
  handleCloseModalFormEditingOrder: () => void;
}) {
  const [selectedNewAddressSupply, setSelectedNewAddressSupply] = useState<
    string | null
  >("Самара");

  const [selectedNewAddressDischarge, setSelectedNewAddressDischarge] =
    useState<string | null>("");

  console.log(
    `selectedNewAddressSupply: ${selectedNewAddressSupply}, selectedNewAddressDischarge: ${selectedNewAddressDischarge}`
  );

  return (
    <UiModal
      isOpen={modalFormEditingOrder}
      onClose={handleCloseModalFormEditingOrder}
    >
      <form action="">
        <UiModal.Header className="mb-[10px]">
          Форма редактирования заказов
        </UiModal.Header>

        <UiModal.Main className="grid gap-[15px]">
          <InputDropDown
            idInputDropDown="editing_start_location"
            setSelectedOption={setSelectedNewAddressSupply}
            placeholder="Введите новый адрес подачи"
            label={
              <label
                className="font-medium mb-[8px] text-[17px]"
                htmlFor="editing_start_location"
              >
                Новый адрес погрузки
              </label>
            }
          />

          <InputDropDown
            idInputDropDown="editing_end_location"
            setSelectedOption={setSelectedNewAddressDischarge}
            placeholder="Введите новый адрес выгрузки"
            label={
              <label
                className="font-medium mb-[8px] text-[17px]"
                htmlFor="editing_end_location"
              >
                Новый адрес выгрузки
              </label>
            }
          />
        </UiModal.Main>

        <UiModal.Footer className="flex justify-center mt-[30px]">
          <button className="w-[300px] h-[50px] px-[16px] rounded-[25px] bg-orange-700 transition hover:bg-orange-800 text-white text-[20px] font-medium mt-[12px]">
            Редактировать заказ
          </button>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
