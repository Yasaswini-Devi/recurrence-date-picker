import { create } from 'zustand';
import { generateRecurringDates } from '@/utils/recurrenceUtils';

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface NthWeekday {
  week: number;
  weekday: number;
}

interface RecurrenceState {
  startDate: Date;
  endDate?: Date;
  frequency: Frequency;
  interval: number;

  selectedWeekdays: number[];
  nthWeekday?: NthWeekday;

  recurringDates: Date[];

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