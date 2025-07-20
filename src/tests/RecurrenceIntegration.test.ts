import { act } from 'react-dom/test-utils';
import { useRecurrenceStore } from '../store/useRecurrenceStore';
import { describe, it, beforeEach, expect } from 'vitest';

describe('RecurrenceStore Integration Test', () => {
  beforeEach(() => {
    // Reset store state before each test
    useRecurrenceStore.setState({
      startDate: new Date('2025-01-01'),
      endDate: new Date('2025-01-20'),
      frequency: 'weekly',
      interval: 1,
      selectedWeekdays: [],
      nthWeekday: undefined,
      recurringDates: [],
    });
  });

  it('generates weekly recurring dates for selected weekdays', () => {
    const store = useRecurrenceStore.getState();

    act(() => {
      store.setStartDate(new Date('2025-01-01'));
      store.setEndDate(new Date('2025-01-20'));
      store.setFrequency('weekly');
      store.setInterval(1);

      store.toggleWeekday(1); // Monday
      store.toggleWeekday(3); // Wednesday

      store.generateDates();
    });

    const result = useRecurrenceStore.getState().recurringDates.map(d => d.toDateString());

    expect(result).toEqual([
      'Mon Jan 06 2025',
      'Wed Jan 08 2025',
      'Mon Jan 13 2025',
      'Wed Jan 15 2025',
      'Mon Jan 20 2025',
    ]);
  });

  it('clears previous dates when new generation is triggered', () => {
    const store = useRecurrenceStore.getState();

    act(() => {
      store.setStartDate(new Date('2025-01-01'));
      store.setEndDate(new Date('2025-01-10'));
      store.setFrequency('daily');
      store.setInterval(2); // every 2 days
      store.generateDates();
    });

    const firstGeneration = useRecurrenceStore.getState().recurringDates;

    act(() => {
      store.setEndDate(new Date('2025-01-05')); // Change end date to earlier
      store.generateDates();
    });

    const secondGeneration = useRecurrenceStore.getState().recurringDates;

    expect(firstGeneration.length).toBeGreaterThan(secondGeneration.length);
  });
});