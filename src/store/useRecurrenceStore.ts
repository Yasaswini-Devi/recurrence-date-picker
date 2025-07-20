import { create } from 'zustand';
import { generateRecurringDates } from '@/utils/recurrenceUtils';

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface NthWeekday {
  week: number;      // 1 = First, 2 = Second, ..., -1 = Last
  weekday: number;   // 0 = Sunday ... 6 = Saturday
}

interface RecurrenceState {
  startDate: Date;
  endDate?: Date;
  frequency: Frequency;
  interval: number;

  // Weekly specific
  selectedWeekdays: number[];

  // Monthly/Yearly specific
  nthWeekday?: NthWeekday;

  // Computed Dates
  recurringDates: Date[];

  // Actions
  setStartDate: (date: Date) => void;
  setEndDate: (date?: Date) => void;
  setFrequency: (f: Frequency) => void;
  setInterval: (i: number) => void;

  toggleWeekday: (day: number) => void;
  setNthWeekday: (val: NthWeekday) => void;

  generateDates: () => void;
}

export const useRecurrenceStore = create<RecurrenceState>((set, get) => ({
  startDate: new Date(),
  endDate: undefined,
  frequency: 'weekly',
  interval: 1,
  selectedWeekdays: [],
  nthWeekday: undefined,
  recurringDates: [],

  setStartDate: (date) => set({ startDate: date }),
  setEndDate: (date) => set({ endDate: date }),
  setFrequency: (f) => set({ frequency: f }),
  setInterval: (i) => set({ interval: i }),

  toggleWeekday: (day) =>
    set((state) => ({
      selectedWeekdays: state.selectedWeekdays.includes(day)
        ? state.selectedWeekdays.filter((d) => d !== day)
        : [...state.selectedWeekdays, day],
    })),

  setNthWeekday: (val) => set({ nthWeekday: val }),

  generateDates: () => {
    const { startDate, endDate, frequency, interval, selectedWeekdays, nthWeekday } = get();
    const recurringDates = generateRecurringDates({
      startDate,
      endDate,
      frequency,
      interval,
      selectedWeekdays,
      nthWeekday,
    });
    set({ recurringDates });
  },
}));
