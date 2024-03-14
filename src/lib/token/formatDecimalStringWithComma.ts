import validateNumericString from './validateNumericString';

/**
 * 인자로 넘겨받은 숫자 문자열을 세자리 단위 콤마로 포맷팅한 문자열로 리턴합니다.
 * @parmas numericString - 숫자 문자열
 * @returns 세자리 단위씩 콤마(,)로 구분해서 포맷한 decimal string
 *
 * @example
 * formatUnits을 사용해서 BigInt 또는 number를 문자열로 변환한 후에, 해당 문자열 값을 인자로 넘깁니다.
 *
 * ```ts
 * const tokenBalance = formatUnits(BigInt(9007199254740992), 18);
 * const formattedTokenBalance = formatDecimalStringWithComma(tokenBalance);
 *
 * console.log('tokenBalance', tokenBalance); // 90071.99254740992
 * console.log('formattedTokenBalance', formattedTokenBalance); // 90,071.99254740992
 * ```
 */
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
