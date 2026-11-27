'use client';

import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Profile } from './data';

type Props = {
  profile: Profile;
  onClose: () => void;
  onUpdated: (updated: Profile) => void;
};

export default function EditProfileModal({ profile, onClose, onUpdated }: Props) {
  const [weight, setWeight] = useState(String(profile.weight));
  const [height, setHeight] = useState(String(profile.height));
  const [age, setAge] = useState(String(profile.age));
  const [challengeDays, setChallengeDays] = useState<30 | 60 | 90>(
    (profile.challenge_days === 60 || profile.challenge_days === 90 ? profile.challenge_days : 30)
  );
  const [saving, setSaving] = useState(false);

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

    const maintenance = Math.round(bmr * 1.35);
    const minSafe = profile.gender === 'male' ? 1500 : 1200;
    const newCalories = Math.max(minSafe, maintenance - 450);

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

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <form
        onSubmit={handleSave}
        className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white">⚙️ Edit Stats & Goal</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white font-bold text-xs"
          >
            ✕
          </button>
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
            {([30, 60, 90] as const).map((days) => (
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
          {saving ? 'Recalculating Plan... ⏳' : 'Save & Recalculate Calories ✅'}
        </button>
      </form>
    </div>
  );
}
