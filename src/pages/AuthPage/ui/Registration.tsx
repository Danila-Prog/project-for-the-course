import { LabeledInput } from "@/features/LabeledInput";
import { RouteButton, UiCheckBox } from "@/shared";
import { ChangeEvent, useState } from "react";

export default function Registration() {
  const [isChecked, setIsChecked] = useState({
    driver: false,
    logist: false,
  });

  const handleCheckedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    if (value === "driver") {
      setIsChecked({
        driver: checked,
        logist: false,
      });
    }

    if (value === "logist") {
      setIsChecked({
        driver: false,
        logist: checked,
      });
    }
  };
  return (
    <form>
      <div className="flex flex-col gap-[10px]">
        <LabeledInput
          idInput="lastname"
          label="Фамилия"
          placeholder="Введите фамилию"
        />

        <LabeledInput idInput="surname" label="Имя" placeholder="Введите имя" />

        <LabeledInput
          idInput="email"
          label="Email"
          placeholder="E-mail адрес"
        />

        <LabeledInput
          idInput="number_phone"
          label="Номер телефона"
          placeholder="Введите Номер телефона"
        />

        <LabeledInput idInput="password" label="Пароль" placeholder="Пароль" />

        <LabeledInput
          idInput="confirmation_password"
          label="Подтверждения пароля"
          placeholder="Подтверждения пароля"
        />

        <div className="flex flex-col gap-[5px]">
          <p className="text-[15px] font-medium">Ваша роль</p>

          <div className="flex mb-[25px]">
            <div className="flex gap-[5px] items-center mr-[20px] ">
              <UiCheckBox
                idInput="input-driver"
                checked={isChecked.driver}
                value="driver"
                onChange={handleCheckedChange}
              />

              <label htmlFor="input-driver" className="text-[17px] font-medium">
                Водитель
              </label>
            </div>

            <div className="flex gap-[8px] items-center">
              <UiCheckBox
                idInput="input-logic"
                checked={isChecked.logist}
                value="logist"
                onChange={handleCheckedChange}
              />
              <label htmlFor="input-logic" className="text-[17px] font-medium">
                Логист
              </label>
            </div>
          </div>
        </div>
      </div>

      <RouteButton
        path=""
        sizeButton="full"
        textButton="Зарегистрироваться"
        sizesText="text-[16px]"
        className="h-[43px]"
        rounded="rounded-[10px]"
      />
    </form>
  );
}
