import { Moment } from 'moment';

export type DateTimeMomentStringType = Moment | string | Date | number;
export type CalendarMode = 'day' | 'week' | 'month';
export type AgeModes = 'Y' | 'D';
export type FilterDateType = Moment | Date | string | null | undefined;
export type FilterDateRangeType = [FilterDateType, FilterDateType] | null;
