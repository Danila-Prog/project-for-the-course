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
  } = useRegistration({ requirePassword: false });

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <UiModal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        resetForm();
      }}
      classNameContent="overflow-y-scroll h-[90vh]"
    >
      <UiModal.Header
        onClose={() => {
          onClose();
          resetForm();
        }}
        className="mb-2.5"
      >
        Редактировать
      </UiModal.Header>

      <form
        autoComplete="new-password"
        onSubmit={(e) => {
          handleSubmit(e, () => {
            onUpdate({
              id: user.userId,
              updates: {
                email: formData.email,
                name: formData.name,
                surname: formData.surname,
                username: formData.username,
                password: formData.password,
                roleId: formData.roleId,
              },
            });
          });

          onClose();
        }}
      >
        <UiModal.Main className="flex flex-col gap-[10px]">
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
            <span className="text-[15px] font-medium">Роль</span>

            <div className="flex mb-[25px]">
              <div className="flex gap-[5px] items-center mr-[20px] ">
                <UiCheckBox
                  idInput="input-driver"
                  checked={formData.roleId === 1}
                  value="driver"
                  onChange={() => handleRoleChange("driver")}
                />

                <label
                  htmlFor="input-driver"
                  className="text-[17px] font-medium"
                >
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

                <label
                  htmlFor="input-logic"
                  className="text-[17px] font-medium"
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
            sizesText="text-[16px]"
            className="h-[43px]"
            rounded="rounded-[10px]"
          />
        </UiModal.Footer>
      </form>
    </UiModal>
  );
};
