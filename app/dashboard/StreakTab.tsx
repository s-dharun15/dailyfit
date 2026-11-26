'use client';

import { Profile } from './data';

type Props = {
  profile: Profile;
  completedCount: number;
  totalCaloriesLost: number;
  currentDay: number;
  alreadyLoggedToday: boolean;
};

export default function StreakTab({
  profile,
  completedCount,
  totalCaloriesLost,
  currentDay,
  alreadyLoggedToday,
}: Props) {
  return (
    <div className="px-5 mt-5 space-y-4">
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
