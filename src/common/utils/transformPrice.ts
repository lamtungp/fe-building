export const numberToString = (price: number): string => {
  if (price < 1000) {
    return price.toString();
  }
  let str = '';

  while (price / 1000 > 1) {
    if (price % 1000 === 0) {
      str = str.concat(' 000');
    } else {
      str.concat(` ${String(price % 1000)}`);
    }
    price /= 1000;
  }
  return String(price).concat(`${str}`);
};

export const stringToNumber = (price: string): number => {
  return 0;
};
