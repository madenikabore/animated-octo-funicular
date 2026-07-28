import type { ReactNode } from 'react';

export function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-svh w-full flex items-center justify-center bg-[radial-gradient(circle_at_top,#dbe6de,#c7d3c9)] p-0 sm:p-6">
      <div className="relative w-full sm:w-[390px] h-svh sm:h-[812px] sm:max-h-[92vh] sm:rounded-[2.5rem] overflow-hidden bg-white shadow-2xl sm:ring-8 ring-neutral-900 flex flex-col">
        <StatusBar />
        <div className="flex-1 min-h-0 flex flex-col app-scrollbar overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="shrink-0 flex items-center justify-between px-6 pt-2 pb-1 text-[13px] font-semibold text-white bg-sotraco-green-900 z-20 relative">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor"><rect x="0" y="6" width="3" height="5" rx="0.5"/><rect x="4.5" y="4" width="3" height="7" rx="0.5"/><rect x="9" y="2" width="3" height="9" rx="0.5"/><rect x="13.5" y="0" width="3" height="11" rx="0.5"/></svg>
        <svg width="15" height="11" viewBox="0 0 15 11" fill="currentColor"><path d="M7.5 0C4.8 0 2.3 1 0.4 2.7L1.4 4C3 2.6 5.1 1.8 7.5 1.8s4.5.8 6.1 2.2l1-1.3C12.7 1 10.2 0 7.5 0zM7.5 3.6c-1.7 0-3.3.6-4.5 1.7l1 1.3c.9-.8 2.1-1.3 3.5-1.3s2.6.5 3.5 1.3l1-1.3c-1.2-1.1-2.8-1.7-4.5-1.7zM7.5 7.2c-.8 0-1.6.3-2.1.8L7.5 11l2.1-3c-.5-.5-1.3-.8-2.1-.8z"/></svg>
        <svg width="24" height="11" viewBox="0 0 24 11" fill="none"><rect x="0.5" y="0.5" width="20" height="10" rx="2.5" stroke="currentColor"/><rect x="2" y="2" width="17" height="7" rx="1.5" fill="currentColor"/><rect x="21.5" y="3.5" width="1.5" height="4" rx="0.75" fill="currentColor"/></svg>
      </span>
    </div>
  );
}

export function TopBar({
  title,
  onBack,
  tone = 'green',
}: {
  title: string;
  onBack?: () => void;
  tone?: 'green' | 'blue' | 'orange';
}) {
  const bg =
    tone === 'blue' ? 'bg-sotraco-blue-600' : tone === 'orange' ? 'bg-sotraco-orange-500' : 'bg-sotraco-green-900';
  return (
    <div className={`shrink-0 ${bg} text-white px-4 py-4 flex items-center gap-3 relative z-10`}>
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Retour"
          className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 -ml-1"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
      <h1 className="text-[17px] font-semibold">{title}</h1>
    </div>
  );
}
