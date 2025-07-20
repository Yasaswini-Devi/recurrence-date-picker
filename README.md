# Recurrence Picker

A customizable React component to select and generate recurring dates based on user-defined rules. Supports multiple recurrence patterns like daily, weekly, monthly (including "nth weekday" logic like 2nd Tuesday), and yearly.

---

## 🚀 Features

* Supports `daily`, `weekly`, `monthly`, and `yearly` recurrence frequencies
* Customizable `interval`, `startDate`, and `endDate`
* Supports `nth weekday` logic (e.g., 2nd Tuesday of every month)
* Uses Zustand for clean and reactive global state management
* Extensible recurrence logic through utility function
* Easy integration into any React app

---

## 🛠 Installation

```bash
npm install
# or
yarn install
```

To run the development server:

```bash
npm run dev
# or
yarn dev
```

---

## 📦 Folder Structure

```
├── components
│   └── CustomizationPanel.tsx     # UI for customizing recurrence
├── store
│   └── useRecurrenceStore.ts      # Zustand store managing state
├── utils
│   └── recurrenceUtils.ts         # Core recurrence generation logic
├── tests
│   ├── recurrenceUtils.test.ts    # Unit tests for recurrence logic
│   └── integration.test.tsx       # Integration tests
└── pages
    └── index.tsx                  # Main page (demo usage)
```

---

## 🔧 Usage

### 1. Using the Zustand Store

```ts
import { useRecurrenceStore } from '@/store/useRecurrenceStore';

const {
  startDate,
  endDate,
  frequency,
  interval,
  selectedWeekdays,
  recurringDates,
  setStartDate,
  setEndDate,
  setFrequency,
  toggleWeekday,
  generateDates,
} = useRecurrenceStore();
```

### 2. Generate Recurrence Dates

```ts
setStartDate(new Date('2025-01-01'));
setEndDate(new Date('2025-03-01'));
setFrequency('monthly');
setInterval(1);
setNthWeekday({ week: 2, weekday: 2 }); // 2nd Tuesday

generateDates();
```

---

## 📘 API Reference: `generateRecurringDates`

```ts
interface GenerateRecurringDatesParams {
  startDate: Date;
  endDate?: Date;
  frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
  interval: number;
  selectedWeekdays?: number[]; // 0 (Sunday) to 6 (Saturday)
  nthWeekday?: {
    week: number;     // 1-5 or -1 for last week
    weekday: number;  // 0 (Sunday) to 6 (Saturday)
  };
}
```

#### Returns:

```ts
Date[] // Array of generated recurrence dates
```

#### Notes:

* `selectedWeekdays` is required for `weekly` frequency
* `nthWeekday` is used for `monthly` and `yearly` with "nth weekday" patterns

---

## 🧪 Testing

### Unit Tests

Located in `tests/recurrenceUtils.test.ts`:

* Validate all frequency types
* Edge case handling (e.g. leap years, endDate bounds)
* Nth weekday logic (1st Monday, last Friday, etc.)

### Integration Tests

Located in `tests/integration.test.tsx`:

* Full end-to-end flow
* Mimics user interaction with `CustomizationPanel`
* Verifies store update and rendered dates

Run all tests:

```bash
npm test
```

Run in watch mode:

```bash
npm run test:watch
```

---

## 🧰 Tech Stack

* React + TypeScript
* Zustand for state management
* date-fns for date utilities
* Jest + React Testing Library for tests
* Vite for fast development server
