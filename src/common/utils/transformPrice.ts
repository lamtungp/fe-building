export const numberToString = (price: number): string => {
  if (price < 1000) {
    return price.toString();
  }
  let str = '';

  while (price / 1000 >= 1) {
    if (price % 1000 === 0) {
      str = ' 000' + str;
    } else {
      str = ` ${String(price % 1000)}` + str;
    }
    price = (price - (price % 1000)) / 1000;
  }
  return String(price).concat(`${str}`);
};

export const stringToNumber = (price: string): number => {
  return 0;
};
