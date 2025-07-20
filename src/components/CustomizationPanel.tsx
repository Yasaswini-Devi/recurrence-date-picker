'use client';

import { useRecurrenceStore } from '@/store/useRecurrenceStore';
import Button from '@/components/ui/Button';

const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const weeks = [1, 2, 3, 4, 5];

export default function CustomizationPanel() {
  const {
    frequency,
    interval,
    setInterval,
    selectedWeekdays,
    toggleWeekday,
    nthWeekday,
    setNthWeekday,
    generateDates
  } = useRecurrenceStore();

  const showWeekdays = frequency === 'weekly';
  const showNthWeekday = frequency === 'monthly';

  return (
    <div className="p-4 border rounded-xl shadow bg-white space-y-4">
      <div>
        <label className="font-medium">Repeat every</label>
        <input
          type="number"
          min={1}
          value={interval}
          onChange={(e) => setInterval(Number(e.target.value))}
          className="ml-2 w-20 border px-2 py-1 rounded"
        />
        <span className="ml-2 text-sm text-gray-600">{frequency}</span>
      </div>

      {showWeekdays && (
        <div>
          <label className="font-medium">Select Days of the Week</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {weekdays.map((day, idx) => (
              <button
                key={idx}
                onClick={() => toggleWeekday(idx)}
                className={`px-3 py-1 border rounded-full ${
                  selectedWeekdays.includes(idx)
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}

      {showNthWeekday && (
        <div>
          <label className="font-medium">Nth Weekday Pattern</label>
          <div className="mt-2 flex items-center gap-4">
            <select
              value={nthWeekday?.week ?? ''}
              onChange={(e) =>
                setNthWeekday({ week: parseInt(e.target.value), weekday: nthWeekday?.weekday ?? 0 })
              }
              className="border rounded px-2 py-1"
            >
              <option value="">Week</option>
              {weeks.map((w) => (
                <option key={w} value={w}>
                  {w === 1 ? '1st' : w === 2 ? '2nd' : w === 3 ? '3rd' : w === 4 ? '4th' : '5th'}
                </option>
              ))}
            </select>

            <select
              value={nthWeekday?.weekday ?? ''}
              onChange={(e) =>
                setNthWeekday({ week: nthWeekday?.week ?? 1, weekday: parseInt(e.target.value) })
              }
              className="border rounded px-2 py-1"
            >
              <option value="">Weekday</option>
              {weekdays.map((day, idx) => (
                <option key={idx} value={idx}>
                  {day}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <Button onClick={generateDates}>Apply</Button>
    </div>
  );
}