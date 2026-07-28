import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { TopBar } from '../components/PhoneFrame';
import { BUS_LINES, DEPARTURE_FREQUENCY_NOTE } from '../data/mock';

export function LinesSchedule() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const urban = useMemo(
    () => BUS_LINES.filter((l) => l.kind === 'urbaine' && l.number.toLowerCase().includes(query.toLowerCase())),
    [query],
  );
  const suburban = useMemo(
    () =>
      BUS_LINES.filter(
        (l) => l.kind === 'suburbaine' && l.number.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  return (
    <div className="flex-1 flex flex-col bg-neutral-50">
      <TopBar title="Lignes & Horaires" onBack={() => navigate('/dashboard')} tone="orange" />

      <div className="shrink-0 px-4 pt-3 pb-2 bg-white border-b border-neutral-100">
        <div className="flex items-center gap-2 bg-neutral-100 rounded-xl px-3 py-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400 shrink-0">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un numéro de ligne..."
            className="flex-1 bg-transparent text-[14px] focus:outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto app-scrollbar px-4 py-4 flex flex-col gap-5">
        <div className="rounded-xl bg-sotraco-orange-100 border border-sotraco-orange-500/30 px-3.5 py-2.5">
          <p className="text-[12px] font-semibold text-sotraco-orange-600">Programme Vacances</p>
          <p className="text-[11px] text-neutral-600">Du 1er août au 30 septembre 2026 · {DEPARTURE_FREQUENCY_NOTE}</p>
        </div>

        <section>
          <h2 className="text-sm font-semibold text-neutral-700 mb-2">Lignes urbaines</h2>
          <div className="rounded-xl bg-white border border-neutral-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_1fr] gap-2 px-3 py-2 bg-neutral-50 text-[10px] font-semibold text-neutral-500 uppercase tracking-wide">
              <span>Ligne</span>
              <span>Lun–Sam</span>
              <span>Dim & fériés</span>
            </div>
            {urban.map((line) => (
              <div key={line.id} className="grid grid-cols-[auto_1fr_1fr] gap-2 items-center px-3 py-2.5 border-t border-neutral-100">
                <span
                  className="text-[11px] font-bold text-white rounded-md px-2 py-1 text-center shrink-0"
                  style={{ backgroundColor: line.color }}
                >
                  L{line.number}
                </span>
                <span className="text-[12px] text-neutral-700 tabular-nums">
                  {line.weekday.start}–{line.weekday.end}
                </span>
                <span className="text-[12px] text-neutral-700 tabular-nums">
                  {line.sundayHoliday.start}–{line.sundayHoliday.end}
                </span>
              </div>
            ))}
            {urban.length === 0 && <p className="px-3 py-4 text-[13px] text-neutral-400 text-center">Aucune ligne trouvée</p>}
          </div>
        </section>

        <section>
          <h2 className="text-sm font-semibold text-neutral-700 mb-2">Lignes suburbaines</h2>
          <div className="rounded-xl bg-white border border-neutral-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-[auto_1fr_1fr] gap-2 px-3 py-2 bg-neutral-50 text-[10px] font-semibold text-neutral-500 uppercase tracking-wide">
              <span>Destination</span>
              <span>Lun–Sam</span>
              <span>Dim & fériés</span>
            </div>
            {suburban.map((line) => (
              <div key={line.id} className="grid grid-cols-[auto_1fr_1fr] gap-2 items-center px-3 py-2.5 border-t border-neutral-100">
                <span
                  className="text-[11px] font-bold text-white rounded-md px-2 py-1 text-center shrink-0"
                  style={{ backgroundColor: line.color }}
                >
                  {line.number}
                </span>
                <span className="text-[12px] text-neutral-700 tabular-nums">
                  {line.weekday.start}–{line.weekday.end}
                </span>
                <span className="text-[12px] text-neutral-700 tabular-nums">
                  {line.sundayHoliday.start}–{line.sundayHoliday.end}
                </span>
              </div>
            ))}
            {suburban.length === 0 && <p className="px-3 py-4 text-[13px] text-neutral-400 text-center">Aucune ligne trouvée</p>}
          </div>
        </section>

        <button
          onClick={() => navigate('/map')}
          className="w-full py-3 rounded-xl bg-sotraco-green-700 text-white font-semibold text-sm"
        >
          Suivre les bus en temps réel
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
