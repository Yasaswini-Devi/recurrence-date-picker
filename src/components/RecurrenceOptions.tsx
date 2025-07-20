'use client';
import { useRecurrenceStore } from '@/store/useRecurrenceStore';

const options = ['daily', 'weekly', 'monthly', 'yearly'] as const;

export default function RecurrenceOptions() {
  const { frequency, setFrequency, generateDates } = useRecurrenceStore();

  return (
    <div className="flex justify-evenly gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => {
            setFrequency(option);
            generateDates();
          }}
          className={`flex-1 text-center px-4 py-2 border rounded capitalize transition ${
            frequency === option ? 'bg-blue-950 text-white' : 'bg-white text-black'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}