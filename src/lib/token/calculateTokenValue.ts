import { Decimal } from 'decimal.js';
import validateNumericString from './validateNumericString';

type NumericValue = string | bigint | number;

export default function calculateTokenValue(
  amount: NumericValue,
  price: NumericValue,
): Decimal {
  [amount, price].forEach((value) => {
    if (typeof value === 'string') validateNumericString(value);
  });

  const amountDecimalInstance = new Decimal(amount.toString());
  const priceDecimalInstance = new Decimal(price.toString());

  return amountDecimalInstance.times(priceDecimalInstance);
}
