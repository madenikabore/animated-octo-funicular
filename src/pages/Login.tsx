import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export function Login() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [phone, setPhone] = useState('+226 70 12 34 56');
  const [password, setPassword] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    login(phone);
    navigate('/dashboard');
  };

  const loginWithMoney = () => {
    login(phone);
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="bg-sotraco-green-900 text-white px-6 pt-6 pb-8 text-center">
        <h1 className="text-lg font-semibold">Connexion</h1>
        <p className="text-sotraco-green-100/80 text-sm">SOTRACO Connect</p>
      </div>

      <form onSubmit={submit} className="flex-1 px-6 -mt-6 flex flex-col">
        <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-4">
          <div className="w-14 h-14 rounded-full bg-sotraco-green-100 mx-auto flex items-center justify-center text-sotraco-green-700">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c1.5-4 5-6 8-6s6.5 2 8 6" strokeLinecap="round" />
            </svg>
          </div>

          <label className="text-sm">
            <span className="block font-medium text-neutral-700 mb-1">Numéro de téléphone</span>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-sotraco-green-500"
              placeholder="+226 70 12 34 56"
            />
          </label>

          <label className="text-sm">
            <span className="block font-medium text-neutral-700 mb-1">Mot de passe</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-sotraco-green-500"
              placeholder="••••••••"
            />
          </label>

          <button type="button" className="text-right text-[13px] text-sotraco-blue-600 -mt-2">
            Mot de passe oublié ?
          </button>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-sotraco-green-700 text-white font-semibold active:scale-[0.98] transition-transform"
          >
            SE CONNECTER
          </button>

          <div className="flex items-center gap-2 text-[12px] text-neutral-400">
            <div className="flex-1 h-px bg-neutral-200" />
            Ou continuer avec
            <div className="flex-1 h-px bg-neutral-200" />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={loginWithMoney}
              className="flex-1 py-2.5 rounded-lg bg-sotraco-orange-500 text-white text-[13px] font-semibold"
            >
              Orange Money
            </button>
            <button
              type="button"
              onClick={loginWithMoney}
              className="flex-1 py-2.5 rounded-lg bg-sotraco-blue-600 text-white text-[13px] font-semibold"
            >
              Moov Money
            </button>
          </div>
        </div>

        <p className="text-center text-sm text-neutral-500 mt-6">
          Pas encore de compte ?{' '}
          <button type="button" onClick={() => navigate('/register')} className="text-sotraco-green-700 font-semibold">
            Créer un compte gratuit
          </button>
        </p>
      </form>
    </div>
  );
}
