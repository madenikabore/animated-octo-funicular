import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TopBar } from '../components/PhoneFrame';
import { useApp } from '../context/AppContext';
import type { AccountType } from '../types';

const ACCOUNT_TYPES: AccountType[] = ['Usager', 'Étudiant', 'Sénior'];

export function Register() {
  const navigate = useNavigate();
  const { register } = useApp();
  const [firstName, setFirstName] = useState('Ibrahim');
  const [lastName, setLastName] = useState('KABORÉ');
  const [phone, setPhone] = useState('+226 70 12 34 56');
  const [email, setEmail] = useState('ibrahim@sotraco.bf');
  const [password, setPassword] = useState('');
  const [accountType, setAccountType] = useState<AccountType>('Usager');
  const [accepted, setAccepted] = useState(true);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!accepted) return;
    register({ firstName, lastName, phone, email, accountType });
    navigate('/dashboard');
  };

  return (
    <div className="flex-1 flex flex-col bg-white">
      <TopBar title="Créer un compte" onBack={() => navigate('/')} />

      <form onSubmit={submit} className="flex-1 overflow-y-auto app-scrollbar px-6 py-5 flex flex-col gap-4">
        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-full bg-neutral-100 border-2 border-dashed border-neutral-300 flex items-center justify-center text-neutral-400">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="3.2" />
              <path d="M4 8a2 2 0 012-2h1.5l1-1.5h7l1 1.5H18a2 2 0 012 2v9a2 2 0 01-2 2H6a2 2 0 01-2-2V8z" />
            </svg>
          </div>
          <span className="text-[13px] text-sotraco-green-700 font-medium">Ajouter une photo</span>
        </div>

        <Field label="Prénom" value={firstName} onChange={setFirstName} />
        <Field label="Nom" value={lastName} onChange={setLastName} />
        <Field label="Téléphone" value={phone} onChange={setPhone} />
        <Field label="Email" value={email} onChange={setEmail} type="email" />
        <Field label="Mot de passe" value={password} onChange={setPassword} type="password" placeholder="••••••••" />

        <div>
          <span className="block text-sm font-medium text-neutral-700 mb-1.5">Type de compte</span>
          <div className="grid grid-cols-3 gap-2">
            {ACCOUNT_TYPES.map((type) => (
              <button
                type="button"
                key={type}
                onClick={() => setAccountType(type)}
                className={`py-2 rounded-lg border text-[13px] font-medium transition-colors ${
                  accountType === type
                    ? 'border-sotraco-green-700 bg-sotraco-green-50 text-sotraco-green-800'
                    : 'border-neutral-300 text-neutral-500'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-sotraco-green-700 text-white font-semibold mt-2 active:scale-[0.98] transition-transform"
        >
          CRÉER MON COMPTE
        </button>

        <label className="flex items-start gap-2 text-[12px] text-neutral-500 pb-2">
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-0.5" />
          En créant un compte, j'accepte les CGU
        </label>
      </form>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <label className="text-sm">
      <span className="block font-medium text-neutral-700 mb-1">{label}</span>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-neutral-300 px-3 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-sotraco-green-500"
      />
    </label>
  );
}
