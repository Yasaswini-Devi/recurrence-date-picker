import { addDays, addWeeks, addMonths, addYears, startOfDay } from 'date-fns';

type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface RecurrenceOptions {
  startDate: Date;
  endDate?: Date;
  frequency: Frequency;
  interval: number;
  selectedWeekdays?: number[];
  nthWeekday?: {
    week: number;
    weekday: number;
  };
}

export function generateRecurringDates(options: RecurrenceOptions): Date[] {
  const {
    startDate,
    endDate,
    frequency,
    interval,
    selectedWeekdays = [],
    nthWeekday,
  } = options;

  const result: Date[] = [];
  const limit = endDate ?? addYears(startDate, 1);
  let current = startOfDay(startDate);

  switch (frequency) {
    case 'daily':
      while (current <= limit) {
        result.push(new Date(current));
        current = addDays(current, interval);
      }
      break;

    case 'weekly':
      while (current <= limit) {
        for (let i = 0; i < 7; i++) {
          const day = addDays(current, i); 
          if (
            selectedWeekdays.includes(day.getDay()) &&
            day >= startDate &&
            day <= limit
          ) {
            result.push(new Date(day));
          }
        }
        current = addWeeks(current, interval);
      }
      break;

    case 'monthly':
      while (current <= limit) {
        if (nthWeekday) {
          const date = getNthWeekdayOfMonth(current, nthWeekday.week, nthWeekday.weekday);
          if (date && date >= startDate && date <= limit) {
            result.push(date);
          }
        }
        current = addMonths(current, interval);
      }
      break;

    case 'yearly':
      while (current <= limit) {
        result.push(new Date(current));
        current = addYears(current, interval);
      }
      break;
  }

  return result;
}

function getNthWeekdayOfMonth(baseDate: Date, week: number, weekday: number): Date | null {
  const year = baseDate.getFullYear();
  const month = baseDate.getMonth();

  let date = new Date(year, month, 1);
  const firstDay = date.getDay();

  let dayOffset = (weekday - firstDay + 7) % 7;
  let day = 1 + dayOffset + (week - 1) * 7;

  if (week === -1) {
    date = new Date(year, month + 1, 0);
    const lastDay = date.getDay();
    day = date.getDate() - ((lastDay - weekday + 7) % 7);
  }

  date = new Date(year, month, day);
  return date.getMonth() === month ? date : null;
}