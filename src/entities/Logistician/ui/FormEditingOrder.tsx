import { Calendar, InputDropDown } from "@/shared";
import { UiModal } from "@/shared";
import { FormEvent, useEffect, useState } from "react";
import { formErrorWithDate } from "../lib/formErrorWithDate";
import { useAsync } from "@/shared/api/useAsync";
import { useDI } from "@/shared/lib/di";
import { SelectVehicles } from "@/features";
import { useMutation } from "@/shared/api/useMutation";

export default function FormEditingOrder({
  driverId,
  isOpen,
  onClose,
  onEdit,
}: {
  driverId: number;
  isOpen: boolean;
  onClose: () => void;
  onEdit: () => void;
}) {
  const { routeService, driverService } = useDI();

  const { data: route } = useAsync(
    () => routeService.getRouteByDriverId(driverId),
    [driverId],
  );

  const [selectedNewAddressSupply, setSelectedNewAddressSupply] = useState("");
  const [selectedNewAddressDischarge, setSelectedNewAddressDischarge] =
    useState("");
  const [selectVehicle, setSelectVehicle] = useState(0);
  const [dateStart, setDateStart] = useState("");
  const [dateEnd, setDateEnd] = useState("");

  const errorDate = formErrorWithDate(dateStart, dateEnd);

  useEffect(() => {
    setSelectedNewAddressSupply(route?.startPoint ?? "");
    setSelectedNewAddressDischarge(route?.endPoint ?? "");
    setDateStart(route?.dateStart.split("T")[0] ?? "");
    setDateEnd(route?.dateEnd.split("T")[0] ?? "");
  }, [route]);

  const updateRoute = useMutation(() =>
    routeService.updateRoute({
      driver_id: Number(driverId),
      start_point: selectedNewAddressSupply,
      end_point: selectedNewAddressDischarge,
      date_start: dateStart,
      date_end: dateEnd,
    }),
  );

  const updateVehicles = useMutation(() =>
    driverService.updateDriver(
      driverId,
      selectVehicle ? { vehicles_id: selectVehicle } : {},
    ),
  );

  const handleSubmitEditingOrder = (e: FormEvent) => {
    e.preventDefault();

    if (!!errorDate) return;

    updateRoute.mutate();

    if (selectVehicle) {
      updateVehicles.mutate();
    }

    onEdit();

    onClose();
  };

  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      classNameContent="overflow-y-scroll h-[80vh]"
    >
      <form method="PUT" onSubmit={handleSubmitEditingOrder}>
        <UiModal.Header className="mb-[10px]" onClose={onClose}>
          Редактирование заказа
        </UiModal.Header>

        <UiModal.Main className="grid gap-5">
          <InputDropDown
            selectedOption={selectedNewAddressSupply}
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
            selectedOption={selectedNewAddressDischarge}
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
            className="w-[300px] h-[50px] px-[16px] rounded-[25px] bg-orange-700 transition hover:bg-orange-800 text-white text-[20px] font-medium mt-[12px] disabled:opacity-70"
            disabled={
              !selectedNewAddressDischarge ||
              !selectedNewAddressSupply ||
              !dateStart ||
              !dateEnd ||
              !!errorDate
            }
          >
            Редактировать заказ
          </button>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
}
