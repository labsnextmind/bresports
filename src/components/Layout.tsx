import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <main className="p-4">{children}</main>
    </div>
  );
}
