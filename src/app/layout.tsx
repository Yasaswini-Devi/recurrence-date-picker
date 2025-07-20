export const metadata = {
  title: 'Recurring Date Picker',
  description: 'A simple recurring date picker UI',
};

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen text-gray-900">{children}</body>
    </html>
  );
}