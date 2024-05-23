import { Decimal } from 'decimal.js';

export default function validateNumericString(value: string) {
  try {
    const decimalInstance = new Decimal(value);
    decimalInstance.toNumber();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
