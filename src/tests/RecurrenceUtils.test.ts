import { generateRecurringDates } from '../utils/recurrenceUtils';
import { describe, test, expect } from 'vitest';

describe('generateRecurringDates', () => {
  const baseDate = new Date('2025-01-01');

  test('generates daily recurring dates', () => {
    const result = generateRecurringDates({
      startDate: baseDate,
      endDate: new Date('2025-01-05'),
      frequency: 'daily',
      interval: 1,
    });
    expect(result.map(d => d.toDateString())).toEqual([
      'Wed Jan 01 2025',
      'Thu Jan 02 2025',
      'Fri Jan 03 2025',
      'Sat Jan 04 2025',
      'Sun Jan 05 2025',
    ]);
  });

  test('generates weekly recurring dates with selected weekdays', () => {
    const result = generateRecurringDates({
      startDate: baseDate,
      endDate: new Date('2025-01-20'),
      frequency: 'weekly',
      interval: 1,
      selectedWeekdays: [1, 3], // Monday, Wednesday
    });
    expect(result.map(d => d.toDateString())).toEqual([
      'Mon Jan 06 2025',
      'Wed Jan 08 2025',
      'Mon Jan 13 2025',
      'Wed Jan 15 2025',
      'Mon Jan 20 2025',
    ]);
  });

  test('generates monthly recurring dates for nth weekday (2nd Tuesday)', () => {
    const result = generateRecurringDates({
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-04-30'),
      frequency: 'monthly',
      interval: 1,
      nthWeekday: { week: 2, weekday: 2 }, // 2nd Tuesday (0 = Sunday)
    });
    expect(result.map(d => d.toDateString())).toEqual([
      'Tue Jan 14 2025',
      'Tue Feb 11 2025',
      'Tue Mar 11 2025',
      'Tue Apr 08 2025',
    ]);
  });

  test('generates monthly recurring dates for last Friday of the month', () => {
    const result = generateRecurringDates({
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-03-31'),
      frequency: 'monthly',
      interval: 1,
      nthWeekday: { week: -1, weekday: 5 }, // Last Friday
    });
    expect(result.map(d => d.toDateString())).toEqual([
      'Fri Jan 31 2025',
      'Fri Feb 28 2025',
      'Fri Mar 28 2025',
    ]);
  });

  test('generates yearly recurring dates', () => {
    const result = generateRecurringDates({
      startDate: baseDate,
      endDate: new Date('2027-01-01'),
      frequency: 'yearly',
      interval: 1,
    });
    expect(result.map(d => d.toDateString())).toEqual([
      'Wed Jan 01 2025',
      'Thu Jan 01 2026',
      'Fri Jan 01 2027',
    ]);
  });

  test('defaults to 1 year limit if endDate not provided', () => {
    const result = generateRecurringDates({
      startDate: baseDate,
      frequency: 'daily',
      interval: 100,
    });
    expect(result.length).toBeGreaterThan(0);
    expect(result[result.length - 1].getFullYear()).toBe(2025);
  });
});