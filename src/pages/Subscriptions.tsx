import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BottomNav } from '../components/BottomNav';
import { TopBar } from '../components/PhoneFrame';
import { PLANS } from '../data/mock';
import type { Plan } from '../types';

const fmt = (n: number) => new Intl.NumberFormat('fr-FR').format(n);

export function Subscriptions() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Plan['id']>('semaine');

  const go = () => {
    navigate('/payment', { state: { planId: selected } });
  };

  return (
    <div className="flex-1 flex flex-col bg-neutral-50">
      <TopBar title="Choisir un Abonnement" onBack={() => navigate('/dashboard')} />

      <div className="flex-1 overflow-y-auto app-scrollbar px-5 py-4">
        <p className="text-sm font-semibold text-neutral-700 mb-3">Sélectionnez votre formule</p>

        <div className="flex flex-col gap-2.5">
          {PLANS.map((plan) => {
            const active = selected === plan.id;
            return (
              <button
                key={plan.id}
                onClick={() => setSelected(plan.id)}
                className={`relative w-full text-left rounded-xl border-2 p-3.5 flex items-center gap-3 transition-colors ${
                  active ? 'border-sotraco-green-600 bg-sotraco-green-50' : 'border-neutral-200 bg-white'
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-2.5 right-3 bg-sotraco-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                    POPULAIRE
                  </span>
                )}
                <span
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    active ? 'border-sotraco-green-700' : 'border-neutral-300'
                  }`}
                >
                  {active && <span className="w-2.5 h-2.5 rounded-full bg-sotraco-green-700" />}
                </span>
                <span className="flex-1">
                  <span className="block text-[14px] font-semibold text-neutral-800">{plan.label}</span>
                  <span className="block text-[12px] text-neutral-400">{plan.durationLabel}</span>
                </span>
                <span className="text-[14px] font-bold text-sotraco-green-800">{fmt(plan.price)} F CFA</span>
              </button>
            );
          })}
        </div>

        <p className="text-[12px] text-neutral-500 mt-3">Tarif réduit disponible (-25%)</p>
      </div>

      <div className="shrink-0 px-5 pb-3">
        <button
          onClick={go}
          className="w-full py-3.5 rounded-xl bg-sotraco-green-700 text-white font-semibold active:scale-[0.98] transition-transform"
        >
          SOUSCRIRE MAINTENANT
        </button>
      </div>

      <BottomNav />
    </div>
  );
}
