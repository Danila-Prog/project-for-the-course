import { useFetch } from "@/shared/api/useFetch";
import { validatePassword } from "@/shared/ui/PasswordInput/validatePassword";
import { ChangeEvent, useState } from "react";

const initualFormState = {
  surname: "",
  name: "",
  userName: "",
  company: "",
  company_id: "",
  password: "",
  confirmationPassword: "",
  role_id: "",
};

export const useRegistration = () => {
  const [registrationFormData, setRegistrationFormData] = useState({});

  const [isError, setIsError] = useState(false);

  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const formData = {
    ...initualFormState,
    ...registrationFormData,
  };

  const [isChecked, setIsChecked] = useState({
    driver: false,
    logist: false,
  });
  const { dataCompany } = useFetch();

  const handleCreateUser = async () => {
    if (formData.password !== formData.confirmationPassword) {
      setIsError(true);
      return;
    }
    if (!validatePassword(formData.password)) {
      setIsErrorPassword(true);
      return;
    }
    try {
      const { surname, name, userName, company_id, password, role_id } =
        formData;

      const response = await fetch("http://localhost:8080/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          surname,
          name,
          userName,
          company_id: Number(company_id),
          password,
          role_id: Number(role_id),
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      window.location.reload();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleCheckedChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked, value } = e.target;

    setIsChecked({
      driver: value === "driver" ? checked : false,
      logist: value === "logist" ? checked : false,
    });
    setRegistrationFormData((prev) => ({
      ...prev,
      role_id:
        value === "driver" && isChecked.driver === false
          ? "1"
          : value === "logist" && isChecked.logist === false
          ? "2"
          : "",
    }));
  };

  const handleChangeRegistrationFormData = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    selectedCompany?: { company_id: number }
  ) => {
    const { name, value } = e.target;

    setRegistrationFormData((prevState) => ({
      ...prevState,
      [name]: value,
      ...(name === "company"
        ? selectedCompany && {
            company_id: selectedCompany.company_id,
          }
        : name === "password"
        ? setIsError(false)
        : name === "confirmationPassword" && setIsError(false)),
    }));
  };

  return {
    formData,
    isError,
    isChecked,
    dataCompany,
    handleCheckedChange,
    handleCreateUser,
    handleChangeRegistrationFormData,
    isErrorPassword,
    setIsErrorPassword,
  };
};
