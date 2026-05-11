import {
  Calendar,
  InputDropDown,
  SelectCar,
  UiButton,
  UiInput,
  UiModal,
} from "@/shared";
import { useFormOrder, useOrderDateConstraints } from "../model";
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
    handleSubmit,
    isValid,
    updateFieldFunc,
    isDuplicateAddress,
    isRouteUnavailable,
    reset,
    setForm,
  } = useFormOrder(driverId, userId);

  const { setDurationMinutes, isDateStartDisabled, isDateEndDisabled } =
    useOrderDateConstraints(form, setForm, isRouteUnavailable);

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <>
      <UiModal
        isOpen={isOpen}
        onClose={handleClose}
        classNameContent="overflow-y-scroll h-[80vh]"
      >
        <form method="POST" onSubmit={handleSubmit}>
          <UiModal.Header
            className="mb-4"
            onClose={() => {
              onClose();
              reset();
            }}
          >
            Форма заказов
          </UiModal.Header>

          <UiModal.Main className="grid gap-5">
            <section>
              <InputDropDown
                idInputDropDown="start_location"
                selectedOption={form.start}
                setSelectedOption={(val) => updateFieldFunc("start", val)}
                label="Адрес погрузки"
              />

              <InputDropDown
                idInputDropDown="end_location"
                classNameContainer="mt-5 mb-2"
                selectedOption={form.end}
                setSelectedOption={(val) => updateFieldFunc("end", val)}
                label="Адрес выгрузки"
              />

              {isDuplicateAddress && (
                <span className="text-[14px] text-rose-500 font-bold">
                  Адреса повторяются
                </span>
              )}
            </section>

            <UiInput
              id="weightFormOrder"
              borderColor="lightGrey"
              type="number"
              value={form.weight}
              label="Масса груза (т.)"
              onChange={(e) => {
                const v = e.target.value;

                updateFieldFunc("weight", v === "0" ? v : v.replace(/^0+/, ""));
              }}
            />

            <SelectCar
              isDisabled={!form.weight}
              weight={form.weight ?? 0}
              value={form.carId}
              setter={(val) => updateFieldFunc("carId", val)}
              label="Доступные автомобили"
            />

            <section>
              <label className="block font-medium mb-[5px] text-sm">
                Дата загрузки
              </label>

              <Calendar
                currDate={form.dateStart}
                setter={(val) => updateFieldFunc("dateStart", val)}
                disabledCondition={isDateStartDisabled}
              />
            </section>

            <section>
              <label className="block font-medium mb-[5px] text-sm">
                Дата выгрузки
              </label>

              <Calendar
                currDate={form.dateEnd}
                setter={(val) => updateFieldFunc("dateEnd", val)}
                disabledCondition={isDateEndDisabled}
              />
            </section>
          </UiModal.Main>

          <UiModal.Footer className="flex justify-center mt-[30px]">
            <UiButton
              disabled={!isValid}
              sizeButton="full"
              textButton="Отдать"
              sizesText="text-lg"
              rounded="rounded-xl"
              className="py-2 max-w-[80%] bg-accent-green text-primary-white hover:scale-[1.02] transition mt-3"
            />
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
