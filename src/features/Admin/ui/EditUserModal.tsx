import {
  PasswordInput,
  UiButton,
  UiCheckBox,
  UiInput,
  UiModal,
} from "@/shared";
import { useRegistration } from "../model";
import { useLayoutEffect } from "react";
import { User } from "@/entities";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onUpdate: (variables: {
    id: number;
    updates: Omit<User, "userId">;
  }) => Promise<void | undefined>;
}

export const EditUserModal = ({ isOpen, onClose, user, onUpdate }: Props) => {
  const {
    formData,
    handleUpdateForm,
    handleRoleChange,
    handleSubmit,
    isError,
    isErrorPassword,
    resetForm,
  } = useRegistration();

  const isPasswordValid = isError && isErrorPassword;

  useLayoutEffect(() => {
    if (!user) return;

    handleUpdateForm("email", user.email);
    handleUpdateForm("name", user.name);
    handleUpdateForm("surname", user.surname);
    handleUpdateForm("username", user.username);

    if (user.roleId === 1) {
      handleRoleChange("driver");
    } else {
      handleRoleChange("logist");
    }
  }, [user]);

  return (
    <UiModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetForm();
      }}
      width="md:w-[60%] lg:w-[40%]"
      classNameContent="h-[95%] overflow-y-scroll"
    >
      <UiModal.Header
        onClose={() => {
          onClose();
          resetForm();
        }}
        className="mb-4"
      >
        Редактировать
      </UiModal.Header>

      <form
        autoComplete="new-password"
        onSubmit={(e) => {
          handleSubmit(e, () => {
            if (isPasswordValid) {
              return;
            }

            onUpdate({
              id: user.userId,
              updates: {
                email: formData.email,
                name: formData.name,
                surname: formData.surname,
                username: formData.username,
                password: formData.password,
                roleId:
                  formData.roleId !== null ? formData.roleId : user.roleId,
              },
            });

            onClose();
          });
        }}
      >
        <UiModal.Main className="flex flex-col gap-4 md:gap-5">
          <UiInput
            idInput="surname"
            label="Фамилия"
            placeholder="Введите фамилию"
            borderColor="lightGrey"
            value={formData.surname ?? ""}
            onChange={(e) => handleUpdateForm("surname", e.target.value)}
          />

          <UiInput
            idInput="name"
            label="Имя"
            borderColor="lightGrey"
            placeholder="Введите имя"
            value={formData.name ?? ""}
            onChange={(e) => handleUpdateForm("name", e.target.value)}
          />

          <UiInput
            idInput="email"
            label="Email"
            type="email"
            borderColor="lightGrey"
            placeholder="Введите email"
            value={formData.email ?? ""}
            onChange={(e) => handleUpdateForm("email", e.target.value)}
          />

          <UiInput
            idInput="username"
            label="Username"
            borderColor="lightGrey"
            placeholder="Введите username"
            value={formData.username ?? ""}
            onChange={(e) => handleUpdateForm("username", e.target.value)}
          />

          <PasswordInput
            idInput="password"
            label="Пароль"
            autoComplete="new-password"
            placeholder="Введите пароль"
            value={formData.password ?? ""}
            onChange={(e) => handleUpdateForm("password", e.target.value)}
          />

          <PasswordInput
            idInput="confirmationPassword"
            label="Подтверждения пароля"
            autoComplete="new-password"
            placeholder="Подтверждения пароля"
            value={formData.confirmationPassword ?? ""}
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

            <div className="flex mb-5">
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
        </UiModal.Main>

        <UiModal.Footer>
          <UiButton
            sizeButton="full"
            textButton="Редактировать"
            sizesText="text-sm sm:text-base min-[1750px]:text-2xl"
            rounded="rounded-xl"
            className="py-2 min-[1750px]:py-3 bg-accent-green text-primary-white hover:scale-[1.02] transition mt-2 lg:mt-3 min-[1750px]:mt-4"
          />
        </UiModal.Footer>
      </form>
    </UiModal>
  );
};
