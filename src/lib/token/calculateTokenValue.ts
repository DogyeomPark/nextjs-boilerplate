import { Decimal } from 'decimal.js';
import validateNumericString from './validateNumericString';

type NumericValue = string | bigint | number;

/**
 * 두 개의 인자를 곱하여 토큰 수량에 비례하는 총 가격을 리턴합니다.
 * @parmas amount - 토큰 수량
 * @parmas price - 토큰 가격
 * @returns 연산 결과 값인 Decimal 인스턴스
 *
 * @example
 * Numeric Type은 모두 인자로 넘길 수 있습니다.
 *
 * ```ts
 * const tokenAmount = formatUnits(BigInt(1000000000000000000), 18);
 * const tokenPrice = 12.123
 * const totalTokenValue = calculateTokenValue(tokenAmount,tokenPrice);
 *
 * console.log('totalTokenValue', totalTokenValue); // 121.23
 * ```
 */
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
