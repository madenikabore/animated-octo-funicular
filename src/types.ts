export type AccountType = 'Usager' | 'Étudiant' | 'Sénior';

export interface User {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  accountType: AccountType;
  avatarInitials: string;
}

export interface Plan {
  id: 'unitaire' | 'jour' | 'semaine' | 'mois' | 'annuel';
  label: string;
  durationLabel: string;
  price: number;
  popular?: boolean;
}

export interface ActiveSubscription {
  planId: Plan['id'];
  planLabel: string;
  price: number;
  purchasedAt: string;
  expiresAt: string;
  passCode: string;
}

export type PaymentMethodId = 'orange' | 'moov' | 'coris' | 'wave' | 'telecel';

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  recommended?: boolean;
}

export interface ScheduleWindow {
  start: string;
  end: string;
}

export interface BusLine {
  id: string;
  number: string;
  kind: 'urbaine' | 'suburbaine';
  areas: string;
  color: string;
  weekday: ScheduleWindow;
  sundayHoliday: ScheduleWindow;
}

export interface LiveBus {
  id: string;
  lineId: string;
  driver: string;
  seatsAvailable: number;
  nextStop: string;
  etaMinutes: number;
  lastDeparture: string;
  status: 'EN ROUTE' | 'À QUAI' | 'RETARD';
  x: number;
  y: number;
}
