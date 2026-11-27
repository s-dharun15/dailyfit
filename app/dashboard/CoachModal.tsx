'use client';

import { useState, useEffect } from 'react';
import { Profile } from './data';

type Props = {
  profile: Profile;
  dietType: 'veg' | 'nonveg';
  glassesDrunk: number;
  totalGlasses: number;
  onClose: () => void;
};

const GROCERY_ITEMS = {
  common: [
    'Idli / Dosa Batter (or Ragi & Kambu flour)',
    'Toor Dal, Moong Dal & Black Kondakadalai (Chana)',
    'Drumsticks, Brinjal, Ladies Finger & Keerai (Spinach)',
    'Fresh Curd (for Neer Mor), Mint, Coriander & Ginger',
    'Kollu (Horse Gram), Jeera & Sukku Malli Coffee Powder',
  ],
  nonveg: [
    'Farm Eggs (1 dozen for boiled eggs & podimas)',
    'Skinless Chicken Breast / Curry Cut (500g)',
    'Vanjaram / Tilapia Fish Fillets (400g)',
  ],
  veg: [
    'Fresh Paneer (400g) & Sprouted Green Moong',
    'Almonds, Peanuts (Verkadalai) & Roasted Makhana',
  ],
};

export default function CoachModal({
  profile,
  dietType,
  glassesDrunk,
  totalGlasses,
  onClose,
}: Props) {
  const [tab, setTab] = useState<'insights' | 'grocery'>('insights');
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem('dailyfit_grocery');
    if (saved) setChecked(JSON.parse(saved));
  }, []);

  const toggleGrocery = (item: string) => {
    const next = { ...checked, [item]: !checked[item] };
    setChecked(next);
    localStorage.setItem('dailyfit_grocery', JSON.stringify(next));
  };

  const bmi = +(profile.weight / ((profile.height / 100) * (profile.height / 100))).toFixed(1);
  const proteinGoal = Math.round(profile.weight * 1.4);
  const waterLeft = Math.max(0, totalGlasses - glassesDrunk);

  const itemsList = [
    ...GROCERY_ITEMS.common,
    ...(dietType === 'nonveg' ? GROCERY_ITEMS.nonveg : GROCERY_ITEMS.veg),
  ];

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-2xl max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between shrink-0">
          <h3 className="text-base font-extrabold text-white">🩺 DailyFit Smart Coach</h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white font-bold text-xs"
          >
            ✕
          </button>
        </div>

        {/* Sub-Tabs */}
        <div className="grid grid-cols-2 gap-1.5 bg-zinc-950 p-1 rounded-2xl border border-zinc-800 shrink-0">
          <button
            type="button"
            onClick={() => setTab('insights')}
            className={`py-2 rounded-xl text-xs font-extrabold transition ${
              tab === 'insights' ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-400'
            }`}
          >
            💡 Daily Tips
          </button>
          <button
            type="button"
            onClick={() => setTab('grocery')}
            className={`py-2 rounded-xl text-xs font-extrabold transition ${
              tab === 'grocery' ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-400'
            }`}
          >
            🛒 Weekly Grocery
          </button>
        </div>

        {/* Tab Content */}
        <div className="overflow-y-auto space-y-3 pr-0.5">
          {tab === 'insights' ? (
            <>
              <div className="bg-zinc-950 border border-emerald-500/30 rounded-2xl p-3.5 space-y-1">
                <div className="text-xs font-extrabold text-emerald-400">
                  🎯 Asian BMI & Calorie Strategy ({bmi})
                </div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {bmi >= 23
                    ? `Your Asian BMI is ${bmi}. Sticking to ${profile.daily_calorie_target} kcal/day with millet dinners (Ragi/Kambu) will drop ~0.5 kg/week safely.`
                    : `Your Asian BMI is ${bmi} (Healthy range). Focus on hitting ${proteinGoal}g protein daily to tone up while keeping energy high.`}
                </p>
              </div>

              <div className="bg-zinc-950 border border-sky-500/30 rounded-2xl p-3.5 space-y-1">
                <div className="text-xs font-extrabold text-sky-400">💧 Hydration Check</div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  {waterLeft > 0
                    ? `You have ${waterLeft} glasses (${waterLeft * 250} ml) left today. Have 1 glass of neer mor or warm jeera water before dinner.`
                    : 'Awesome! You hit 100% of your daily hydration target today.'}
                </p>
              </div>

              <div className="bg-zinc-950 border border-amber-500/30 rounded-2xl p-3.5 space-y-1">
                <div className="text-xs font-extrabold text-amber-400">🍛 Tamil Kitchen Portion Rule</div>
                <p className="text-xs text-zinc-300 leading-relaxed">
                  Fill half your lunch plate with poriyal/kootu & salad, one-quarter with sambar/protein, and limit rice to 1 small katori (150g).
                </p>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <p className="text-[11px] text-zinc-400">
                Tap items as you shop for your 7-day South Indian meal plan:
              </p>
              {itemsList.map((item) => {
                const isDone = !!checked[item];
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => toggleGrocery(item)}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center gap-3 transition ${
                      isDone
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-zinc-400 line-through'
                        : 'bg-zinc-950 border-zinc-800 text-zinc-200'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-black shrink-0 ${
                        isDone ? 'bg-emerald-500 text-zinc-950' : 'border border-zinc-600'
                      }`}
                    >
                      {isDone && '✓'}
                    </span>
                    <span className="text-xs font-semibold">{item}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
