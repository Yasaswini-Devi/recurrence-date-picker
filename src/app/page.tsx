'use client';
import { useState } from 'react';
import '@/app/globals.css';
import RecurrenceOptions from '@/components/RecurrenceOptions';
import DatePicker from '@/components/DatePicker';
import CalendarPreview from '@/components/CalendarPreview';
import CustomizationPanel from '@/components/CustomizationPanel';
import RecurrenceTags from '@/components/RecurrenceTags';

export default function Home() {
  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">Recurring Date Picker</h1>
      <DatePicker />
      <RecurrenceOptions />
      <CustomizationPanel />
      <RecurrenceTags />
      <CalendarPreview />
    </div>
  );
}