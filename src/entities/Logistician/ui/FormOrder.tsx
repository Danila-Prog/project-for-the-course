import { Calendar, InputDropDown } from "@/shared";
import { UiModal } from "@/shared";
import { FormEvent, useState } from "react";
import { formErrorWithDate } from "../lib/formErrorWithDate";
import { SelectVehicles } from "@/features";

export default function FormOrder({
  driverId,
  modalFormOrder,
  handleCloseModalFormOrder,
}: {
  driverId: number;
  modalFormOrder: boolean;
  handleCloseModalFormOrder: () => void;
}) {
  const [selectStartLocation, setSelectStartLocation] = useState("");
  const [selectEndLocation, setSelectEndLocation] = useState("");
  const [selectVehicle, setSelectVehicle] = useState(0);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const errorDate = formErrorWithDate(dateStart, dateEnd);

  const fetchingCreateRoute = async (e: FormEvent) => {
    e.preventDefault();

    if (!!errorDate) {
      return;
    }

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
          date_start: dateStart,
          date_end: dateEnd,
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
          updates: { status_driver_id: 2, vehicles_id: selectVehicle },
        }),
      });

      await response.json();

      // window.location.reload();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  };

  return (
    <UiModal
      isOpen={modalFormOrder}
      onClose={handleCloseModalFormOrder}
      classNameContent="overflow-y-scroll h-[80vh]"
    >
      <form method="POST" onSubmit={fetchingCreateRoute}>
        <UiModal.Header
          className="mb-[10px]"
          onClose={handleCloseModalFormOrder}
        >
          Форма заказов
        </UiModal.Header>

        <UiModal.Main className="grid gap-5">
          <InputDropDown
            idInputDropDown="start_location"
            setSelectedOption={setSelectStartLocation}
            placeholder="Введите адрес подачи"
            label={
              <label
                className="block font-medium mb-[5px] text-[17px]"
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
                className="block font-medium mb-[5px] text-[17px]"
                htmlFor="end_location"
              >
                Адрес выгрузки
              </label>
            }
          />

          <section>
            <label className="block font-medium mb-[5px] text-[17px] ">
              Доступные автомобили
            </label>

            <SelectVehicles value={selectVehicle} setter={setSelectVehicle} />
          </section>

          <section>
            <label className="block font-medium mb-[5px] text-[17px] ">
              Дата загрузки
            </label>
            <Calendar currDate={dateStart} setter={setDateStart} />
          </section>

          <section>
            <label className="block font-medium mb-[5px] text-[17px] ">
              Дата выгрузки
            </label>
            <Calendar currDate={dateEnd} setter={setDateEnd} />
          </section>

          <span className="text-[14px] text-rose-500 font-bold">
            {errorDate}
          </span>
        </UiModal.Main>

        <UiModal.Footer className="flex justify-center mt-[30px]">
          <button
            className="w-[250px] h-[50px] px-[16px] rounded-[25px] bg-button-grey transition hover:bg-[#464646] text-white text-[20px] font-medium mt-[12px] disabled:opacity-70"
            disabled={
              !selectStartLocation ||
              !selectEndLocation ||
              !dateStart ||
              !dateEnd ||
              !selectVehicle ||
              !!errorDate
            }
          >
            Отдать заказ
          </button>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
