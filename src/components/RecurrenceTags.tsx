'use client';
import { useRecurrenceStore } from '@/store/useRecurrenceStore';

export default function RecurrenceTags() {
  const { startDate, endDate, frequency, interval } = useRecurrenceStore();

  return (
    <div className="bg-gray-200 p-2 rounded text-sm">
      <p>Repeat: every {interval} {frequency}</p>
      <p>From: {startDate.toDateString()}</p>
      <p>To: {endDate ? endDate.toDateString() : 'No end date'}</p>
    </div>
  );
}