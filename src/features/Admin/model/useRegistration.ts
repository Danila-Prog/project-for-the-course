import { validatePassword } from "@/shared/ui/PasswordInput/validatePassword";
import { FormEvent, useState } from "react";
import { RegistrationFormData } from "../lib/types";
import { updateField } from "@/shared/lib";

type Role = "driver" | "logist";

const initialFormState = {
  surname: "",
  name: "",
  email: "",
  username: "",
  password: "",
  confirmationPassword: "",
  roleId: 0,
};

const ROLE_TO_ID: Record<Role, number> = {
  driver: 1,
  logist: 2,
};

export const useRegistration = () => {
  const [formData, setFormData] =
    useState<RegistrationFormData>(initialFormState);
  const [experienceYears, setExperienceYears] = useState("");

  const [isError, setIsError] = useState(false);
  const [isErrorPassword, setIsErrorPassword] = useState(false);

  const handleSubmit = (e: FormEvent, submit: () => void) => {
    e.preventDefault();

    if (formData.password || formData.confirmationPassword) {
      if (formData.password !== formData.confirmationPassword) {
        setIsError(true);
        return;
      }

      if (!validatePassword(formData.password)) {
        setIsErrorPassword(true);
        return;
      }
    }

    try {
      submit();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const handleRoleChange = (role: Role) => {
    setFormData((prev) => ({
      ...prev,
      roleId: prev.roleId === ROLE_TO_ID[role] ? prev.roleId : ROLE_TO_ID[role],
    }));
  };

  const handleUpdateForm = updateField<
    RegistrationFormData,
    keyof RegistrationFormData
  >(setFormData, (key) => {
    if (key === "password" || key === "confirmationPassword") {
      setIsError(false);
      setIsErrorPassword(false);
    }
  });

  const handleUpdateExperienceYears = (years: string) => {
    setExperienceYears(years);
  };

  function resetForm() {
    setFormData(initialFormState);
    if (formData.roleId === ROLE_TO_ID["driver"]) setExperienceYears("");
  }

  return {
    formData,
    experienceYears,
    handleUpdateForm,
    handleUpdateExperienceYears,
    handleRoleChange,
    isError,
    isErrorPassword,
    resetForm,
    handleSubmit,
  };
};
