import { Decimal } from 'decimal.js';

/**
 * Numeric string 인지 검증하는 함수입니다.
 * @parmas value - 문자열
 * @throws 넘겨받은 인자를 숫자로 변환하는 것이 실패하면 에러를 던집니다.
 */
export default function validateNumericString(value: string) {
  try {
    const decimalInstance = new Decimal(value);
    decimalInstance.toNumber();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
