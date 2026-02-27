import { Calendar, InputDropDown, SelectVehicles, UiModal } from "@/shared";
import { useFormOrder } from "../model";
import { FormEvent } from "react";

export const FormOrder = ({
  driverId,
  userId,
  isOpen,
  onClose,
}: {
  driverId: number;
  userId: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { form, errorDate, handleSubmit, isValid, updateFieldFunc } =
    useFormOrder(driverId, userId);

  const handleCreateSubmit = (e: FormEvent) => {
    handleSubmit(e);
    onClose();
  };

  return (
    <UiModal
      isOpen={isOpen}
      onClose={onClose}
      classNameContent="overflow-y-scroll h-[80vh]"
    >
      <form method="POST" onSubmit={handleCreateSubmit}>
        <UiModal.Header className="mb-[10px]" onClose={onClose}>
          Форма заказов
        </UiModal.Header>

        <UiModal.Main className="grid gap-5">
          <InputDropDown
            idInputDropDown="start_location"
            selectedOption={form.start}
            setSelectedOption={(val) => updateFieldFunc("start", val)}
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
            selectedOption={form.end}
            setSelectedOption={(val) => updateFieldFunc("end", val)}
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
            <label className="block font-medium mb-[5px] text-[17px]">
              Доступные автомобили
            </label>

            <SelectVehicles
              value={form.vehicleId}
              setter={(val) => updateFieldFunc("vehicleId", val)}
            />
          </section>

          <section>
            <label className="block font-medium mb-[5px] text-[17px]">
              Дата загрузки
            </label>
            <Calendar
              currDate={form.dateStart}
              setter={(val) => updateFieldFunc("dateStart", val)}
            />
          </section>

          <section>
            <label className="block font-medium mb-[5px] text-[17px]">
              Дата выгрузки
            </label>
            <Calendar
              currDate={form.dateEnd}
              setter={(val) => updateFieldFunc("dateEnd", val)}
            />
          </section>

          <span className="text-[14px] text-rose-500 font-bold">
            {errorDate}
          </span>
        </UiModal.Main>

        <UiModal.Footer className="flex justify-center mt-[30px]">
          <button
            type="submit"
            className="w-[250px] h-[50px] px-[16px] rounded-[25px] bg-button-grey transition hover:bg-[#464646] text-white text-[20px] font-medium mt-[12px] disabled:opacity-70"
            disabled={!isValid}
          >
            Отдать заказ
          </button>
        </UiModal.Footer>
      </form>
    </UiModal>
  );
};
