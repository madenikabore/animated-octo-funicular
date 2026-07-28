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
  { id: 'wave', label: 'Wave' },
  { id: 'telecel', label: 'Telecel Money' },
];

// Numéros de lignes et horaires — Programme Vacances SOTRACO, 1er août au 30 sept. 2026
const URBAN_NUMBERS = [
  '1', '2', '2B', '3', '4', '4B', '5', '5B', '6', '6B', '9', '10', '11 et 12', '13', '15', '16', '17',
];

const LINE_COLORS = [
  '#279447', '#1d6fd8', '#e8951f', '#832548', '#c62828',
  '#6d3aa8', '#0f9b8e', '#b8860b', '#2f7de0', '#d1495b',
];

const URBAN_WEEKDAY = { start: '05:30', end: '20:10' };
const URBAN_SUNDAY = { start: '07:00', end: '19:00' };

export const BUS_LINES: BusLine[] = [
  ...URBAN_NUMBERS.map((number, i) => ({
    id: `l-${number.replace(/\s/g, '').toLowerCase()}`,
    number,
    kind: 'urbaine' as const,
    areas: 'Réseau urbain — Ouagadougou',
    color: LINE_COLORS[i % LINE_COLORS.length],
    weekday: URBAN_WEEKDAY,
    sundayHoliday: URBAN_SUNDAY,
  })),
  {
    id: 'l-ziniare',
    number: 'Ziniaré',
    kind: 'suburbaine',
    areas: 'Ouagadougou ↔ Ziniaré',
    color: '#279447',
    weekday: { start: '05:45', end: '18:05' },
    sundayHoliday: { start: '06:30', end: '18:05' },
  },
  {
    id: 'l-pabre',
    number: 'Pabré',
    kind: 'suburbaine',
    areas: 'Ouagadougou ↔ Pabré',
    color: '#1d6fd8',
    weekday: { start: '05:45', end: '19:30' },
    sundayHoliday: { start: '06:30', end: '18:30' },
  },
  {
    id: 'l-koubri',
    number: 'Koubri',
    kind: 'suburbaine',
    areas: 'Ouagadougou ↔ Koubri',
    color: '#e8951f',
    weekday: { start: '05:45', end: '20:00' },
    sundayHoliday: { start: '06:00', end: '19:10' },
  },
  {
    id: 'l-sapone',
    number: 'Saponé',
    kind: 'suburbaine',
    areas: 'Ouagadougou ↔ Saponé',
    color: '#832548',
    weekday: { start: '05:45', end: '19:30' },
    sundayHoliday: { start: '07:00', end: '18:20' },
  },
];

export const DEPARTURE_FREQUENCY_NOTE = 'Un départ toutes les 1h10 à partir du premier départ';

// Arrêts / quartiers réels desservis par le réseau (carte des lignes SOTRACO)
export const REAL_STOPS = [
  "Château d'eau de Koulwéoghin",
  'Nioko II',
  'Wayalghin',
  'Bendogo',
  'Marché de Kilwin',
  'Hôpital Yalgado',
  'Place Naaba Koom',
  'Zone Écoles',
  'Nonsin',
  'Dagnoin',
  'Mairie de Ouagadougou',
  'SIAO',
  'Sonabhy',
  'Cissin',
  'Lycée St Joseph',
  'Place du Cycliste',
  'Trame ZACA',
  'Le Technicien',
  'Tengandogo',
];

export const NEXT_BUSES = [
  { lineId: 'l-4', etaMinutes: 3 },
  { lineId: 'l-6b', etaMinutes: 11 },
  { lineId: 'l-13', etaMinutes: 18 },
];

export const LIVE_BUSES: LiveBus[] = [
  {
    id: 'SOTR-042',
    lineId: 'l-4',
    driver: 'Oumarou ZONGO',
    seatsAvailable: 12,
    nextStop: 'Dagnoin',
    etaMinutes: 3,
    lastDeparture: '09:45 — Place Naaba Koom',
    status: 'EN ROUTE',
    x: 42,
    y: 46,
  },
  {
    id: 'SOTR-071',
    lineId: 'l-6b',
    driver: 'Aminata SAWADOGO',
    seatsAvailable: 6,
    nextStop: 'Cissin',
    etaMinutes: 11,
    lastDeparture: '09:38 — Sonabhy',
    status: 'EN ROUTE',
    x: 68,
    y: 58,
  },
  {
    id: 'SOTR-128',
    lineId: 'l-13',
    driver: 'Boukary OUEDRAOGO',
    seatsAvailable: 2,
    nextStop: 'Nonsin',
    etaMinutes: 18,
    lastDeparture: '09:20 — Trame ZACA',
    status: 'RETARD',
    x: 58,
    y: 30,
  },
];

export const FAVORITE_STOPS = ['Trame ZACA', 'Dagnoin', 'Cissin'];
