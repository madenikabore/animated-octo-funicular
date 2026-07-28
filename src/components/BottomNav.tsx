import { NavLink } from 'react-router-dom';

const ICONS: Record<string, (active: boolean) => React.ReactNode> = {
  home: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M3 11l9-7 9 7v8a2 2 0 01-2 2h-4a1 1 0 01-1-1v-5H9v5a1 1 0 01-1 1H4a2 2 0 01-2-2v-8z" strokeLinejoin="round" />
    </svg>
  ),
  map: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2z" strokeLinejoin="round" />
      <path d="M9 4v14M15 6v14" />
    </svg>
  ),
  card: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20" strokeWidth="2" />
    </svg>
  ),
  pass: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <rect x="4" y="3" width="16" height="18" rx="2" />
      <path d="M8 8h8M8 12h8M8 16h4" />
    </svg>
  ),
  user: (active) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
    </svg>
  ),
};

const TABS = [
  { to: '/dashboard', label: 'Accueil', icon: 'home' },
  { to: '/map', label: 'Carte', icon: 'map' },
  { to: '/subscriptions', label: 'Paiement', icon: 'card' },
  { to: '/pass', label: 'Pass', icon: 'pass' },
  { to: '/profile', label: 'Profil', icon: 'user' },
] as const;

export function BottomNav() {
  return (
    <nav className="shrink-0 border-t border-neutral-200 bg-white flex items-stretch justify-around px-1 pb-1 pt-1.5">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 flex-1 py-1 rounded-lg text-[11px] font-medium transition-colors ${
              isActive ? 'text-sotraco-green-700' : 'text-neutral-400'
            }`
          }
        >
          {({ isActive }) => (
            <>
              {ICONS[tab.icon](isActive)}
              <span>{tab.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
}
