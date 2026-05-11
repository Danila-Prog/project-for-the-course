import {
  Calendar,
  InputDropDown,
  SelectCar,
  UiButton,
  UiInput,
  UiModal,
} from "@/shared";
import { useFormEditingOrder, useOrderDateConstraints } from "../model";
import { RouteDurationLoader } from "@/features/Route/ui/RouteDurationLoader";

export const FormEditingOrder = ({
  driverId,
  isOpen,
  onClose,
}: {
  driverId: number;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const {
    form,
    selectVehicle,
    setSelectVehicle,
    updateFieldFunc,
    isDuplicateAddress,
    isValid,
    handleSubmitEditingOrder,
    setForm,
    isRouteUnavailable,
  } = useFormEditingOrder(driverId);

  const { setDurationMinutes, isDateStartDisabled, isDateEndDisabled } =
    useOrderDateConstraints(form, setForm, isRouteUnavailable);

  return (
    <>
      <UiModal
        isOpen={isOpen}
        onClose={onClose}
        classNameContent="overflow-y-scroll h-[80vh]"
      >
        <form method="PUT" onSubmit={handleSubmitEditingOrder}>
          <UiModal.Header className="mb-4" onClose={onClose}>
            Редактирование заказа
          </UiModal.Header>

          <UiModal.Main className="grid gap-5">
            <section>
              <InputDropDown
                selectedOption={form.selectedNewAddressSupply}
                idInputDropDown="editing_start_location"
                setSelectedOption={(val) =>
                  updateFieldFunc("selectedNewAddressSupply", val)
                }
                label="Новый адрес погрузки"
              />

              <InputDropDown
                selectedOption={form.selectedNewAddressDischarge}
                idInputDropDown="editing_end_location"
                classNameContainer="mt-5 mb-2"
                setSelectedOption={(val) =>
                  updateFieldFunc("selectedNewAddressDischarge", val)
                }
                label="Новый адрес выгрузки"
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
              label="Масса груза (т.)"
              value={form.weight}
              onChange={(e) => {
                const v = e.target.value;
                updateFieldFunc("weight", v === "0" ? v : v.replace(/^0+/, ""));
              }}
            />

            <SelectCar
              value={selectVehicle}
              setter={setSelectVehicle}
              weight={form.weight === "" ? 0 : form.weight}
              isDisabled={form.weight === ""}
              label="Доступные автомобили"
            />

            <section>
              <label className="block font-medium mb-[5px] text-sm ">
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
              disabled={!isValid || !isDuplicateAddress}
              sizeButton="full"
              textButton="Редактировать"
              sizesText="text-lg"
              rounded="rounded-xl"
              className="py-2 max-w-[80%] bg-orange-700 text-primary-white hover:scale-[1.02] transition mt-3"
            />
          </UiModal.Footer>
        </form>
      </UiModal>

      <RouteDurationLoader
        startPoint={form.selectedNewAddressSupply}
        endPoint={form.selectedNewAddressDischarge}
        onChange={setDurationMinutes}
      />
    </>
  );
};
