import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { TopBar } from '../components/PhoneFrame';
import { useApp } from '../context/AppContext';
import { PAYMENT_METHODS, PLANS } from '../data/mock';
import type { PaymentMethodId } from '../types';

const fmt = (n: number) => new Intl.NumberFormat('fr-FR').format(n);

export function Payment() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, subscribeToPlan } = useApp();
  const [method, setMethod] = useState<PaymentMethodId>('moov');
  const [phone, setPhone] = useState(user?.phone ?? '+226 70 12 34 56');
  const [processing, setProcessing] = useState(false);

  const planId = (location.state as { planId?: string } | null)?.planId ?? 'mois';
  const plan = useMemo(() => PLANS.find((p) => p.id === planId) ?? PLANS[3], [planId]);
  const discounted = Math.round(plan.price * 0.75);

  const confirm = () => {
    setProcessing(true);
    setTimeout(() => {
      subscribeToPlan(plan, method);
      navigate('/pass');
    }, 900);
  };

  return (
    <div className="flex-1 flex flex-col bg-neutral-50">
      <TopBar title="Paiement" onBack={() => navigate('/subscriptions')} tone="blue" />

      <div className="flex-1 overflow-y-auto app-scrollbar px-5 py-4 flex flex-col gap-4">
        <div className="rounded-xl bg-sotraco-blue-500/10 border border-sotraco-blue-500/30 p-4">
          <p className="text-[12px] font-semibold text-sotraco-blue-600 mb-1">Récapitulatif</p>
          <p className="text-[14px] text-neutral-700">
            {plan.label} — {plan.durationLabel}
          </p>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-2xl font-bold text-sotraco-blue-600">{fmt(discounted)} F CFA</p>
            <span className="text-[11px] bg-sotraco-green-100 text-sotraco-green-700 font-semibold px-2 py-0.5 rounded-full">
              Économisez 25%
            </span>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-neutral-700 mb-2">Choisir le mode de paiement</p>
          <div className="flex flex-col gap-2">
            {PAYMENT_METHODS.map((m) => {
              const active = method === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`w-full flex items-center gap-3 rounded-xl border-2 p-3 transition-colors ${
                    active ? 'border-sotraco-blue-500 bg-white' : 'border-neutral-200 bg-white'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      active ? 'border-sotraco-blue-600' : 'border-neutral-300'
                    }`}
                  >
                    {active && <span className="w-2 h-2 rounded-full bg-sotraco-blue-600" />}
                  </span>
                  <MethodDot id={m.id} />
                  <span className="flex-1 text-left text-[14px] font-medium text-neutral-800">{m.label}</span>
                  {m.recommended && (
                    <span className="text-[10px] font-bold bg-sotraco-blue-600 text-white px-2 py-0.5 rounded-full">
                      Recommandé
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <label className="text-sm">
          <span className="block font-medium text-neutral-700 mb-1">
            Numéro de téléphone {PAYMENT_METHODS.find((m) => m.id === method)?.label}
          </span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-sotraco-blue-500"
          />
        </label>
      </div>

      <div className="shrink-0 px-5 pb-4">
        <button
          onClick={confirm}
          disabled={processing}
          className="w-full py-3.5 rounded-xl bg-sotraco-blue-600 text-white font-semibold disabled:opacity-70 active:scale-[0.98] transition-transform"
        >
          {processing ? 'Traitement...' : 'CONFIRMER ET PAYER'}
        </button>
        <p className="text-center text-[11px] text-neutral-400 mt-2 flex items-center justify-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="5" y="11" width="14" height="9" rx="1.5" />
            <path d="M8 11V7a4 4 0 018 0v4" />
          </svg>
          Paiement sécurisé SSL/TLS
        </p>
      </div>
    </div>
  );
}

function MethodDot({ id }: { id: PaymentMethodId }) {
  const colors: Record<PaymentMethodId, string> = {
    orange: '#f5a623',
    moov: '#1d6fd8',
    coris: '#c62828',
    wave: '#1dc8e0',
    telecel: '#a91d3a',
  };
  return <span className="w-6 h-6 rounded-full shrink-0" style={{ backgroundColor: colors[id] }} />;
}
