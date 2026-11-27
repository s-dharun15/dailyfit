'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Profile } from './data';

type Props = {
  profile: Profile;
  onClose: () => void;
  onUpdated: (updated: Profile) => void;
  onResetAll: () => Promise<void>;
};

export default function EditProfileModal({ profile, onClose, onUpdated, onResetAll }: Props) {
  const [weight, setWeight] = useState(String(profile.weight));
  const [height, setHeight] = useState(String(profile.height));
  const [age, setAge] = useState(String(profile.age));
  const [goal, setGoal] = useState<'lose' | 'muscle' | 'fit'>('lose');
  const [challengeDays, setChallengeDays] = useState<30 | 60 | 90>(
    profile.challenge_days === 60 || profile.challenge_days === 90 ? profile.challenge_days : 30
  );
  const [saving, setSaving] = useState(false);
  const [confirmReset, setConfirmReset] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const numWeight = Number(weight) || profile.weight;
    const numHeight = Number(height) || profile.height;
    const numAge = Number(age) || profile.age;

    const bmr =
      profile.gender === 'male'
        ? 10 * numWeight + 6.25 * numHeight - 5 * numAge + 5
        : 10 * numWeight + 6.25 * numHeight - 5 * numAge - 161;

    const maintenance = Math.round(bmr * 1.375);
    const minSafe = profile.gender === 'male' ? 1500 : 1200;

    let newCalories = maintenance;
    if (goal === 'lose') newCalories = Math.max(minSafe, maintenance - 450);
    if (goal === 'muscle') newCalories = maintenance + 250;

    const { error } = await supabase
      .from('profiles')
      .update({
        weight: numWeight,
        height: numHeight,
        age: numAge,
        challenge_days: challengeDays,
        daily_calorie_target: newCalories,
      })
      .eq('id', profile.id);

    setSaving(false);
    if (!error) {
      onUpdated({
        ...profile,
        weight: numWeight,
        height: numHeight,
        age: numAge,
        challenge_days: challengeDays,
        daily_calorie_target: newCalories,
      });
      onClose();
    }
  };

  const handleConfirmReset = async () => {
    setResetting(true);
    await onResetAll();
    setResetting(false);
    onClose();
  };

  const challengeOptions = new Array<30 | 60 | 90>(30, 60, 90);
  const goalOptions: { id: 'lose' | 'muscle' | 'fit'; label: string }[] = [
    { id: 'lose', label: '🔥 Lose Fat' },
    { id: 'muscle', label: '💪 Gain Muscle' },
    { id: 'fit', label: '⚡ Stay Fit' },
  ];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-2xl">
        <form onSubmit={handleSave} className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white">⚙️ Personalize Your Plan</h3>
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white font-bold text-xs"
            >
              ✕
            </button>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1.5">
              Primary Goal
            </label>
            <div className="grid grid-cols-3 gap-2">
              {goalOptions.map((g) => (
                <button
                  type="button"
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`py-2.5 rounded-xl border text-[11px] font-extrabold transition ${
                    goal === g.id
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Age</label>
              <input
                type="number"
                required
                min={16}
                max={85}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full px-2.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-center font-bold text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Weight (kg)</label>
              <input
                type="number"
                required
                min={35}
                max={250}
                step="0.1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full px-2.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-center font-bold text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1">Height (cm)</label>
              <input
                type="number"
                required
                min={120}
                max={230}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full px-2.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-center font-bold text-sm focus:outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-bold uppercase text-zinc-400 mb-1.5">
              Challenge Duration
            </label>
            <div className="grid grid-cols-3 gap-2">
              {challengeOptions.map((days) => (
                <button
                  type="button"
                  key={days}
                  onClick={() => setChallengeDays(days)}
                  className={`py-2 rounded-xl border text-xs font-extrabold transition ${
                    challengeDays === days
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                      : 'bg-zinc-950 border-zinc-800 text-zinc-400'
                  }`}
                >
                  {days} Days
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs transition active:scale-95"
          >
            {saving ? 'Recalculating Plan... ⏳' : 'Save & Update Plan ✅'}
          </button>
        </form>

        {/* Full Reset Section */}
        <div className="pt-3 border-t border-zinc-800">
          {!confirmReset ? (
            <button
              type="button"
              onClick={() => setConfirmReset(true)}
              className="w-full py-2.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 font-extrabold text-xs transition"
            >
              🔄 Reset All Progress & Hydration
            </button>
          ) : (
            <div className="bg-rose-950/40 border border-rose-500/40 rounded-2xl p-3 space-y-2.5">
              <p className="text-[11px] text-rose-200 font-semibold text-center">
                Reset hydration, food logs, check-ins, and restart from Day 1?
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={resetting}
                  onClick={handleConfirmReset}
                  className="flex-1 py-2 rounded-xl bg-rose-500 text-white text-xs font-extrabold"
                >
                  {resetting ? 'Resetting...' : 'Yes, Reset All'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
