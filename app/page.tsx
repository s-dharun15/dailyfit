'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';
import Logo from './Logo';

const stylishFont = Outfit({ subsets: ['latin'], weight: ['800'] });
const bodyFont = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function Home() {
  const [showSplash, setShowSplash] = useState(true);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2600);
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) router.push('/onboarding');
    });
    return () => clearTimeout(timer);
  }, [router]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setErrorMsg(error.message);
      else router.push('/onboarding');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setErrorMsg(error.message);
      else router.push('/onboarding');
    }
    setLoading(false);
  };

  if (showSplash) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white px-6 overflow-hidden">
        <style>{`
          @keyframes ytIconPop {
            0% { transform: scale(0.3); opacity: 0; }
            55% { transform: scale(1.12); opacity: 1; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes ytTextSlide {
            0%, 30% { max-width: 0px; opacity: 0; transform: translateX(-12px); }
            100% { max-width: 240px; opacity: 1; transform: translateX(0); }
          }
          @keyframes ytBarFill {
            0% { width: 0%; }
            40% { width: 55%; }
            85% { width: 92%; }
            100% { width: 100%; }
          }
        `}</style>

        <div className="flex items-center justify-center gap-3.5">
          <div style={{ animation: 'ytIconPop 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards' }} className="shadow-2xl shadow-emerald-500/30 rounded-2xl">
            <Logo size={64} />
          </div>
          <div style={{ animation: 'ytTextSlide 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards' }} className="overflow-hidden whitespace-nowrap">
            <h1 className={`${stylishFont.className} text-5xl tracking-tight text-white`}>
              Daily<span className="text-emerald-400">Fit</span>
            </h1>
          </div>
        </div>

        <div className="w-44 h-1 bg-zinc-800 rounded-full overflow-hidden mt-8">
          <div style={{ animation: 'ytBarFill 2.4s ease-out forwards' }} className="h-full bg-gradient-to-r from-emerald-400 to-lime-300 rounded-full" />
        </div>
      </div>
    );
  }

  return (
    <div className={`${bodyFont.className} min-h-screen bg-zinc-950 text-white flex flex-col justify-center px-6 max-w-md mx-auto`}>
      <div className="mb-8 text-center flex flex-col items-center">
        <div className="mb-3 shadow-lg shadow-emerald-500/20 rounded-2xl">
          <Logo size={52} />
        </div>
        <h1 className={`${stylishFont.className} text-4xl text-white`}>
          Daily<span className="text-emerald-400">Fit</span>
        </h1>
        <p className="text-zinc-400 text-sm mt-2">
          {isSignUp ? 'Create your account to start your challenge 🚀' : 'Welcome back! Ready for today’s routine? 💪'}
        </p>
      </div>

      <form onSubmit={handleAuth} className="space-y-4 bg-zinc-900/80 p-6 rounded-3xl border border-zinc-800 shadow-xl">
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Email</label>
          <input type="email" required placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-400" />
        </div>
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Password</label>
          <input type="password" required minLength={6} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-emerald-400" />
        </div>
        {errorMsg && <p className="text-red-400 text-xs bg-red-950/50 p-3 rounded-xl border border-red-800/50">⚠️ {errorMsg}</p>}
        <button type="submit" disabled={loading} className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold text-base transition active:scale-95">
          {loading ? 'Please wait... ⏳' : isSignUp ? 'Create Account 🔥' : 'Login 🚀'}
        </button>
      </form>

      <button onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(''); }} className="mt-6 text-sm text-zinc-400 hover:text-emerald-400 text-center">
        {isSignUp ? 'Already have an account? Login here' : 'New to DailyFit? Create an account'}
      </button>
         <div className="mt-6 text-center text-[11px] text-zinc-500">
     By continuing, you agree to our{' '}
     <a href="/privacy" className="text-emerald-400 underline font-semibold">
       Privacy Policy
     </a>
     .
   </div>

    </div>
  );
}
