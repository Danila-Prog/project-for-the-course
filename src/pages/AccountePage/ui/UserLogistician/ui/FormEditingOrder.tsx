import { InputDropDown } from "@/shared";
import { UiModal } from "@/shared";
import { FormEvent, useState } from "react";

export default function FormEditingOrder({
  driverId,
  modalFormEditingOrder,
  handleCloseModalFormEditingOrder,
}: {
  driverId: number;
  modalFormEditingOrder: boolean;
  handleCloseModalFormEditingOrder: () => void;
}) {
  const [selectedNewAddressSupply, setSelectedNewAddressSupply] = useState<
    string | null
  >("Самара");

  const [selectedNewAddressDischarge, setSelectedNewAddressDischarge] =
    useState<string | null>("");

  const fetchingUpdateRoute = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/routes", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          driver_id: Number(driverId),
          start_point: selectedNewAddressSupply,
          end_point: selectedNewAddressDischarge,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await response.json();
      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <UiModal
      isOpen={modalFormEditingOrder}
      onClose={handleCloseModalFormEditingOrder}
    >
      <form method="PUT" onSubmit={fetchingUpdateRoute}>
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
