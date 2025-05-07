import { validateByRegexp } from "@/shared/lib/validateByRegexp";

export function validatePassword(value: string) {
  return validateByRegexp(value, /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
}
