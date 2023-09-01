export const bikeDeclension = {
  1: 'велосипед',
  '2-4': 'велосипеда',
  5: 'велосипедов',
};

export function getDeclensionWord(value: number, declensions: typeof bikeDeclension) {
  let count = value % 100;
  if (count >= 5 && count <= 20) {
    return declensions['5'];
  }

  count %= 10;
  if (count === 1) {
    return declensions['1'];
  }
  if (count >= 2 && count <= 4) {
    return declensions['2-4'];
  }

  return declensions['5'];
}
