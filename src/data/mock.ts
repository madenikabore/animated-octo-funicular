import type { BusLine, LiveBus, PaymentMethod, Plan } from '../types';

export const PLANS: Plan[] = [
  { id: 'unitaire', label: 'Ticket Unitaire', durationLabel: '1 trajet', price: 200 },
  { id: 'jour', label: 'Pass Journée', durationLabel: '24 heures', price: 800 },
  { id: 'semaine', label: 'Pass Semaine', durationLabel: '7 jours', price: 4000, popular: true },
  { id: 'mois', label: 'Pass Mensuel', durationLabel: '30 jours', price: 12000 },
  { id: 'annuel', label: 'Pass Annuel', durationLabel: '365 jours', price: 120000 },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  { id: 'orange', label: 'Orange Money' },
  { id: 'moov', label: 'Moov Money', recommended: true },
  { id: 'coris', label: 'Coris Money' },
  { id: 'card', label: 'Carte Bancaire' },
];

export const BUS_LINES: BusLine[] = [
  { id: 'l3', number: 'Ligne 3', from: 'Zogona', to: 'Ouaga2000', color: '#279447' },
  { id: 'l7', number: 'Ligne 7', from: 'Pissy', to: 'Zone du Bois', color: '#1d6fd8' },
  { id: 'l12', number: 'Ligne 12', from: 'Paspanga', to: 'Gounghin', color: '#e8951f' },
];

export const NEXT_BUSES = [
  { lineId: 'l3', etaMinutes: 3 },
  { lineId: 'l7', etaMinutes: 11 },
  { lineId: 'l12', etaMinutes: 18 },
];

export const LIVE_BUSES: LiveBus[] = [
  {
    id: 'SOTR-042',
    lineId: 'l3',
    driver: 'Oumarou ZONGO',
    seatsAvailable: 12,
    nextStop: 'Station Centrale',
    etaMinutes: 3,
    lastDeparture: '09:45 — Station Centrale',
    status: 'EN ROUTE',
    x: 42,
    y: 46,
  },
  {
    id: 'SOTR-071',
    lineId: 'l7',
    driver: 'Aminata SAWADOGO',
    seatsAvailable: 6,
    nextStop: 'Zone du Bois',
    etaMinutes: 11,
    lastDeparture: '09:38 — Pissy Marché',
    status: 'EN ROUTE',
    x: 68,
    y: 58,
  },
  {
    id: 'SOTR-128',
    lineId: 'l12',
    driver: 'Boukary OUEDRAOGO',
    seatsAvailable: 2,
    nextStop: 'Gounghin',
    etaMinutes: 18,
    lastDeparture: '09:20 — Paspanga',
    status: 'RETARD',
    x: 58,
    y: 30,
  },
];

export const FAVORITE_STOPS = ['Zogona', 'ZACA', 'Ouaga2000'];
