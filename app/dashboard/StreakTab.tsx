'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Profile } from './data';

type Props = {
  profile: Profile;
  completedCount: number;
  totalCaloriesLost: number;
  currentDay: number;
  alreadyLoggedToday: boolean;
};

type WeightEntry = {
  date: string;
  weight: number;
};

export default function StreakTab({
  profile,
  completedCount,
  totalCaloriesLost,
  currentDay,
  alreadyLoggedToday,
}: Props) {
  const [history, setHistory] = useState<WeightEntry[]>([]);
  const [newWeight, setNewWeight] = useState(String(profile.weight));
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    const key = `dailyfit_weights_${profile.id}`;
    const raw = localStorage.getItem(key);
    if (raw) {
      setHistory(JSON.parse(raw));
    } else {
      const initial: WeightEntry[] = [
        {
          date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
          weight: profile.weight,
        },
      ];
      localStorage.setItem(key, JSON.stringify(initial));
      setHistory(initial);
    }
  }, [profile.id, profile.weight]);

  const startWeight = history.at(0)?.weight ?? profile.weight;
  const latestWeight = history.at(-1)?.weight ?? profile.weight;
  const diff = +(startWeight - latestWeight).toFixed(1);

  const bmi = +(latestWeight / ((profile.height / 100) * (profile.height / 100))).toFixed(1);
  const bmiLabel =
    bmi < 18.5 ? 'Underweight' : bmi < 23 ? 'Normal (Asian BMI)' : bmi < 27.5 ? 'Overweight' : 'Obese';

  const handleLogWeight = async (e: React.FormEvent) => {
    e.preventDefault();
    const val = Number(newWeight);
    if (!val || val < 30 || val > 250) return;
    setLogging(true);

    const todayLabel = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
    const nextHistory = [...history.slice(-6), { date: todayLabel, weight: val }];
    setHistory(nextHistory);
    localStorage.setItem(`dailyfit_weights_${profile.id}`, JSON.stringify(nextHistory));

    await supabase.from('profiles').update({ weight: val }).eq('id', profile.id);
    setLogging(false);
  };

  return (
    <div className="px-5 mt-5 space-y-4">
      {/* Total Challenge Burn */}
      <div className="bg-gradient-to-r from-emerald-500/20 to-lime-500/10 border border-emerald-500/30 rounded-3xl p-5 flex items-center justify-between">
        <div>
          <div className="text-xs text-emerald-300 font-bold uppercase">Total Challenge Burn</div>
          <div className="text-3xl font-black text-white mt-1">
            🔥 {totalCaloriesLost.toLocaleString()}{' '}
            <span className="text-sm font-normal text-zinc-300">kcal</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-black text-lime-300">
            {completedCount}/{profile.challenge_days}
          </div>
          <div className="text-[11px] text-zinc-400">Days Done</div>
        </div>
      </div>

      {/* Weight & Asian BMI Progress Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-extrabold text-white">⚖️ Weight & Asian BMI</h3>
            <p className="text-[11px] text-emerald-400 font-semibold mt-0.5">{bmiLabel}</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-xs font-extrabold text-amber-300">
            BMI {bmi}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-zinc-950 p-2.5 rounded-2xl border border-zinc-800/80">
            <div className="text-[10px] text-zinc-400 uppercase font-bold">Start</div>
            <div className="text-sm font-black text-zinc-200 mt-0.5">{startWeight} kg</div>
          </div>
          <div className="bg-zinc-950 p-2.5 rounded-2xl border border-zinc-800/80">
            <div className="text-[10px] text-zinc-400 uppercase font-bold">Current</div>
            <div className="text-sm font-black text-white mt-0.5">{latestWeight} kg</div>
          </div>
          <div className="bg-zinc-950 p-2.5 rounded-2xl border border-zinc-800/80">
            <div className="text-[10px] text-zinc-400 uppercase font-bold">Change</div>
            <div
              className={`text-sm font-black mt-0.5 ${
                diff > 0 ? 'text-emerald-400' : diff < 0 ? 'text-rose-400' : 'text-zinc-300'
              }`}
            >
              {diff > 0 ? `-${diff} kg` : diff < 0 ? `+${Math.abs(diff)} kg` : '0.0 kg'}
            </div>
          </div>
        </div>

        {history.length > 1 && (
          <div className="pt-1">
            <div className="text-[10px] uppercase tracking-wider text-zinc-400 font-bold mb-2">
              Recent Weigh-Ins
            </div>
            <div className="flex items-end gap-2 h-16 bg-zinc-950/80 p-2.5 rounded-2xl border border-zinc-800/80">
              {history.map((entry, idx) => {
                const minW = Math.min(...history.map((h) => h.weight)) - 2;
                const maxW = Math.max(...history.map((h) => h.weight)) + 2;
                const pct = Math.max(25, Math.round(((entry.weight - minW) / (maxW - minW)) * 100));
                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1 h-full justify-end">
                    <span className="text-[9px] font-bold text-zinc-300">{entry.weight}</span>
                    <div
                      style={{ height: `${pct}%` }}
                      className="w-full max-w-[24px] rounded-t-md bg-emerald-500/80"
                    />
                    <span className="text-[8px] text-zinc-500">{entry.date}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <form onSubmit={handleLogWeight} className="flex gap-2">
          <input
            type="number"
            step="0.1"
            min={30}
            max={250}
            value={newWeight}
            onChange={(e) => setNewWeight(e.target.value)}
            placeholder="72.5"
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-bold text-xs focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            disabled={logging}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs transition active:scale-95"
          >
            {logging ? 'Saving...' : '+ Log Weight'}
          </button>
        </form>
      </div>

         {/* Unlockable Milestone Badges */}
   <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-3">
     <div className="flex items-center justify-between">
       <h3 className="text-sm font-extrabold text-white">🎖️ Milestone Badges</h3>
       <span className="text-[11px] text-emerald-400 font-bold">
         {completedCount >= 30 ? '4/4' : completedCount >= 15 ? '3/4' : completedCount >= 7 ? '2/4' : completedCount >= 3 ? '1/4' : '0/4'} Unlocked
       </span>
     </div>
     <div className="grid grid-cols-2 gap-2.5">
       {[
         { days: 3, icon: '🌱', title: '3-Day Starter', desc: 'Built early habit momentum' },
         { days: 7, icon: '🔥', title: '7-Day Warrior', desc: 'Full week of clean Tamil meals' },
         { days: 15, icon: '⚡', title: '15-Day Discipline', desc: 'Halfway transformation milestone' },
         { days: 30, icon: '👑', title: '30-Day Champion', desc: 'Completed full 30-day cycle' },
       ].map((b) => {
         const unlocked = completedCount >= b.days;
         return (
           <div
             key={b.days}
             className={`p-3 rounded-2xl border transition ${
               unlocked
                 ? 'bg-emerald-500/15 border-emerald-400/50 text-white'
                 : 'bg-zinc-950/70 border-zinc-800/80 text-zinc-500 opacity-60'
             }`}
           >
             <div className="flex items-center justify-between mb-1">
               <span className="text-xl">{unlocked ? b.icon : '🔒'}</span>
               <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-zinc-900">
                 {b.days}D
               </span>
             </div>
             <div className="text-xs font-extrabold">{b.title}</div>
             <div className="text-[10px] mt-0.5 leading-snug">{b.desc}</div>
           </div>
         );
       })}
     </div>
   </div>

   {/* Transformation Grid */}

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
        <h3 className="text-sm font-bold mb-3">
          {profile.challenge_days}-Day Transformation Tracker 🏆
        </h3>
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: profile.challenge_days }, (_, idx) => {
            const dayNum = idx + 1;
            const done = dayNum <= completedCount;
            const isToday = dayNum === currentDay && !alreadyLoggedToday;
            return (
              <div
                key={dayNum}
                className={`aspect-square rounded-xl flex items-center justify-center text-xs font-extrabold border ${
                  done
                    ? 'bg-emerald-500 text-zinc-950 border-emerald-400'
                    : isToday
                    ? 'bg-zinc-800 text-emerald-400 border-emerald-500 animate-pulse'
                    : 'bg-zinc-950 text-zinc-600 border-zinc-800/80'
                }`}
              >
                {done ? '✓' : dayNum}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
