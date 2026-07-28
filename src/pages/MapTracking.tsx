import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { SatelliteMap } from '../components/SatelliteMap';
import { BUS_LINES, LIVE_BUSES } from '../data/mock';
import type { BusLine } from '../types';

function lineBadge(line: BusLine) {
  return line.kind === 'urbaine' ? `L${line.number}` : line.number;
}

const TRACKED_LINES = LIVE_BUSES.map((b) => BUS_LINES.find((l) => l.id === b.lineId)!);

export function MapTracking() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [selectedLineId, setSelectedLineId] = useState<string>(TRACKED_LINES[0].id);
  const [focusRequestId, setFocusRequestId] = useState(0);

  const selectLine = (lineId: string) => {
    setSelectedLineId(lineId);
    setFocusRequestId((n) => n + 1);
  };

  const filteredLines = useMemo(
    () =>
      TRACKED_LINES.filter((l) => `${l.number} ${l.areas}`.toLowerCase().includes(query.toLowerCase())),
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
              onClick={() => selectLine(line.id)}
              className={`shrink-0 text-[12px] font-bold px-3 py-1.5 rounded-full text-white transition-transform ${
                selectedLineId === line.id ? 'scale-105 ring-2 ring-offset-1' : 'opacity-80'
              }`}
              style={{ backgroundColor: line.color }}
            >
              {lineBadge(line)}
            </button>
          ))}
        </div>
        <button
          onClick={() => navigate('/lines')}
          className="mt-2 text-[12px] font-semibold text-sotraco-green-700"
        >
          Voir toutes les lignes & horaires →
        </button>
      </div>

      <div className="relative flex-1 min-h-[220px] overflow-hidden">
        <SatelliteMap
          buses={LIVE_BUSES}
          lines={BUS_LINES}
          selectedLineId={selectedLineId}
          onSelectBus={selectLine}
          focusRequestId={focusRequestId}
        />
      </div>

      {bus && (
        <div className="shrink-0 bg-white rounded-t-2xl shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-4 pt-4 pb-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-neutral-800">
              {selectedLine.kind === 'urbaine' ? `Ligne ${selectedLine.number}` : selectedLine.number} —{' '}
              {selectedLine.areas}
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
