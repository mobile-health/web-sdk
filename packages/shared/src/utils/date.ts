/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  DATE_FORMAT,
  DATE_FORMAT_BE,
  DATE_FORMAT_BODY_BE,
  DATE_FORMAT_BODY_BE_NO_TIMEZONE,
  DATE_FORMAT_NO_COMMA,
  DATE_TIME_24_COMMON_FORMAT,
  DATE_TIME_COMMON_FORMAT,
  DATE_TIME_FORMAT,
  DATE_TIME_MINUTE_FORMAT,
  TIME_FORMAT,
  TODAY,
  CUSTOM,
  LAST_MONTH,
  LAST_WEEK,
  REPORT_CUSTOM,
  REPORT_THIS_MONTH,
  REPORT_THIS_QUARTER,
  REPORT_THIS_WEEK,
  REPORT_THIS_YEAR,
  REPORT_TODAY,
  THIS_MONTH,
  THIS_QUATER,
  THIS_WEEK,
  THIS_WEEK_ISO,
  THIS_YEAR,
  YESTERDAY,
} from '../constants/date';
import { AgeModes, CalendarMode, DateTimeMomentStringType, FilterDateRangeType } from '../types';
import moment, { Moment, unitOfTime } from 'moment';
import pluralize from 'pluralize';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import isTodayPlugin from 'dayjs/plugin/isToday';
import isYesterdayPlugin from 'dayjs/plugin/isYesterday';
import weekOfYear from 'dayjs/plugin/weekOfYear';
dayjs.extend(utc);
dayjs.extend(isTodayPlugin);
dayjs.extend(isYesterdayPlugin);
dayjs.extend(weekOfYear);

export const getUniqueStringByDateTime = (datetime?: DateTimeMomentStringType) => {
  const format = 'MMM_DD_YYYY_HH_mm_ss';
  return moment(datetime || new Date()).format(format);
};

export class CalendarDateUtils {
  static startOfDay(
    date: DateTimeMomentStringType,
    mode: CalendarMode = 'day',
    format = DATE_FORMAT_BODY_BE_NO_TIMEZONE,
  ) {
    return moment(date).startOf(mode).format(format);
  }

  static endOfDay(
    date: DateTimeMomentStringType,
    mode: CalendarMode = 'day',
    format = DATE_FORMAT_BODY_BE_NO_TIMEZONE,
  ) {
    return moment(date).endOf(mode).format(format);
  }
}

export const formatDateTimeCommonFormat = (date: DateTimeMomentStringType) =>
  moment(date).format(DATE_TIME_COMMON_FORMAT);
export const formatDateTime24CommonFormat = (date: DateTimeMomentStringType) =>
  moment(date).format(DATE_TIME_24_COMMON_FORMAT);

export const formatDateTimeBodyUtc = (date: DateTimeMomentStringType) =>
  moment(date).utc().format(DATE_FORMAT_BODY_BE);

export const startOfUTCDay = (date: DateTimeMomentStringType): Date => {
  return moment(date).startOf('day').utc().toDate();
};

export const endOfUTCDay = (date: DateTimeMomentStringType): Date => {
  return moment(date).endOf('day').utc().toDate();
};

export const startOfUnitUtcFormat = (
  date: DateTimeMomentStringType,
  unit?: unitOfTime.StartOf,
  format?: string,
) =>
  moment(date)
    .startOf(unit ?? 'day')
    .utc()
    .format(format ?? DATE_FORMAT_BODY_BE);

export const endOfUnitUtcFormat = (
  date: DateTimeMomentStringType,
  unit?: unitOfTime.StartOf,
  format?: string,
) =>
  moment(date)
    .endOf(unit ?? 'day')
    .utc()
    .format(format ?? DATE_FORMAT_BODY_BE);

export const endOfDayUtcFormat = (date: DateTimeMomentStringType, format?: string) =>
  moment(date)
    .endOf('day')
    .utc()
    .format(format || DATE_FORMAT_BODY_BE);

export const formatDateBody = (date: DateTimeMomentStringType) =>
  moment(date).format(DATE_FORMAT_BE);

export const formatDate = (date: DateTimeMomentStringType, format = DATE_FORMAT) =>
  moment(date).format(format);

export const formatDateNoComma = (date: Moment | string) =>
  moment(date).format(DATE_FORMAT_NO_COMMA);

export const isSameDate = (preTime: Moment, nextTime: Moment) =>
  moment(preTime).isSame(moment(nextTime), 'day');

export const formatDateTime = (date: Moment | string) =>
  moment.utc(date).local().format(DATE_TIME_FORMAT);

export const formatTableDateTime = (date: Moment | string | number) =>
  moment(date).format(DATE_TIME_FORMAT);

export const formatDateTimeInMinute = (date: Moment | string) =>
  moment(date).local().format(DATE_TIME_MINUTE_FORMAT);

export const getYearOlds = (date: Moment | string, by: AgeModes = 'Y') => {
  const ageByDay = date ? moment().diff(moment(date).format(), 'years', false) : 0;
  const ageByYear = new Date().getFullYear() - moment(date).year();
  return by === 'Y' ? ageByYear : ageByDay;
};

export const getDayOlds = (date: Moment | string) => moment().diff(moment(date), 'days');

export const getFullAge = (date: Moment | string) => {
  const now = moment();
  const birthDate = moment(date);
  const dateArr = [];
  const years = now.diff(birthDate, 'years');

  birthDate.add(years, 'years');
  if (years > 0) dateArr.push(`${years}y`);
  const months = now.diff(birthDate, 'months');
  birthDate.add(months, 'months');
  if (months > 0) dateArr.push(`${months}m`);
  const days = now.diff(birthDate, 'days');
  if (days > 0) dateArr.push(`${days}d`);
  if (years === 0 && months === 0 && days === 0) return '0d';
  return dateArr.join(' ');
};

export const getMonthOlds = (date: Moment | string) => moment().diff(moment(date), 'months');

export const formatTime = (date: Moment | Date | string, format?: string) =>
  moment(date).format(format ?? TIME_FORMAT);

export const pad = (num: number) => {
  return ('0' + num).slice(-2);
};

export const formateTimeBySecond = (secs: number) => {
  let minutes = Math.floor(secs / 60);
  secs = secs % 60;
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};

export const formatDateSelect2FromToTime = (date: string) => {
  let from = undefined;
  let to = undefined;
  switch (date) {
    case REPORT_TODAY: // today
    case TODAY: // today
      from = moment();
      to = moment();
      break;

    case YESTERDAY: // Yesterday
      from = moment().subtract(1, 'days');
      to = moment().subtract(1, 'days');
      break;

    case THIS_WEEK: // This week
    case REPORT_THIS_WEEK: // This week
    case THIS_WEEK_ISO: // This week
      from = moment().startOf('isoWeek');
      to = moment();
      break;

    case REPORT_THIS_MONTH: // This month
    case THIS_MONTH: // This month
      from = moment().startOf('month');
      to = moment();
      break;

    case REPORT_THIS_YEAR:
    case THIS_YEAR:
      from = moment().startOf('year');
      to = moment();
      break;

    case LAST_WEEK: // Last week
      from = moment().startOf('week').subtract(7, 'days');
      to = moment().endOf('week').subtract(7, 'days');
      break;

    case LAST_MONTH: // Last month
      from = moment().subtract(1, 'months').startOf('month');
      to = moment().subtract(1, 'months').endOf('month');
      break;

    case THIS_QUATER: // this quarter
    case REPORT_THIS_QUARTER: // this quarter
      from = moment().startOf('quarter');
      to = moment();
      break;

    case REPORT_CUSTOM: // custom
    case CUSTOM: // custom
      from = undefined;
      to = undefined;
      break;
    default:
      break;
  }
  return {
    fromTime: from ? from.startOf('day').utc().format() : undefined,
    toTime: to ? to.endOf('day').utc().format() : undefined,
  };
};

export const calculateAge = (date: string | Moment | undefined) => {
  return date ? moment().diff(moment(date).format(), 'years', false) : 0;
};

export const isOverXYearsOld = (dob: string | Moment | undefined, age: number) =>
  dob ? getYearOlds(dob) >= age : false;

export const getCurrentYear = () => moment().year();

export const getNextMonth = (currentDate?: string | Moment) => {
  return moment(currentDate).add(1, 'month');
};

export const getMonthOptions = (shortMonth = true) => {
  const months = shortMonth ? moment.monthsShort() : moment.months();
  return months.map((month, index) => {
    return { label: month, value: index + 1 };
  });
};

export const formatQueryDateTime = (date: string | Moment | number) => {
  return date ? formatDate(date, DATE_TIME_COMMON_FORMAT) : '---';
};

export const calculateDateTime = (fromDateTime: string, toDateTime: string, showSecond = false) => {
  const d = moment.duration(moment(toDateTime).diff(moment(fromDateTime)));
  const month = d.months();
  const day = d.days();
  const hour = d.hours();
  const minutes = d.minutes();
  let dateString = '';
  if (month > 0) dateString += `${month} ${pluralize('month', month)} `;
  if (day > 0) dateString += `${day} ${pluralize('day', day)} `;
  if (hour > 0) dateString += `${hour} ${pluralize('hour', hour)} `;
  if (minutes > 0) dateString += `${minutes} ${pluralize('minute', minutes)} `;
  // Return value with format: 2 months 27 days 19 hours 53 mins
  if (showSecond) {
    const seconds = d.seconds();
    if (seconds > 0) dateString += `${seconds} ${pluralize('second', seconds)} `;
  }
  return dateString;
};

export const timeSince = (date: Date) => {
  const seconds = Math.floor((new Date().getTime() - date?.getTime()) / 1000);

  let interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
};

const MOMENT_DATE_FORMATS = [
  'DD MMM, YYYY',
  'YYYYMMDD',
  'YYYY-MM-DD',
  'YYYY_MM_DD',
  'YYYY.MM.DD',
  'M/D/YY',
  'MM/DD/YY',
  'MM/DD/YYYY',
  'DD MMM YY',
  'DD MMM YYYY',
  'DD MMMM YYYY',
  'MMM D, YY',
  'MMM D, YYYY',
  'MMM DD, YYYY',
  'MMMM D, YYYY',
  'MMMM DD, YYYY',

  'YYYYMMDDHHmm',
  'YYYYMMDD_HHmm',
  'YYYY.MM.DD.HHmm',
  'YYYY-MM-DD-HHmm',
  'YYYY-MM-DD_HHmm',
  'YYYY.MM.DD.HH.mm',
  'YYYY-MM-DD-HH-mm',
  'YYYY-MM-DD HH:mm',
  'YYYY-MM-DD h:mm A',
  'YYYY-MM-DD hh:mm A',
  'YYYY-MM-DD @ h:mm A',

  'YYYYMMDDHHmmss',
  'YYYY.MM.DD.HHmmss',
  'YYYY-MM-DD-HHmmss',
  'YYYY-MM-DD_HHmmss',
  'YYYY-MM-DD_HHmm.ss',
  'YYYY.MM.DD.HH.mm.ss',
  'YYYY-MM-DD-HH-mm-ss',
  'YYYY-MM-DD HH:mm:ss',
  'YYYY-MM-DD HH:mm.ss',
  'YYYY-MM-DD h:mm:ss A',
  'YYYY-MM-DD hh:mm:ss A',
  'YYYY-MM-DD @ h:mm:ss A',

  'dd MMM D YY',
  'ddd MMM D YY',
  'ddd MMM D YYYY',
  'ddd MMM DD YYYY',
  'dddd, MMM D YYYY',
  'dddd, MMMM D, YYYY',
  'dddd, MMMM DD, YYYY',

  'ddd MMM D YY h:mm A',
  'ddd MMM D YYYY h:mm A',
  'ddd MMM DD YYYY h:mm A',
  'dddd, MMM D YYYY h:mm A',
  'dddd, MMMM D, YYYY h:mm A',
  'dddd, MMMM DD, YYYY h:mm A',

  'ddd MMM D YY hh:mm A',
  'ddd MMM D YYYY hh:mm A',
  'ddd MMM DD YYYY hh:mm A',
  'dddd, MMM D YYYY hh:mm A',
  'dddd, MMMM D, YYYY hh:mm A',
  'dddd, MMMM DD, YYYY hh:mm A',

  'ddd MMM D YY @ h:mm A',
  'ddd MMM D YYYY @ h:mm A',
  'ddd MMM DD YYYY @ h:mm A',
  'dddd, MMM D YYYY @ h:mm A',
  'dddd, MMMM D, YYYY @ h:mm A',
  'dddd, MMMM DD, YYYY @ h:mm A',
];

/** result[0] will be used as selected format */
export const generateParsedFormatsForDatePicker = (format: string | string[] | undefined) => {
  if (!format) return MOMENT_DATE_FORMATS;
  if (typeof format == 'string') return [format, ...MOMENT_DATE_FORMATS];

  return [...format, ...MOMENT_DATE_FORMATS];
};

export const isValidDate = (date: any) => {
  return moment(date).isValid();
};

export const isFirstDateOfMonth = (date: Date | string) => {
  const firstDate = moment(date).startOf('month');
  return firstDate.isSame(moment(date), 'day');
};

export const sameDay = (a: Date | string, b: Date | string) => {
  return moment(a).isSame(moment(b), 'day');
};

export const formatDateBodyDayJS = (date: Dayjs | string, format?: string) =>
  dayjs(date).format(format ?? DATE_FORMAT_BE);

export const calculateDuration = (duration: number) => {
  const hour = Math.floor(duration / 60);
  const hourText = hour > 0 ? `${hour} hour` : '';
  const remainingMins = duration % 60;
  const minText = remainingMins > 0 ? `${remainingMins} mins` : '';

  return `${hourText} ${minText}`;
};

export const formatDateTimeUTC = (date: Dayjs) => date.format(DATE_FORMAT_BODY_BE_NO_TIMEZONE);

export const validateDateValue = (
  value: Moment | string | null | undefined,
): Moment | undefined => {
  const date = moment(value);
  return date.isValid() ? date : undefined;
};

export const isValidDateStringByFormat = (format: string, value?: string) => {
  return moment(value, format, true).isValid();
};

export const secondsToMinutesSeconds = (secs: number) => {
  const minutes = Math.floor(secs / 60);
  const seconds = secs % 60;

  return `${minutes} ${pluralize('minute', minutes)} ${seconds} ${pluralize('second', seconds)}`;
};

export const isBeforeDate = (
  date: DateTimeMomentStringType,
  compareDate: DateTimeMomentStringType,
) => {
  return moment(date).endOf('D').isBefore(moment(compareDate).startOf('D'));
};

export const getTomorrowDate = () => moment().add(1, 'days').toDate();

export const getMonthFromNumber = (month: number | undefined) => {
  if (!month) return '';
  return moment().month(month).format('MMM');
};

export const getSuffixFileName = () => {
  return moment().format('YYYYMMDD_HHmmss');
};

export const paramsToRange = (from: any, to: any): FilterDateRangeType => {
  if (!from && !to) return null;
  if (!!from && !!to)
    return [validateDateValue(from), validateDateValue(to)] as FilterDateRangeType;

  if (from) return [validateDateValue(from), validateDateValue(from)] as FilterDateRangeType;
  if (to) return [validateDateValue(to), validateDateValue(to)] as FilterDateRangeType;

  return null;
};

export const getRelativeDay = (timestamp: number): string => {
  const d = dayjs(timestamp);
  if (!d.isValid()) return '';
  if (d.isToday()) {
    return 'Today';
  } else if (d.isYesterday()) {
    return 'Yesterday';
  } else if (!d.isSame(dayjs(), 'week')) {
    return d.format('dddd'); // Returns the day of the week
  } else if (!d.isSame(dayjs(), 'year')) {
    return d.format('DD MMM YYYY'); // Returns the date in dd MMM format
  } else {
    return d.format('DD MMM'); // Returns the date in dd MMM format
  }
};

export const getRelativeTime = (timestamp: number | string): string => {
  if (!timestamp) return '';
  const d = dayjs(timestamp);
  if (!d.isValid()) return '';
  if (d.isToday()) {
    return d.format('hh:mm a');
  } else if (d.isYesterday()) {
    return 'Yesterday';
  } else if (d.isSame(dayjs(), 'week')) {
    return d.format('dddd');
  } else if (d.isSame(dayjs(), 'year')) {
    return d.format('DD MMM');
  }
  return d.format('DD MMM YYYY');
};

export const equalYear = (date1: DateTimeMomentStringType | undefined, targetYear: number) => {
  if (!date1) return false;
  return moment(date1).year() === targetYear;
};
