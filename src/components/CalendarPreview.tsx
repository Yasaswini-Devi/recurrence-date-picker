'use client';
import { useRecurrenceStore } from '@/store/useRecurrenceStore';
import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  format,
  addMonths,
  subMonths
} from 'date-fns';
import { useState } from 'react';

export default function CalendarPreview() {
  const { startDate, recurringDates } = useRecurrenceStore();
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(startDate));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const handlePrevMonth = () => {
    setCurrentMonth((prev) => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prev) => addMonths(prev, 1));
  };

  return (
    <div className="mt-6">
      {/* Navigation Controls */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={handlePrevMonth} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          ← Prev
        </button>
        <h2 className="text-lg font-semibold">
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <button onClick={handleNextMonth} className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300">
          Next →
        </button>
      </div>

      {/* Weekday Headers */}
      <div className="grid grid-cols-7 gap-2 text-center font-bold">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2 mt-1 text-center">
        {days.map((day) => {
          const isHighlighted = recurringDates.some((d) => isSameDay(d, day));
          return (
            <div
              key={day.toDateString()}
              className={`p-2 border rounded ${isHighlighted ? 'bg-yellow-500 text-white' : ''}`}
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>
    </div>
  );
}