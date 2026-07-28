import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { BottomNav } from '../components/BottomNav';
import { TopBar } from '../components/PhoneFrame';
import { useApp } from '../context/AppContext';

export function Pass() {
  const navigate = useNavigate();
  const { user, subscription } = useApp();

  if (!subscription) {
    return (
      <div className="flex-1 flex flex-col bg-neutral-50">
        <TopBar title="Mon Pass" onBack={() => navigate('/dashboard')} />
        <div className="flex-1 flex flex-col items-center justify-center gap-3 px-8 text-center">
          <p className="text-neutral-500 text-sm">Vous n'avez pas encore d'abonnement actif.</p>
          <button
            onClick={() => navigate('/subscriptions')}
            className="py-2.5 px-5 rounded-xl bg-sotraco-green-700 text-white font-semibold text-sm"
          >
            Choisir un abonnement
          </button>
        </div>
        <BottomNav />
      </div>
    );
  }

  const share = async () => {
    const text = `Pass SOTRACO Connect — ${subscription.planLabel} — valide jusqu'au ${subscription.expiresAt} — ID ${subscription.passCode}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: 'Mon Pass SOTRACO', text });
      } catch {
        /* user cancelled */
      }
    } else {
      await navigator.clipboard.writeText(text);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-neutral-50">
      <TopBar title="Mon Pass QR" onBack={() => navigate('/dashboard')} />

      <div className="flex-1 overflow-y-auto app-scrollbar px-6 py-6 flex flex-col items-center gap-4">
        <div className="w-16 h-16 rounded-full bg-sotraco-green-100 flex items-center justify-center text-sotraco-green-700 font-bold text-lg">
          {user?.avatarInitials}
        </div>
        <div className="text-center">
          <p className="font-semibold text-neutral-800">
            {user?.firstName} {user?.lastName}
          </p>
          <span className="inline-block mt-1 text-[11px] font-semibold bg-sotraco-green-700 text-white px-2.5 py-0.5 rounded-full">
            {subscription.planLabel}
          </span>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col items-center gap-3 w-full max-w-[280px]">
          <QRCodeSVG value={subscription.passCode} size={180} fgColor="#123f22" level="M" />
          <p className="text-[13px] font-semibold text-neutral-700">Valide jusqu'au {subscription.expiresAt}</p>
          <p className="text-[11px] text-neutral-400">ID : {subscription.passCode}</p>
        </div>

        <div className="w-full bg-sotraco-green-50 border border-sotraco-green-200 rounded-xl p-3 text-center">
          <p className="text-[13px] font-medium text-sotraco-green-800">Présentez ce QR Code au conducteur</p>
          <p className="text-[11px] text-sotraco-green-600 mt-0.5">Le code se renouvelle toutes les 24h</p>
        </div>

        <button
          onClick={share}
          className="w-full py-3 rounded-xl bg-sotraco-green-700 text-white font-semibold active:scale-[0.98] transition-transform"
        >
          PARTAGER MON PASS
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
