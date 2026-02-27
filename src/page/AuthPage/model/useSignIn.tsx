import { useRouter } from "next/navigation";
import { useState } from "react";

type SignInField = "login" | "password";

export const useSignIn = () => {
  const [formData, setFormData] = useState({ login: "", password: "" });

  const router = useRouter();

  const signIn = async () => {
    const res = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) return "invalid-credentials";

    router.replace("/account");
    router.refresh();
  };

  const updateForm = (field: SignInField, value: string) => {
    setFormData((curr) => ({
      ...curr,
      [field]: value,
    }));
  };

  return { formData, signIn, updateForm };
};
