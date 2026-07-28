import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { useApp } from '../context/AppContext';
import { FAVORITE_STOPS } from '../data/mock';

const MENU: { key: string; label: string; sub: (ctx: ReturnType<typeof useApp>) => string; color: string; icon: string }[] = [
  {
    key: 'abonnements',
    label: 'Mes Abonnements',
    sub: (ctx) => (ctx.subscription ? `${ctx.subscription.planLabel} actif` : 'Aucun abonnement actif'),
    color: 'bg-sotraco-green-700',
    icon: 'pass',
  },
  {
    key: 'paiements',
    label: 'Mes Paiements',
    sub: (ctx) => `${ctx.transactions.length} transaction${ctx.transactions.length > 1 ? 's' : ''} ce mois`,
    color: 'bg-sotraco-blue-600',
    icon: 'pay',
  },
  {
    key: 'notifications',
    label: 'Notifications',
    sub: () => '8 non lues',
    color: 'bg-sotraco-orange-500',
    icon: 'bell',
  },
  {
    key: 'favoris',
    label: 'Mes Arrêts Favoris',
    sub: () => FAVORITE_STOPS.join(', '),
    color: 'bg-sotraco-green-700',
    icon: 'pin',
  },
  {
    key: 'parametres',
    label: 'Paramètres',
    sub: () => 'Langue, sécurité...',
    color: 'bg-neutral-500',
    icon: 'gear',
  },
  {
    key: 'aide',
    label: 'Aide & Support',
    sub: () => 'FAQ, Contact',
    color: 'bg-sotraco-purple-600',
    icon: 'help',
  },
];

function MenuIcon({ icon }: { icon: string }) {
  const props = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'white', strokeWidth: 2 } as const;
  switch (icon) {
    case 'pass':
      return (
        <svg {...props}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 8h6M9 12h6M9 16h3" />
        </svg>
      );
    case 'pay':
      return (
        <svg {...props}>
          <rect x="2" y="6" width="20" height="13" rx="2" />
          <path d="M2 10h20" />
        </svg>
      );
    case 'bell':
      return (
        <svg {...props}>
          <path d="M6 8a6 6 0 0112 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6z" />
          <path d="M10 18a2 2 0 004 0" />
        </svg>
      );
    case 'pin':
      return (
        <svg {...props}>
          <path d="M12 21s7-6.5 7-11.5a7 7 0 10-14 0C5 14.5 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.2" />
        </svg>
      );
    case 'gear':
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 13.5a7.4 7.4 0 000-3l2-1.5-2-3.4-2.3.9a7.4 7.4 0 00-2.6-1.5L14 2h-4l-.5 2c-.9.3-1.8.8-2.6 1.5l-2.3-.9-2 3.4 2 1.5a7.4 7.4 0 000 3l-2 1.5 2 3.4 2.3-.9c.8.7 1.7 1.2 2.6 1.5l.5 2h4l.5-2c.9-.3 1.8-.8 2.6-1.5l2.3.9 2-3.4-2-1.5z" />
        </svg>
      );
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="9" />
          <path d="M9.5 9a2.5 2.5 0 015 .5c0 1.5-2 1.7-2 3.5" />
          <path d="M12 17h.01" />
        </svg>
      );
  }
}

export function Profile() {
  const navigate = useNavigate();
  const app = useApp();
  const { user, logout } = app;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex-1 flex flex-col bg-neutral-50">
      <div className="bg-sotraco-green-900 text-white px-5 pt-6 pb-5 flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-full bg-sotraco-orange-500 flex items-center justify-center font-bold text-lg mb-2">
          {user?.avatarInitials}
        </div>
        <p className="font-semibold">
          {user?.firstName} {user?.lastName}
        </p>
        <span className="text-[11px] text-sotraco-orange-500 font-semibold mt-0.5">Usager Premium</span>

        <div className="grid grid-cols-3 gap-2 w-full mt-4">
          <Stat value="47" label="Trajets" />
          <Stat value="3" label="Mois actif" />
          <Stat value="4.8 ★" label="Note" />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto app-scrollbar px-5 py-4 flex flex-col gap-2.5">
        {MENU.map((item) => (
          <button
            key={item.key}
            className="w-full flex items-center gap-3 bg-white rounded-xl border border-neutral-100 shadow-sm p-3.5 text-left"
          >
            <span className={`w-9 h-9 rounded-full ${item.color} flex items-center justify-center shrink-0`}>
              <MenuIcon icon={item.icon} />
            </span>
            <span className="flex-1">
              <span className="block text-[14px] font-semibold text-neutral-800">{item.label}</span>
              <span className="block text-[12px] text-neutral-400">{item.sub(app)}</span>
            </span>
            <span className="text-neutral-300">›</span>
          </button>
        ))}

        <button
          onClick={handleLogout}
          className="w-full py-3 mt-2 rounded-xl border border-red-200 text-red-600 font-semibold text-sm"
        >
          Se déconnecter
        </button>
      </div>

      <BottomNav />
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-white/10 rounded-lg py-2">
      <p className="text-[15px] font-bold">{value}</p>
      <p className="text-[10px] text-white/70">{label}</p>
    </div>
  );
}
