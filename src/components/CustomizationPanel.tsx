'use client';

import { useRecurrenceStore } from '@/store/useRecurrenceStore';
import Button from '@/components/ui/Button';

export default function CustomizationPanel() {
  const {
    interval,
    setInterval,
    selectedWeekdays,
    toggleWeekday,
    generateDates,
    nthWeekday,
    setNthWeekday,
    frequency,
  } = useRecurrenceStore();

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const weekOptions = [1, 2, 3, 4, 5];
  const weekdayOptions = weekdays.map((day, i) => ({ label: day, value: i }));

  return (
    <div className="space-y-4 p-4 bg-white shadow rounded-xl border border-gray-200">
      <div>
        <label className="block mb-1 font-medium">Interval</label>
        <input
          type="number"
          min={1}
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          className="border px-2 py-1 rounded w-20"
        />
      </div>

      {(frequency === 'weekly' || frequency === 'monthly') && (
        <div>
          <label className="block mb-1 font-medium">Select Days</label>
          <div className="flex flex-wrap gap-2">
            {weekdays.map((day, index) => (
              <button
                key={index}
                onClick={() => toggleWeekday(index)}
                className={`px-3 py-1 rounded-full border ${
                  selectedWeekdays.includes(index)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {frequency === 'monthly' && (
        <div className="space-y-2">
          <label className="block font-medium">Or select pattern (e.g., 2nd Tuesday)</label>
          <div className="flex gap-4">
            <select
              value={nthWeekday?.week ?? ''}
              onChange={(e) =>
                setNthWeekday({ week: Number(e.target.value), weekday: nthWeekday?.weekday ?? 1 })
              }
              className="border rounded px-2 py-1"
            >
              <option value="">Week</option>
              {weekOptions.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>

            <select
              value={nthWeekday?.weekday ?? ''}
              onChange={(e) =>
                setNthWeekday({ week: nthWeekday?.week ?? 1, weekday: Number(e.target.value) })
              }
              className="border rounded px-2 py-1"
            >
              <option value="">Day</option>
              {weekdayOptions.map((day) => (
                <option key={day.value} value={day.value}>
                  {day.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <Button onClick={generateDates} className="mt-4">
        Apply
      </Button>
    </div>
  );
}
