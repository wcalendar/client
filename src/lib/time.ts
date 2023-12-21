import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';

dayjs.locale('ko');

const time = {
  /**
   * @returns 현재 날짜가 저장된 Dayjs 객체
   */
  now: (): Dayjs => dayjs(),
  /**
   * @returns 주어진 연, 월, 일 날짜가 저장된 Dayjs객체
   */
  new: (year: number, month: number, day?: number): Dayjs => dayjs(new Date(year, month, day)),
  /**
   * Date 객체를 Dayjs 객체로 변환하는 함수
   */
  fromDate: (date: Date): Dayjs => dayjs(date),
  /**
   * Dayjs 객체를 문자열로 표현하는 함수
   * @param format ex) YYYY.MM.DD = 2023.12.21 / format이 없으면 ISO 문자열로 반환
   */
  toString: (date: Dayjs, format?: string): string => {
    return format ? date.format(format) : date.toISOString();
  }
}

export default time;