export type RecurrenceType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface RecurrenceRule {
  type: RecurrenceType;
  interval: number;
  daysOfWeek?: number[]; // 0=Sunday, 1=Monday, ...
  nthWeekday?: { week: number; weekday: number }; // e.g., 2nd Tuesday
  startDate: Date;
  endDate?: Date;
}