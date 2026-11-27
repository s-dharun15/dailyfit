'use client';

import { useState, useEffect } from 'react';
import { Profile } from './data';

type FoodItem = {
  id: string;
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  category: 'Breakfast' | 'Main Meal' | 'Snack & Drink' | 'Protein';
  isVeg: boolean;
};

type LoggedFood = FoodItem & {
  logId: string;
  time: string;
};

const SOUTH_INDIAN_FOODS: FoodItem[] = [
  { id: 'idli', name: 'Steamed Idli + Sambar', portion: '2 medium idlis + 1 cup sambar', calories: 220, protein: 7, carbs: 40, category: 'Breakfast', isVeg: true },
  { id: 'masala_dosa', name: 'Masala Dosa (less oil)', portion: '1 medium dosa + chutney', calories: 340, protein: 7, carbs: 52, category: 'Breakfast', isVeg: true },
  { id: 'ragi_dosa', name: 'Ragi (Finger Millet) Dosa', portion: '2 dosas + mint chutney', calories: 250, protein: 8, carbs: 42, category: 'Breakfast', isVeg: true },
  { id: 'ven_pongal', name: 'Ven Pongal + Gotsu', portion: '1 medium bowl (200g)', calories: 310, protein: 8, carbs: 44, category: 'Breakfast', isVeg: true },
  { id: 'adai_avial', name: 'Adai Dosa + Avial', portion: '2 adais + 1/2 cup avial', calories: 330, protein: 13, carbs: 46, category: 'Breakfast', isVeg: true },
  { id: 'pesarattu', name: 'Pesarattu (Green Moong Dosa)', portion: '2 dosas + ginger chutney', calories: 260, protein: 12, carbs: 38, category: 'Breakfast', isVeg: true },
  { id: 'idiyappam', name: 'Idiyappam + Kadala Curry', portion: '3 hoppers + 1/2 cup curry', calories: 290, protein: 9, carbs: 50, category: 'Breakfast', isVeg: true },
  { id: 'brown_rice', name: 'Matta / Brown Rice (Cooked)', portion: '1 cup (150g)', calories: 170, protein: 4, carbs: 36, category: 'Main Meal', isVeg: true },
  { id: 'sambar_sadam', name: 'Sambar Sadam (loaded veggies)', portion: '1 bowl (250g)', calories: 290, protein: 9, carbs: 48, category: 'Main Meal', isVeg: true },
  { id: 'curd_rice', name: 'Curd Rice + Pomegranate', portion: '1 bowl (200g)', calories: 240, protein: 7, carbs: 36, category: 'Main Meal', isVeg: true },
  { id: 'chapati_dal', name: 'Whole Wheat Chapati + Dal/Kootu', portion: '2 chapatis + 1 cup kootu', calories: 280, protein: 10, carbs: 44, category: 'Main Meal', isVeg: true },
  { id: 'rasam_poriyal', name: 'Pepper Rasam + Keerai Poriyal', portion: '1 bowl each', calories: 110, protein: 4, carbs: 14, category: 'Main Meal', isVeg: true },
  { id: 'chicken_chettinad', name: 'Home-Style Chicken Chettinad', portion: '120g chicken (low oil)', calories: 230, protein: 28, carbs: 6, category: 'Protein', isVeg: false },
  { id: 'grilled_chicken', name: 'Tawa Pepper Chicken Roast', portion: '120g boneless', calories: 200, protein: 30, carbs: 3, category: 'Protein', isVeg: false },
  { id: 'meen_kuzhambu', name: 'Vanjaram / Fish Kuzhambu', portion: '1 piece (120g) + gravy', calories: 210, protein: 24, carbs: 5, category: 'Protein', isVeg: false },
  { id: 'boiled_eggs', name: 'Boiled Eggs (Whole)', portion: '2 large eggs', calories: 155, protein: 13, carbs: 1, category: 'Protein', isVeg: false },
  { id: 'egg_podimas', name: 'South Indian Egg Podimas', portion: '2 eggs scrambled', calories: 185, protein: 13, carbs: 3, category: 'Protein', isVeg: false },
  { id: 'paneer_masala', name: 'Paneer & Peas Masala (light)', portion: '100g paneer bowl', calories: 240, protein: 15, carbs: 9, category: 'Protein', isVeg: true },
  { id: 'sundal', name: 'Black Chana / Moong Sundal', portion: '1 bowl (120g)', calories: 165, protein: 9, carbs: 27, category: 'Snack & Drink', isVeg: true },
  { id: 'neer_mor', name: 'Neer Mor (Spiced Buttermilk)', portion: '1 tall glass (250ml)', calories: 45, protein: 2, carbs: 4, category: 'Snack & Drink', isVeg: true },
  { id: 'filter_coffee', name: 'Filter Coffee (No Sugar)', portion: '1 small cup (120ml)', calories: 55, protein: 2, carbs: 4, category: 'Snack & Drink', isVeg: true },
  { id: 'kambu_koozh', name: 'Kambu Koozh (Pearl Millet)', portion: '1 glass (250ml)', calories: 130, protein: 4, carbs: 26, category: 'Snack & Drink', isVeg: true },
];

type Props = {
  profile: Profile;
  dietType: 'veg' | 'nonveg';
};

export default function FoodLogTab({ profile, dietType }: Props) {
  const [loggedFoods, setLoggedFoods] = useState<LoggedFood[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'All' | 'Breakfast' | 'Main Meal' | 'Protein' | 'Snack & Drink'>('All');
  const [customName, setCustomName] = useState('');
  const [customCals, setCustomCals] = useState('');

  useEffect(() => {
    const key = `dailyfit_foods_${new Date().toISOString().split('T').at(0) || 'today'}`;
    const saved = localStorage.getItem(key);
    if (saved) setLoggedFoods(JSON.parse(saved));
  }, []);

  const persistFoods = (next: LoggedFood[]) => {
    setLoggedFoods(next);
    const key = `dailyfit_foods_${new Date().toISOString().split('T').at(0) || 'today'}`;
    localStorage.setItem(key, JSON.stringify(next));
  };

  const handleAddFood = (item: FoodItem) => {
    const entry: LoggedFood = {
      ...item,
      logId: `${item.id}_${Date.now()}`,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };
    persistFoods([entry, ...loggedFoods]);
  };

  const handleAddCustom = (e: React.FormEvent) => {
    e.preventDefault();
    const cal = Number(customCals);
    if (!customName.trim() || !cal || cal <= 0) return;
    handleAddFood({
      id: 'custom',
      name: customName.trim(),
      portion: 'Custom portion',
      calories: cal,
      protein: Math.round(cal * 0.04),
      carbs: Math.round(cal * 0.12),
      category: 'Main Meal',
      isVeg: true,
    });
    setCustomName('');
    setCustomCals('');
  };

  const handleRemoveFood = (logId: string) => {
    persistFoods(loggedFoods.filter((f) => f.logId !== logId));
  };

  const totalEaten = loggedFoods.reduce((sum, f) => sum + f.calories, 0);
  const totalProtein = loggedFoods.reduce((sum, f) => sum + f.protein, 0);
  const proteinGoal = Math.round(profile.weight * 1.4);
  const remaining = profile.daily_calorie_target - totalEaten;
  const calPct = Math.min(100, Math.round((totalEaten / profile.daily_calorie_target) * 100));
  const proPct = Math.min(100, Math.round((totalProtein / proteinGoal) * 100));

  const filteredFoods = SOUTH_INDIAN_FOODS.filter((item) => {
    if (dietType === 'veg' && !item.isVeg) return false;
    if (category !== 'All' && item.category !== category) return false;
    if (search.trim() && !item.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const categories: ('All' | 'Breakfast' | 'Main Meal' | 'Protein' | 'Snack & Drink')[] = [
    'All',
    'Breakfast',
    'Main Meal',
    'Protein',
    'Snack & Drink',
  ];

  return (
    <div className="px-5 mt-5 space-y-4">
      {/* Live Calorie & Protein Budget Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold">
              Today’s Food Intake
            </span>
            <div className="text-2xl font-black text-white mt-0.5">
              {totalEaten}{' '}
              <span className="text-xs font-normal text-zinc-400">
                / {profile.daily_calorie_target} kcal
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
              Remaining
            </span>
            <div
              className={`text-xl font-black mt-0.5 ${
                remaining >= 0 ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {remaining >= 0 ? `${remaining} kcal` : `+${Math.abs(remaining)} over`}
            </div>
          </div>
        </div>

        {/* Calorie Bar */}
        <div>
          <div className="flex justify-between text-[10px] font-bold text-zinc-400 mb-1">
            <span>Calorie Budget</span>
            <span>{calPct}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
            <div
              style={{ width: `${calPct}%` }}
              className={`h-full rounded-full transition-all duration-300 ${
                remaining >= 0 ? 'bg-emerald-500' : 'bg-rose-500'
              }`}
            />
          </div>
        </div>

        {/* Protein Bar */}
        <div>
          <div className="flex justify-between text-[10px] font-bold text-zinc-400 mb-1">
            <span>Protein Target ({totalProtein}g / {proteinGoal}g)</span>
            <span className="text-sky-400">{proPct}%</span>
          </div>
          <div className="w-full h-2 bg-zinc-950 rounded-full overflow-hidden">
            <div
              style={{ width: `${proPct}%` }}
              className="h-full bg-sky-400 rounded-full transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Logged Foods Today */}
      {loggedFoods.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-2.5">
          <div className="text-xs font-extrabold text-white">🍽️ Logged Today ({loggedFoods.length})</div>
          {loggedFoods.map((f) => (
            <div
              key={f.logId}
              className="flex items-center justify-between bg-zinc-950 px-3.5 py-2.5 rounded-2xl border border-zinc-800/80"
            >
              <div>
                <div className="text-xs font-bold text-zinc-100">{f.name}</div>
                <div className="text-[10px] text-zinc-400">
                  {f.time} • {f.calories} kcal • {f.protein}g protein
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveFood(f.logId)}
                                className="text-xs font-bold text-rose-400 hover:text-rose-300 px-2 py-1"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search & South Indian Dish Picker */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 space-y-3">
        <div className="text-xs font-extrabold text-white">🍛 Quick Add South Indian Food</div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search idli, dosa, pongal, chicken, egg..."
          className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-400"
        />

        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-extrabold whitespace-nowrap transition ${
                category === cat
                  ? 'bg-emerald-500 text-zinc-950'
                  : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="space-y-2 max-h-72 overflow-y-auto pr-0.5">
          {filteredFoods.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-zinc-950 px-3.5 py-2.5 rounded-2xl border border-zinc-800/80"
            >
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                  {item.name}
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">
                  {item.portion} • <span className="text-emerald-400 font-bold">{item.calories} kcal</span> •{' '}
                  {item.protein}g P
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleAddFood(item)}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-extrabold active:scale-90 transition"
              >
                + Add
              </button>
            </div>
          ))}
        </div>

        {/* Custom Food Quick Form */}
        <form onSubmit={handleAddCustom} className="pt-2 border-t border-zinc-800 flex gap-2">
          <input
            type="text"
            value={customName}
            onChange={(e) => setCustomName(e.target.value)}
            placeholder="Custom dish name"
            className="flex-1 px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white focus:outline-none focus:border-emerald-400"
          />
          <input
            type="number"
            value={customCals}
            onChange={(e) => setCustomCals(e.target.value)}
            placeholder="kcal"
            className="w-20 px-2.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-white text-center focus:outline-none focus:border-emerald-400"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-emerald-500 text-zinc-950 font-extrabold text-xs"
          >
            +
          </button>
        </form>
      </div>
    </div>
  );
}

