"use client";

import { PasswordInput, UiInput } from "@/shared";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UiButton } from "@/shared";
import { useFetch } from "@/shared/api/useFetch";

const initialFormState = {
  login: "",
  password: "",
};

export default function SignIn() {
  const [userFormData, setUserFormData] = useState({});
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const { dataUsers } = useFetch();

  const formData = {
    ...initialFormState,
    ...userFormData,
  };
  const handleAuthorization = async () => {
    const userFound = dataUsers.data.some((el) => {
      const isMatch =
        formData.login === el.username && formData.password === el.password;

      if (isMatch) {
        localStorage.setItem("userId", String(el.user_id));
        localStorage.setItem("username", el.username);
        localStorage.setItem("password", el.password);
        localStorage.setItem("roleId", String(el.role_id));
        localStorage.setItem("companyId", String(el.company_id));
        localStorage.setItem("name", el.name);
        localStorage.setItem("surname", el.surname);
        router.push("/account");
        return true;
      }
      return false;
    });
    setIsError(!userFound);
  };

  return (
    <section>
      <div className="flex flex-col gap-[15px] mb-[30px]">
        <UiInput
          idInput="login"
          label="Логин"
          value={formData.login}
          borderColor="lightGrey"
          onChange={(e) => {
            setUserFormData((prevState) => ({
              ...prevState,
              login: e.target.value,
            }));
            setIsError(false);
          }}
          placeholder="Введите логин"
        />

        <PasswordInput
          idInput="password"
          label="Пароль"
          placeholder="Введите пароль"
          value={formData.password}
          onChange={(e) => {
            setUserFormData((prevState) => ({
              ...prevState,
              password: e.target.value,
            }));
            setIsError(false);
          }}
        />
        {isError && (
          <span className="text-[14px] text-rose-500 font-bold">
            Не верный логин или пароль
          </span>
        )}
      </div>
      <UiButton
        type="button"
        disabled={!formData.login || !formData.password}
        onClick={handleAuthorization}
        sizeButton="full"
        textButton={"Войти"}
        sizesText="text-[16px]"
        className="h-[43px]"
        rounded="rounded-[10px]"
      />
    </section>
  );
}
