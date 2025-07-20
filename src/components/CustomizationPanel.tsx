'use client';
import { useRecurrenceStore } from '@/store/useRecurrenceStore';

export default function CustomizationPanel() {
  const { interval, setInterval, selectedWeekdays, toggleWeekday, generateDates } = useRecurrenceStore();

  return (
    <div className="space-y-4">
      <label className="block">Repeat every:</label>
      <input
        type="number"
        min={1}
        value={interval}
        onChange={(e) => {
          setInterval(Number(e.target.value));
          generateDates();
        }}
        className="border rounded p-2"
      />

      <div className="flex gap-2">
        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
          <button
            key={i}
            onClick={() => {
              toggleWeekday(i);
              generateDates();
            }}
            className={`w-8 h-8 rounded-full border ${
              selectedWeekdays.includes(i) ? 'bg-blue-500 text-white' : ''
            }`}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}