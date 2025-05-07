export function validateByRegexp(password: string, regexp: RegExp) {
  return regexp.test(password);
}
