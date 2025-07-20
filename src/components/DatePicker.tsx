'use client';
import { useRecurrenceStore } from '@/store/useRecurrenceStore';

export default function DatePicker() {
  const { startDate, endDate, setStartDate, setEndDate, generateDates } = useRecurrenceStore();

  return (
    <div className="space-y-2">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Start Date Picker */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">Start Date</label>
          <input
            type="date"
            value={startDate.toISOString().split('T')[0]}
            onChange={(e) => {
              setStartDate(new Date(e.target.value));
              generateDates();
            }}
            className="border rounded p-2 w-full"
          />
        </div>

        {/* End Date Picker */}
        <div className="flex-1">
          <label className="block text-sm font-medium mb-1">End Date (optional)</label>
          <input
            type="date"
            value={endDate ? endDate.toISOString().split('T')[0] : ''}
            onChange={(e) => {
              setEndDate(e.target.value ? new Date(e.target.value) : undefined);
              generateDates();
            }}
            className="border rounded p-2 w-full"
          />
        </div>
      </div>
    </div>
  );
}