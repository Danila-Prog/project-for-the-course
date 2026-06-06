"use client";

import { PasswordInput, UiInput, UiButton, UiCheckBox } from "@/shared";
import { useRegistrationTab, useRegistration } from "../model";

export const RegistrationTab = () => {
  const {
    formData,
    experienceYears,
    handleUpdateExperienceYears,
    isError,
    handleUpdateForm,
    handleRoleChange,
    handleSubmit,
    isErrorPassword,
    resetForm,
  } = useRegistration();

  const createUser = useRegistrationTab(formData, Number(experienceYears));

  const isDisabled =
    !formData.name ||
    !formData.surname ||
    !formData.username ||
    !formData.roleId ||
    !formData.password ||
    !formData.confirmationPassword;

  return (
    <form
      onSubmit={(e) =>
        handleSubmit(e, () => {
          createUser();
          resetForm();
        })
      }
      className="w-[95%] sm:w-[80%] md:w-[70%] lg:w-[50%] mx-auto bg-white px-6 py-3 sm:px-8 sm:py-5 lg:px-10 lg:py-7 rounded-xl mb-5"
    >
      <div className="flex flex-col gap-4 md:gap-5 mb-5">
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
          <span className="text-xs lg:text-sm min-[1750px]:text-base text-rose-500 font-medium">
            Не валидный пароль
          </span>
        )}

        {isError && (
          <span className="text-xs lg:text-sm min-[1750px]:text-base text-rose-500 font-medium">
            Пароли не совпадают
          </span>
        )}

        <div className="flex flex-col gap-[5px]">
          <span className="block text-[0.65rem] sm:text-xs min-[1750px]:text-base font-medium mb-1 md:mb-2.5 text-primary-gray">
            Роль
          </span>

          <div className="flex">
            <div className="flex gap-2.5 items-center mr-5">
              <UiCheckBox
                idInput="input-driver"
                checked={formData.roleId === 1}
                value="driver"
                onChange={() => handleRoleChange("driver")}
              />

              <label
                htmlFor="input-driver"
                className="text-xs sm:text-sm min-[1750px]:text-lg font-medium"
              >
                Водитель
              </label>
            </div>

            <div className="flex gap-2.5 items-center">
              <UiCheckBox
                idInput="input-logic"
                checked={formData.roleId === 2}
                value="logist"
                onChange={() => handleRoleChange("logist")}
              />

              <label
                htmlFor="input-logic"
                className="text-xs sm:text-sm min-[1750px]:text-lg font-medium text-accent-black"
              >
                Логист
              </label>
            </div>
          </div>
        </div>

        {formData.roleId === 1 && (
          <UiInput
            id="weightFormOrder"
            borderColor="lightGrey"
            type="number"
            label="Стаж"
            min={0}
            max={100}
            step={0.1}
            value={experienceYears}
            onChange={(e) => {
              const v = e.target.value;
              handleUpdateExperienceYears(v === "0" ? v : v.replace(/^0+/, ""));
            }}
          />
        )}
      </div>

      <UiButton
        disabled={isDisabled}
        sizeButton="full"
        textButton="Зарегистрировать"
        sizesText="text-sm sm:text-base min-[1750px]:text-2xl"
        rounded="rounded-xl"
        className="py-2 min-[1750px]:py-3 bg-accent-green text-primary-white hover:scale-[1.02] transition mt-2 lg:mt-3 min-[1750px]:mt-4"
      />
    </form>
  );
};
