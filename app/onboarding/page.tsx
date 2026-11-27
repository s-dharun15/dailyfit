'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Syne, Plus_Jakarta_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';

const stylishFont = Syne({ subsets: ['latin'], weight: ['800'] });
const bodyFont = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '600', '700'] });

export default function Onboarding() {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('165');
  const [challengeDays, setChallengeDays] = useState<30 | 60 | 90>(30);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  // Check if user already completed onboarding -> send straight to dashboard!
  useEffect(() => {
    const checkProfile = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .single();

      if (profile) {
        router.push('/dashboard');
      } else {
        setChecking(false);
      }
    };
    checkProfile();
  }, [router]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/');
      return;
    }

    const numAge = Number(age);
    const numWeight = Number(weight);
    const numHeight = Number(height);

    // Calculate BMR (Mifflin-St Jeor) -> Maintenance TDEE -> Safe 450 kcal weight-loss deficit
    const bmr =
      gender === 'male'
        ? 10 * numWeight + 6.25 * numHeight - 5 * numAge + 5
        : 10 * numWeight + 6.25 * numHeight - 5 * numAge - 161;

    const maintenance = Math.round(bmr * 1.35);
    const minSafeCalories = gender === 'male' ? 1500 : 1200;
    const dailyCalorieTarget = Math.max(minSafeCalories, maintenance - 450);

    const { error } = await supabase.from('profiles').upsert({
      id: session.user.id,
      gender,
      age: numAge,
      weight: numWeight,
      height: numHeight,
      challenge_days: challengeDays,
      daily_calorie_target: dailyCalorieTarget,
    });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
    } else {
      router.push('/dashboard');
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center text-emerald-400 font-bold">
        Loading your profile... ⚡
      </div>
    );
  }

  return (
    <div className={`${bodyFont.className} min-h-screen bg-zinc-950 text-white px-5 py-8 max-w-md mx-auto`}>
      <div className="mb-6">
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">Step 1 of 1</span>
        <h1 className={`${stylishFont.className} text-3xl mt-1`}>
          Customize Your Plan 🎯
        </h1>
        <p className="text-zinc-400 text-sm mt-1">
          Tell us your stats so we can build your morning-to-night routine!
        </p>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-5 bg-zinc-900/80 p-6 rounded-3xl border border-zinc-800">
        {/* Gender Selection */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase mb-2">Gender</label>
          <div className="grid grid-cols-2 gap-3">
            {(['male', 'female'] as const).map((g) => (
              <button
                type="button"
                key={g}
                onClick={() => setGender(g)}
                className={`py-3 rounded-xl font-bold capitalize border transition ${
                  gender === g
                    ? 'bg-emerald-500 text-zinc-950 border-emerald-400'
                    : 'bg-zinc-800 text-zinc-300 border-zinc-700'
                }`}
              >
                {g === 'male' ? '👨 Male' : '👩 Female'}
              </button>
            ))}
          </div>
        </div>

        {/* Age, Weight, Height */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Age</label>
            <input
              type="number"
              required
              min={18}
              max={85}
              placeholder="25"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-3 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-center font-bold focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Weight (kg)</label>
            <input
              type="number"
              required
              min={35}
              max={250}
              step="0.1"
              placeholder="78"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              className="w-full px-3 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-center font-bold focus:outline-none focus:border-emerald-400"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 uppercase mb-1">Height (cm)</label>
            <input
              type="number"
              required
              min={120}
              max={230}
              placeholder="165"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="w-full px-3 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-center font-bold focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>

        {/* 30 / 60 / 90 Days Challenge Picker */}
        <div>
          <label className="block text-xs font-semibold text-zinc-400 uppercase mb-2">
            Choose Your Challenge 🏆
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {([30, 60, 90] as const).map((days) => (
              <button
                type="button"
                key={days}
                onClick={() => setChallengeDays(days)}
                className={`py-3.5 px-2 rounded-2xl border text-center transition ${
                  challengeDays === days
                    ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 shadow-lg shadow-emerald-500/10'
                    : 'bg-zinc-800 border-zinc-700 text-zinc-400'
                }`}
              >
                <div className="text-xl font-extrabold">{days}</div>
                <div className="text-[11px] uppercase tracking-wider">Days</div>
              </button>
            ))}
          </div>
        </div>

        {errorMsg && (
          <p className="text-red-400 text-xs bg-red-950/50 p-3 rounded-xl">⚠️ {errorMsg}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-base transition active:scale-95 shadow-lg shadow-emerald-500/20"
        >
          {loading ? 'Building Your Routine... ⏳' : `Start ${challengeDays}-Day Challenge 🔥`}
        </button>
      </form>
    </div>
  );
}
