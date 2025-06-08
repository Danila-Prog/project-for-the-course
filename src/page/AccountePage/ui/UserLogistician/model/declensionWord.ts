export const declensionWord = (value: number, word: string[]) => {
  let n = Math.abs(value);
  n %= 100;
  if (n >= 5 && n <= 20) {
    return word[2];
  }
  n %= 10;
  if (n === 1) {
    return word[0];
  }
  if (n >= 2 && n <= 4) {
    return word[1];
  }
  return word[2];
};
