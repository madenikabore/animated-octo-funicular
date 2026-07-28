import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { BUS_LINES, LIVE_BUSES } from '../data/mock';

export function MapTracking() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedLineId, setSelectedLineId] = useState<string>('l3');

  const filteredLines = useMemo(
    () =>
      BUS_LINES.filter((l) =>
        `${l.number} ${l.from} ${l.to}`.toLowerCase().includes(query.toLowerCase()),
      ),
    [query],
  );

  const selectedLine = BUS_LINES.find((l) => l.id === selectedLineId) ?? BUS_LINES[0];
  const bus = LIVE_BUSES.find((b) => b.lineId === selectedLineId);

  return (
    <div className="flex-1 flex flex-col bg-neutral-50">
      <div className="shrink-0 px-4 pt-4 pb-3 bg-white border-b border-neutral-100">
        <div className="flex items-center gap-2 bg-neutral-100 rounded-xl px-3 py-2.5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-neutral-400 shrink-0">
            <circle cx="11" cy="11" r="7" />
            <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher une ligne ou un arrêt..."
            className="flex-1 bg-transparent text-[14px] focus:outline-none"
          />
        </div>
        <div className="flex gap-2 mt-2.5 overflow-x-auto app-scrollbar">
          {filteredLines.map((line) => (
            <button
              key={line.id}
              onClick={() => setSelectedLineId(line.id)}
              className={`shrink-0 text-[12px] font-bold px-3 py-1.5 rounded-full text-white transition-transform ${
                selectedLineId === line.id ? 'scale-105 ring-2 ring-offset-1' : 'opacity-80'
              }`}
              style={{ backgroundColor: line.color }}
            >
              {line.number.replace('Ligne ', 'L')}
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex-1 min-h-[220px] bg-[#dfe8e0] overflow-hidden">
        <MapGrid />
        {LIVE_BUSES.map((b) => {
          const line = BUS_LINES.find((l) => l.id === b.lineId)!;
          const isSelected = b.lineId === selectedLineId;
          return (
            <button
              key={b.id}
              onClick={() => setSelectedLineId(b.lineId)}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              style={{ left: `${b.x}%`, top: `${b.y}%` }}
            >
              <span
                className="relative flex items-center justify-center w-8 h-8 rounded-full text-white shadow-lg bus-marker"
                style={
                  {
                    backgroundColor: line.color,
                    '--drift-x': `${(b.x % 3) - 1}px`,
                    '--drift-y': `${(b.y % 3) - 1}px`,
                    outline: isSelected ? '3px solid white' : 'none',
                    outlineOffset: '1px',
                  } as React.CSSProperties
                }
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                  <rect x="3" y="6" width="18" height="11" rx="2" />
                </svg>
              </span>
              <span
                className="text-[10px] font-bold text-white rounded px-1 -mt-0.5"
                style={{ backgroundColor: line.color }}
              >
                {line.number.replace('Ligne ', 'L')}
              </span>
            </button>
          );
        })}
      </div>

      {bus && (
        <div className="shrink-0 bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-4 pt-4 pb-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-neutral-800">
              {selectedLine.number} — {selectedLine.from} → {selectedLine.to}
            </p>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                bus.status === 'RETARD' ? 'bg-red-100 text-red-600' : 'bg-sotraco-green-100 text-sotraco-green-700'
              }`}
            >
              {bus.status}
            </span>
          </div>
          <p className="text-[13px] text-neutral-500">
            Prochain arrêt : {bus.nextStop} · <span className="font-semibold text-sotraco-green-700">{bus.etaMinutes} min</span>
          </p>
          <p className="text-[13px] text-neutral-500">
            Bus {bus.id} — {bus.seatsAvailable} places
          </p>
          <div className="flex gap-2 mt-1">
            <button
              onClick={() => navigate('/bus-identify', { state: { busId: bus.id } })}
              className="flex-1 py-2.5 rounded-lg bg-sotraco-orange-500 text-white text-[13px] font-semibold"
            >
              Identifier ce bus
            </button>
            <button className="flex-1 py-2.5 rounded-lg bg-sotraco-green-700 text-white text-[13px] font-semibold">
              Voir tous les bus
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </div>
  );
}

function MapGrid() {
  return (
    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
      <defs>
        <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#c7d3c9" strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#grid)" />
      <path d="M0,55 L100,45" stroke="#f5d97a" strokeWidth="2.5" />
      <path d="M20,0 L30,100" stroke="#fff" strokeWidth="3" opacity="0.6" />
    </svg>
  );
}
