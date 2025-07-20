import { addDays, addMonths, addWeeks, addYears, isBefore } from 'date-fns';
import type { Frequency } from '@/store/useRecurrenceStore';

export function generateRecurringDates(
  start: Date,
  end: Date | undefined,
  frequency: Frequency,
  interval: number,
  weekdays: number[]
): Date[] {
  const result: Date[] = [];

  let current = new Date(start);
  const until = end ?? addYears(start, 1); // default 1 year ahead

  while (isBefore(current, until) || current.toDateString() === until.toDateString()) {
    const day = current.getDay();
    if (weekdays.length === 0 || weekdays.includes(day)) {
      result.push(new Date(current));
    }

    switch (frequency) {
      case 'daily':
        current = addDays(current, interval);
        break;
      case 'weekly':
        current = addWeeks(current, interval);
        break;
      case 'monthly':
        current = addMonths(current, interval);
        break;
      case 'yearly':
        current = addYears(current, interval);
        break;
    }
  }

  return result;
}