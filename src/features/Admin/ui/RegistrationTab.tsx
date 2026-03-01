"use client";

import { PasswordInput, UiInput, UiButton, UiCheckBox } from "@/shared";
import { useRegistrationTab, useRegistration } from "../model";

export const RegistrationTab = () => {
  const {
    formData,
    isError,
    handleUpdateForm,
    handleRoleChange,
    handleSubmit,
    isErrorPassword,
  } = useRegistration();

  const createUser = useRegistrationTab(formData);

  const disabledButton =
    !formData.name ||
    !formData.surname ||
    !formData.username ||
    !formData.roleId ||
    !formData.password ||
    !formData.confirmationPassword;

  return (
    <form
      onSubmit={(e) => handleSubmit(e, createUser)}
      className="w-full bg-white pt-5 px-5 md:px-10 pb-10 rounded-xl"
    >
      <div className="flex flex-col gap-[10px]">
        <UiInput
          idInput="surname"
          label="Фамилия"
          placeholder="Введите фамилию"
          borderColor="lightGrey"
          value={formData.surname}
          onChange={(e) => handleUpdateForm("surname", e.target.value)}
        />

        <UiInput
          idInput="name"
          label="Имя"
          borderColor="lightGrey"
          placeholder="Введите имя"
          value={formData.name}
          onChange={(e) => handleUpdateForm("name", e.target.value)}
        />

        <UiInput
          idInput="email"
          label="Email"
          type="email"
          borderColor="lightGrey"
          placeholder="Введите email"
          value={formData.email}
          onChange={(e) => handleUpdateForm("email", e.target.value)}
        />

        <UiInput
          idInput="username"
          label="Username"
          borderColor="lightGrey"
          placeholder="Введите username"
          autoComplete="off"
          value={formData.username}
          name="username"
          onChange={(e) => handleUpdateForm("username", e.target.value)}
        />

        <PasswordInput
          idInput="password"
          label="Пароль"
          placeholder="Введите пароль"
          autoComplete="new-password"
          value={formData.password}
          name="password"
          onChange={(e) => handleUpdateForm("password", e.target.value)}
        />

        <PasswordInput
          idInput="confirmationPassword"
          label="Подтверждения пароля"
          placeholder="Подтверждения пароля"
          autoComplete="new-password"
          value={formData.confirmationPassword}
          name="confirmationPassword"
          onChange={(e) =>
            handleUpdateForm("confirmationPassword", e.target.value)
          }
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
          <p className="text-[15px] font-medium">Роль</p>

          <div className="flex mb-[25px]">
            <div className="flex gap-[5px] items-center mr-[20px] ">
              <UiCheckBox
                idInput="input-driver"
                checked={formData.roleId === 1}
                value="driver"
                onChange={() => handleRoleChange("driver")}
              />

              <label htmlFor="input-driver" className="text-[17px] font-medium">
                Водитель
              </label>
            </div>

            <div className="flex gap-[8px] items-center">
              <UiCheckBox
                idInput="input-logic"
                checked={formData.roleId === 2}
                value="logist"
                onChange={() => handleRoleChange("logist")}
              />

              <label htmlFor="input-logic" className="text-[17px] font-medium">
                Логист
              </label>
            </div>
          </div>
        </div>
      </div>

      <UiButton
        disabled={disabledButton}
        sizeButton="full"
        textButton="Зарегистрировать"
        sizesText="text-[16px]"
        className="h-[43px]"
        rounded="rounded-[10px]"
      />
    </form>
  );
};
