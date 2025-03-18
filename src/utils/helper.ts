export const formatNumberWithCommas = (number: string) => {
  return number.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const isValidNumber = (value: string) => {
  const regex = /^[0-9.]$/;
  return regex.test(value);
};

export const formatToTwoDecimalPlaces = (number: number | string) => {
  if (typeof number === "string") {
    return parseFloat(number).toFixed(2);
  }
  return number.toFixed(2);
};
