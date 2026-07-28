import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { BUS_LINES, LIVE_BUSES, NEXT_BUSES } from '../data/mock';

const QUICK_ACTIONS = [
  { key: 'suivi', label: 'Suivi\nBus', to: '/map', bg: 'bg-sotraco-green-700', icon: 'bus' },
  { key: 'payer', label: 'Payer', to: '/subscriptions', bg: 'bg-sotraco-blue-600', icon: 'pay' },
  { key: 'pass', label: 'Mon\nPass', to: '/pass', bg: 'bg-sotraco-purple-600', icon: 'pass' },
  { key: 'lignes', label: 'Lignes', to: '/lines', bg: 'bg-sotraco-orange-500', icon: 'lines' },
] as const;

function ActionIcon({ icon }: { icon: string }) {
  const common = { width: 20, height: 20, viewBox: '0 0 24 24', fill: 'none', stroke: 'white', strokeWidth: 2 } as const;
  if (icon === 'bus')
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="12" rx="2.5" />
        <path d="M3 11h18" />
        <circle cx="7.5" cy="19" r="1.3" fill="white" stroke="none" />
        <circle cx="16.5" cy="19" r="1.3" fill="white" stroke="none" />
      </svg>
    );
  if (icon === 'pay')
    return (
      <svg {...common}>
        <rect x="2" y="6" width="20" height="13" rx="2" />
        <path d="M2 10h20" />
      </svg>
    );
  if (icon === 'pass')
    return (
      <svg {...common}>
        <rect x="5" y="3" width="14" height="18" rx="2" />
        <path d="M9 8h6M9 12h6M9 16h3" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" strokeLinejoin="round" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  );
}

export function Dashboard() {
  const navigate = useNavigate();
  const { user, subscription } = useApp();

  const today = new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });
  const dayCapitalized = today.charAt(0).toUpperCase() + today.slice(1);

  return (
    <div className="flex-1 flex flex-col bg-neutral-50">
      <div className="bg-sotraco-green-900 text-white px-5 pt-5 pb-8 flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold">Bonjour, {user?.firstName ?? 'Voyageur'} 👋</h1>
          <p className="text-sotraco-green-100/70 text-[13px] mt-0.5">{dayCapitalized}</p>
        </div>
        <div className="w-9 h-9 rounded-full bg-sotraco-orange-500 flex items-center justify-center text-[13px] font-bold shrink-0">
          {user?.avatarInitials ?? 'US'}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto app-scrollbar px-5 -mt-5 pb-6 flex flex-col gap-5">
        <div className="rounded-2xl bg-gradient-to-br from-sotraco-green-600 to-sotraco-green-800 text-white p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[12px] text-white/80">
              {subscription ? `Solde ${subscription.planLabel}` : 'Aucun abonnement actif'}
            </span>
            {subscription && (
              <span className="text-[11px] bg-white/15 rounded-full px-2 py-0.5">Actif jusqu'au {subscription.expiresAt}</span>
            )}
          </div>
          <p className="text-2xl font-bold mt-1">
            {subscription ? new Intl.NumberFormat('fr-FR').format(subscription.price) + ' F CFA' : ''}
          </p>
          {!subscription && (
            <button
              onClick={() => navigate('/subscriptions')}
              className="mt-2 text-[13px] font-semibold bg-sotraco-orange-500 rounded-lg px-3 py-1.5"
            >
              Souscrire un pass →
            </button>
          )}
        </div>

        <div>
          <h2 className="text-sm font-semibold text-neutral-700 mb-2.5">Actions rapides</h2>
          <div className="grid grid-cols-4 gap-3">
            {QUICK_ACTIONS.map((action) => (
              <button
                key={action.key}
                onClick={() => navigate(action.to)}
                className="flex flex-col items-center gap-1.5"
              >
                <span className={`w-12 h-12 rounded-2xl ${action.bg} flex items-center justify-center shadow-sm`}>
                  <ActionIcon icon={action.icon} />
                </span>
                <span className="text-[11px] text-neutral-600 font-medium whitespace-pre-line leading-tight text-center">
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-neutral-700 mb-2.5">Prochains bus à votre arrêt</h2>
          <div className="flex flex-col gap-2">
            {NEXT_BUSES.map((nb) => {
              const line = BUS_LINES.find((l) => l.id === nb.lineId)!;
              return (
                <button
                  key={nb.lineId}
                  onClick={() => navigate('/map')}
                  className="w-full flex items-center gap-3 bg-white rounded-xl p-3 shadow-sm border border-neutral-100 text-left"
                >
                  <span
                    className="text-[11px] font-bold text-white rounded-md px-2 py-1 shrink-0"
                    style={{ backgroundColor: line.color }}
                  >
                    {line.kind === 'urbaine' ? `L${line.number}` : line.number}
                  </span>
                  <span className="flex-1 text-[13px] text-neutral-700">
                    {LIVE_BUSES.find((b) => b.lineId === line.id)?.nextStop ?? line.areas}
                  </span>
                  <span className="text-[13px] font-semibold text-sotraco-green-700">{nb.etaMinutes} min</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
