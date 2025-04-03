import { LabeledInput } from "@/features/LabeledInput";
import { RouteButton } from "@/shared";

export default function Login() {
  return (
    <form>
      <div className="flex flex-col gap-[15px] mb-[40px]">
        <LabeledInput
          typeInput="email"
          idInput="login"
          label="Логин"
          placeholder="Введите логин"
        />
        <LabeledInput
          typeInput="password"
          idInput="password"
          label="Пароль"
          placeholder="Введите пароль"
        />
      </div>
      <RouteButton
        path="/account"
        sizeButton="full"
        textButton="Войти"
        sizesText="text-[17px]"
        className="h-[43px]"
        rounded="rounded-[10px]"
      />
    </form>
  );
}
