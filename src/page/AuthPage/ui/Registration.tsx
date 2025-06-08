"use client";

import { PasswordInput, UiInput } from "@/shared";
import { UiButton, UiCheckBox } from "@/shared";
import { useRegistration } from "../model/useRegistation";

export default function Registration() {
  const {
    formData,
    isError,
    handleChangeRegistrationFormData,
    dataCompany,
    handleCheckedChange,
    isChecked,
    handleCreateUser,
    isErrorPassword,
    setIsErrorPassword,
  } = useRegistration();

  return (
    <section>
      <div className="flex flex-col gap-[10px]">
        <UiInput
          idInput="surname"
          label="Фамилия"
          placeholder="Введите фамилию"
          borderColor="lightGrey"
          name="surname"
          value={formData.surname}
          onChange={handleChangeRegistrationFormData}
        />

        <UiInput
          idInput="name"
          label="Имя"
          borderColor="lightGrey"
          placeholder="Введите имя"
          value={formData.name}
          name="name"
          onChange={handleChangeRegistrationFormData}
        />

        <UiInput
          idInput="username"
          label="Username"
          borderColor="lightGrey"
          placeholder="Введите username"
          value={formData.userName}
          name="userName"
          onChange={handleChangeRegistrationFormData}
        />

        <div>
          <label htmlFor="company" className="font-medium mb-[5px] text-[15px]">
            Выберите компанию
          </label>

          <select
            id="company"
            className="w-full h-[40px] px-[8px] text-[15px] rounded-[10px] border-2 border-[#d6d6d6] appearance-none"
            value={formData.company}
            name="company"
            onChange={(e) => {
              const selectedCompany = dataCompany.data.find(
                (company) => company.company_name === e.target.value
              );
              handleChangeRegistrationFormData(e, selectedCompany);
            }}
          >
            <option value="" disabled>
              Выберите компанию
            </option>

            {dataCompany.data.map((company) => (
              <option value={company.company_name} key={company.company_id}>
                {company.company_name}
              </option>
            ))}
          </select>
        </div>

        <PasswordInput
          idInput="password"
          label="Пароль"
          placeholder="Введите пароль"
          value={formData.password}
          name="password"
          onChange={(e) => {
            handleChangeRegistrationFormData(e);
            setIsErrorPassword(false);
          }}
        />

        <PasswordInput
          idInput="confirmationPassword"
          label="Подтверждения пароля"
          placeholder="Подтверждения пароля"
          value={formData.confirmationPassword}
          name="confirmationPassword"
          onChange={handleChangeRegistrationFormData}
        />

        {isErrorPassword && (
          <span className="text-[14px] text-rose-500 font-bold">
            Не валидный пароль
          </span>
        )}

        {isError && (
          <span className="text-[14px] text-rose-500 font-bold">
            Пароли не совпадают
          </span>
        )}

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

      <UiButton
        onClick={handleCreateUser}
        disabled={
          !formData.company ||
          !formData.name ||
          !formData.surname ||
          !formData.userName ||
          !formData.role_id ||
          !formData.password ||
          !formData.confirmationPassword
        }
        type="button"
        sizeButton="full"
        textButton="Зарегистрироваться"
        sizesText="text-[16px]"
        className="h-[43px]"
        rounded="rounded-[10px]"
      />
    </section>
  );
}
