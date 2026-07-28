import { useNavigate } from 'react-router-dom';
import mascot from '../assets/sotraco-mascot.png';

export function Splash() {
  const navigate = useNavigate();

  return (
    <div className="relative flex-1 flex flex-col bg-sotraco-green-900 overflow-hidden text-white">
      <div className="absolute -top-10 -right-16 w-56 h-56 rounded-full bg-sotraco-maroon-700/70" />
      <div className="absolute bottom-24 -left-16 w-48 h-48 rounded-full bg-sotraco-maroon-700/60" />

      <div className="relative flex-1 flex flex-col items-center justify-center px-8 text-center">
        <div className="w-40 h-40 rounded-full bg-white flex items-center justify-center mb-6 ring-4 ring-sotraco-green-600/40 overflow-hidden shadow-xl">
          <img src={mascot} alt="Bus SOTRACO" className="w-[92%] h-[92%] object-contain" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">SOTRACO</h1>
        <p className="text-sotraco-green-100/80 text-sm mt-3">Transport Connecté — Burkina Faso</p>
      </div>

      <div className="relative px-6 pb-10 flex flex-col gap-3">
        <button
          onClick={() => navigate('/login')}
          className="w-full py-3.5 rounded-xl bg-sotraco-orange-500 text-white font-semibold text-[15px] shadow-lg shadow-sotraco-orange-500/20 active:scale-[0.98] transition-transform"
        >
          SE CONNECTER
        </button>
        <button
          onClick={() => navigate('/register')}
          className="w-full py-3.5 rounded-xl bg-[#f5e14a] text-sotraco-green-900 font-semibold text-[15px] active:scale-[0.98] transition-transform"
        >
          CRÉER UN COMPTE
        </button>
        <p className="text-center text-[11px] text-sotraco-green-100/60 mt-2">v1.0 — OUEKA DESIGN © 2026</p>
      </div>
    </div>
  );
}
