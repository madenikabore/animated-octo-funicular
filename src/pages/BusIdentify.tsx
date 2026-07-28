import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { TopBar } from '../components/PhoneFrame';
import { BUS_LINES, LIVE_BUSES } from '../data/mock';

export function BusIdentify() {
  const navigate = useNavigate();
  const location = useLocation();
  const [reported, setReported] = useState(false);
  const [rated, setRated] = useState(0);

  const busId = (location.state as { busId?: string } | null)?.busId ?? LIVE_BUSES[0].id;
  const bus = LIVE_BUSES.find((b) => b.id === busId) ?? LIVE_BUSES[0];
  const line = BUS_LINES.find((l) => l.id === bus.lineId)!;

  return (
    <div className="flex-1 flex flex-col bg-neutral-50">
      <TopBar title="Identifier mon Bus" onBack={() => navigate('/map')} tone="orange" />

      <div className="flex-1 overflow-y-auto app-scrollbar px-5 py-4 flex flex-col gap-4">
        <div className="relative rounded-2xl bg-neutral-900 aspect-[4/3] flex flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-4 border-2 border-sotraco-orange-500 rounded-xl" />
          <div className="absolute inset-x-8 top-1/2 h-0.5 bg-sotraco-orange-500/80" />
          <svg width="70" height="70" viewBox="0 0 24 24" className="text-neutral-600" fill="currentColor">
            <path d="M5 5h4v2H7v2H5zM15 5h4v4h-2V7h-2zM5 15h2v2h2v2H5zM17 15h2v4h-4v-2h2z" />
            <rect x="9" y="9" width="6" height="6" />
          </svg>
          <p className="absolute bottom-3 text-white/70 text-[12px]">Pointez vers le QR Code du bus</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-4">
          <p className="text-sm font-semibold text-neutral-700 mb-2.5">Informations du Bus</p>
          <dl className="flex flex-col gap-2 text-[13px]">
            <Row label="Numéro Bus" value={bus.id} />
            <Row label="Ligne" value={`${line.number} — ${line.from} → ${line.to}`} />
            <Row label="Conducteur" value={bus.driver} />
            <Row label="Dernier départ" value={bus.lastDeparture} />
            <Row label="Places dispo" value={`${bus.seatsAvailable} places disponibles`} />
          </dl>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setReported(true)}
            disabled={reported}
            className="flex-1 py-3 rounded-xl bg-sotraco-orange-500 text-white font-semibold text-sm disabled:opacity-60"
          >
            {reported ? 'Signalé ✓' : 'Signaler'}
          </button>
          <div className="flex-1 rounded-xl bg-sotraco-green-700 text-white font-semibold text-sm flex items-center justify-center gap-1 py-3">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} onClick={() => setRated(n)} aria-label={`Noter ${n}`}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill={n <= rated ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="text-neutral-400 shrink-0">{label}</dt>
      <dd className="text-right font-medium text-neutral-700">{value}</dd>
    </div>
  );
}
