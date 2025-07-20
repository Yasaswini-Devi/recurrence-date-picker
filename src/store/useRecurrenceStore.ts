import { create } from 'zustand';
import { add, isBefore, isSameDay } from 'date-fns';
import { generateRecurringDates } from '@/utils/recurrenceUtils';

export type Frequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

interface RecurrenceState {
  startDate: Date;
  endDate?: Date;
  frequency: Frequency;
  interval: number;
  selectedWeekdays: number[]; // 0 (Sunday) - 6 (Saturday)
  recurringDates: Date[];

  setStartDate: (date: Date) => void;
  setEndDate: (date?: Date) => void;
  setFrequency: (f: Frequency) => void;
  setInterval: (i: number) => void;
  toggleWeekday: (day: number) => void;
  generateDates: () => void;
}

export const useRecurrenceStore = create<RecurrenceState>((set, get) => ({
  startDate: new Date(),
  endDate: undefined,
  frequency: 'weekly',
  interval: 1,
  selectedWeekdays: [],
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
  generateDates: () => {
    const { startDate, endDate, frequency, interval, selectedWeekdays } = get();
    const recurringDates = generateRecurringDates(startDate, endDate, frequency, interval, selectedWeekdays);
    set({ recurringDates });
  },
}));