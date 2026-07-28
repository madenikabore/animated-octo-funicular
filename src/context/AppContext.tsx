import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { AccountType, ActiveSubscription, PaymentMethodId, Plan, User } from '../types';

interface Transaction {
  id: string;
  planLabel: string;
  amount: number;
  method: PaymentMethodId;
  date: string;
}

interface AppState {
  user: User | null;
  subscription: ActiveSubscription | null;
  transactions: Transaction[];
  isAuthenticated: boolean;
  login: (phone: string) => void;
  register: (data: { firstName: string; lastName: string; phone: string; email: string; accountType: AccountType }) => void;
  logout: () => void;
  subscribeToPlan: (plan: Plan, method: PaymentMethodId) => void;
}

const STORAGE_KEY = 'sotraco-connect-state';

const DEFAULT_USER: User = {
  firstName: 'Ibrahim',
  lastName: 'KABORÉ',
  phone: '+226 70 12 34 56',
  email: 'ibrahim@sotraco.bf',
  accountType: 'Usager',
  avatarInitials: 'IK',
};

function loadPersisted(): { user: User | null; subscription: ActiveSubscription | null; transactions: Transaction[] } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { user: null, subscription: null, transactions: [] };
    return JSON.parse(raw);
  } catch {
    return { user: null, subscription: null, transactions: [] };
  }
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => loadPersisted().user);
  const [subscription, setSubscription] = useState<ActiveSubscription | null>(() => loadPersisted().subscription);
  const [transactions, setTransactions] = useState<Transaction[]>(() => loadPersisted().transactions);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, subscription, transactions }));
  }, [user, subscription, transactions]);

  const login = (phone: string) => {
    setUser({ ...DEFAULT_USER, phone: phone || DEFAULT_USER.phone });
  };

  const register: AppState['register'] = (data) => {
    const initials = `${data.firstName[0] ?? ''}${data.lastName[0] ?? ''}`.toUpperCase();
    setUser({
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      email: data.email,
      accountType: data.accountType,
      avatarInitials: initials || 'US',
    });
  };

  const logout = () => {
    setUser(null);
    setSubscription(null);
    setTransactions([]);
  };

  const subscribeToPlan = (plan: Plan, method: PaymentMethodId) => {
    const now = new Date();
    const expires = new Date(now);
    const durationDays: Record<Plan['id'], number> = {
      unitaire: 0,
      jour: 1,
      semaine: 7,
      mois: 30,
      annuel: 365,
    };
    expires.setDate(expires.getDate() + (durationDays[plan.id] || 30));

    const fmt = (d: Date) => d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const initials = user?.avatarInitials ?? 'US';

    setSubscription({
      planId: plan.id,
      planLabel: plan.label,
      price: plan.price,
      purchasedAt: fmt(now),
      expiresAt: fmt(expires),
      passCode: `SOTR-${now.getFullYear()}-${initials}-${Math.floor(1000 + Math.random() * 9000)}`,
    });

    setTransactions((prev) => [
      { id: crypto.randomUUID(), planLabel: plan.label, amount: plan.price, method, date: fmt(now) },
      ...prev,
    ]);
  };

  const value: AppState = {
    user,
    subscription,
    transactions,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    subscribeToPlan,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
