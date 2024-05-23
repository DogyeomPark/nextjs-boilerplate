import validateNumericString from './validateNumericString';

export default function formatDecimalStringWithComma(
  numericString: string,
): string {
  validateNumericString(numericString);

  const isInteger = !numericString.includes('.');
  if (isInteger) {
    return numericString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } else {
    const integerPart = numericString
      .split('.')[0]
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const fractionPart = numericString.split('.')[1];

    return integerPart.concat('.', fractionPart);
  }
}
