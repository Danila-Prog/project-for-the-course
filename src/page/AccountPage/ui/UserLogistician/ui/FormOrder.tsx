import { InputDropDown } from "@/shared";
import { UiModal } from "@/shared";
import { FormEvent, useState } from "react";

export default function FormOrder({
  driverId,
  modalFormOrder,
  handleCloseModalFormOrder,
}: {
  driverId: number;
  modalFormOrder: boolean;
  handleCloseModalFormOrder: () => void;
}) {
  const [selectStartLocation, setSelectStartLocation] = useState<string | null>(
    ""
  );
  const [selectEndLocation, setSelectEndLocation] = useState<string | null>("");
  const fetchingCreateRoute = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          driver_id: Number(driverId),
          start_point: selectStartLocation,
          end_point: selectEndLocation,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      await fetch("http://localhost:8080/api/drivers", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          driver_id: driverId,
          status_driver_id: 2,
        }),
      });

      await response.json();

      window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };
  return (
    <UiModal isOpen={modalFormOrder} onClose={handleCloseModalFormOrder}>
      <form method="POST" onSubmit={fetchingCreateRoute}>
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
