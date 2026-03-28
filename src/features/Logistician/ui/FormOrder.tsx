import { Calendar, InputDropDown, SelectCar, UiInput, UiModal } from "@/shared";
import { useFormOrder } from "../model";
import { FormEvent } from "react";
import { RouteDurationLoader } from "@/features/Route/ui/RouteDurationLoader";

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
  const {
    form,
    errorDate,
    handleSubmit,
    isValid,
    updateFieldFunc,
    isDuplicateAddress,
    reset,
    setDurationMinutes,
    minDateEnd,
  } = useFormOrder(driverId, userId);

  const handleCreateSubmit = (e: FormEvent) => {
    handleSubmit(e);
    onClose();
  };

  return (
    <>
      <UiModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          reset();
        }}
        classNameContent="overflow-y-scroll h-[80vh]"
      >
        <form method="POST" onSubmit={handleCreateSubmit}>
          <UiModal.Header
            className="mb-[10px]"
            onClose={() => {
              onClose();
              reset();
            }}
          >
            Форма заказов
          </UiModal.Header>

          <UiModal.Main className="grid gap-5">
            <section className="">
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
                classNameContainer="mt-5 mb-2"
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

              {isDuplicateAddress && (
                <span className="text-[14px] text-rose-500 font-bold">
                  Адреса повторяются
                </span>
              )}
            </section>

            <section>
              <label
                htmlFor="weightFormOrder"
                className="block font-medium mb-[5px] text-[17px]"
              >
                Масса груза (т.)
              </label>

              <UiInput
                id="weightFormOrder"
                sizeInput="lg"
                borderColor="lightGrey"
                type="number"
                value={form.weight}
                onChange={(e) => {
                  const v = e.target.value;
                  updateFieldFunc("weight", v === "" ? "" : Number(v));
                }}
              />
            </section>

            <section>
              <label className="block font-medium mb-[5px] text-[17px]">
                Доступные автомобили
              </label>

              <SelectCar
                isDisabled={!form.weight}
                weight={form.weight ?? 0}
                value={form.carId}
                setter={(val) => updateFieldFunc("carId", val)}
              />
            </section>

            <section>
              <label className="block font-medium mb-[5px] text-[17px]">
                Дата загрузки
              </label>
              <Calendar
                currDate={form.dateStart}
                setter={(val) => updateFieldFunc("dateStart", val)}
                disabledCondition={(formattedDay) => {
                  if (
                    !form.start ||
                    !form.end ||
                    isDuplicateAddress ||
                    !formattedDay
                  )
                    return true;
                  return false;
                }}
              />
            </section>

            <section>
              <label className="block font-medium mb-[5px] text-[17px]">
                Дата выгрузки
              </label>

              <Calendar
                currDate={form.dateEnd}
                setter={(val) => updateFieldFunc("dateEnd", val)}
                disabledCondition={(formattedDay) => {
                  if (
                    !form.dateStart ||
                    !form.start ||
                    !form.end ||
                    !formattedDay ||
                    isDuplicateAddress
                  )
                    return true;
                  return formattedDay <= minDateEnd;
                }}
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

      <RouteDurationLoader
        startPoint={form.start}
        endPoint={form.end}
        onChange={setDurationMinutes}
      />
    </>
  );
};
