# SOTRACO Connect

Application mobile web de transport connecté pour le Burkina Faso, construite à partir des maquettes fonctionnelles `SOTRACO_Maquettes_Application_2026.pdf` (OUEKA DESIGN, 2026).

## Écrans

1. **Splash** — écran d'accueil animé avec accès Connexion / Inscription
2. **Connexion** — authentification par téléphone ou Mobile Money (Orange/Moov)
3. **Inscription** — création de compte (Usager / Étudiant / Sénior)
4. **Tableau de bord** — solde du pass, actions rapides, prochains bus à l'arrêt
5. **Abonnements** — 5 formules (ticket, jour, semaine, mois, année)
6. **Paiement** — Orange Money, Moov Money, Coris Money, carte bancaire
7. **Mon Pass QR** — QR code du pass à présenter au conducteur
8. **Suivi GPS** — carte interactive avec position des bus en temps réel (simulé)
9. **Identification Bus** — scan du bus, infos conducteur/ligne, signalement et notation
10. **Profil** — statistiques, abonnements, paiements, arrêts favoris, paramètres

## Stack

React + TypeScript + Vite, Tailwind CSS v4, React Router, `qrcode.react`. L'état (session, abonnement, transactions) est simulé côté client et persisté dans `localStorage` — il n'y a pas de backend ni de paiement réel.

## Développement

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```
