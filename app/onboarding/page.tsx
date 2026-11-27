'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Syne, Plus_Jakarta_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';

const stylishFont = Syne({ subsets: ['latin'], weight: ['800'] });
const bodyFont = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '600', '700', '800'] });

const GOALS = [
  { id: 'lose_weight', emoji: '🔥', title: 'Lose Weight', desc: 'Burn fat steadily with South Indian meals' },
  { id: 'build_muscle', emoji: '💪', title: 'Build Muscle', desc: 'High-protein Tamil meals & strength focus' },
  { id: 'stay_fit', emoji: '⚡', title: 'Stay Fit & Active', desc: 'Boost energy, stamina & daily discipline' },
  { id: 'medical_care', emoji: '🩺', title: 'PCOS / Diabetes Care', desc: 'Low-GI millets, controlled carbs & balance' },
];

const ACTIVITIES = [
  { id: 'sedentary', emoji: '💻', title: 'Mostly Sitting', desc: 'Desk job, study, minimal walking', mult: 1.2 },
  { id: 'light', emoji: '🚶', title: 'Lightly Active', desc: '3,000–6,000 steps or light chores', mult: 1.375 },
  { id: 'moderate', emoji: '🏃', title: 'Moderately Active', desc: 'Workout or brisk walk 3–5 days/wk', mult: 1.55 },
  { id: 'active', emoji: '🏋️', title: 'Very Active', desc: 'Intense daily training or physical work', mult: 1.725 },
];

const DIETS = [
  { id: 'non_veg', emoji: '🍗', title: 'Non-Veg', desc: 'Chicken, fish, eggs + South Indian staples' },
  { id: 'eggetarian', emoji: '🥚', title: 'Eggetarian', desc: 'Veg meals + eggs for clean protein' },
  { id: 'veg', emoji: '🥗', title: 'Pure Veg', desc: 'Idli, dosa, paneer, dal, curd & millets' },
  { id: 'vegan', emoji: '🌱', title: 'Plant-Based', desc: 'Dairy-free legumes, sprouts & millets' },
];

const CONDITIONS = ['None', 'Diabetes / Pre-Diabetes', 'Thyroid', 'PCOS / PCOD', 'High BP', 'Cholesterol'];

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('lose_weight');
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [age, setAge] = useState(25);
  const [weight, setWeight] = useState(74);
  const [targetWeight, setTargetWeight] = useState(66);
  const [height, setHeight] = useState(170);
  const [activityLevel, setActivityLevel] = useState('light');
  const [weeklyPace, setWeeklyPace] = useState<0.25 | 0.5 | 0.75>(0.5);
  const [dietType, setDietType] = useState('non_veg');
  const [medicalConditions, setMedicalConditions] = useState<string[]>(['None']);
  const [challengeDays, setChallengeDays] = useState<30 | 60 | 90>(30);

  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

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

  const bmi = +(weight / ((height / 100) * (height / 100))).toFixed(1);
  const bmiLabel =
    bmi < 18.5 ? 'Underweight' : bmi < 23 ? 'Normal (Asian BMI)' : bmi < 27.5 ? 'Overweight' : 'Obese';

  const activityObj = ACTIVITIES.find((a) => a.id === activityLevel) || ACTIVITIES.at(1)!;
  const bmr =
    gender === 'male'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161;
  const maintenance = Math.round(bmr * activityObj.mult);
  const minSafe = gender === 'male' ? 1500 : 1200;

  let dailyCalorieTarget = maintenance;
  if (goal === 'lose_weight' || goal === 'medical_care') {
    const deficit = Math.round((weeklyPace * 7700) / 7);
    dailyCalorieTarget = Math.max(minSafe, maintenance - deficit);
  } else if (goal === 'build_muscle') {
    dailyCalorieTarget = maintenance + 300;
  }

  const dailyProteinTarget = Math.round(weight * (goal === 'build_muscle' ? 1.8 : 1.4));
  const dailyWaterGlasses = Math.max(8, Math.min(14, Math.round((weight * 35) / 250)));

  const weightDiff = Math.abs(weight - targetWeight);
  const weeksToGoal = weightDiff > 0 ? Math.ceil(weightDiff / weeklyPace) : 4;
  const targetDate = new Date(Date.now() + weeksToGoal * 7 * 86400000).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const toggleCondition = (item: string) => {
    if (item === 'None') {
      setMedicalConditions(['None']);
      return;
    }
    const filtered = medicalConditions.filter((c) => c !== 'None');
    if (filtered.includes(item)) {
      const next = filtered.filter((c) => c !== item);
      setMedicalConditions(next.length ? next : ['None']);
    } else {
      setMedicalConditions([...filtered, item]);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setErrorMsg('');

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push('/');
      return;
    }

    const { error } = await supabase.from('profiles').upsert({
      id: session.user.id,
      gender,
      age,
      weight,
      target_weight: targetWeight,
      height,
      goal,
      weekly_pace: weeklyPace,
      activity_level: activityLevel,
      diet_type: dietType,
      medical_conditions: medicalConditions,
      challenge_days: challengeDays,
      daily_calorie_target: dailyCalorieTarget,
      daily_protein_target: dailyProteinTarget,
      daily_water_glasses: dailyWaterGlasses,
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
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-3 text-emerald-400 font-bold">
        <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
        <span>Personalizing DailyFit...</span>
      </div>
    );
  }
    const stepsList = Array.from({ length: 5 }, (_, idx) => idx + 1);
  const challengeOptions = new Array<30 | 60 | 90>(30, 60, 90);

  return (
    <div className={`${bodyFont.className} min-h-screen bg-zinc-950 text-white px-5 pt-6 pb-28 w-full flex flex-col justify-between`}>
      <div>
        <div className="flex items-center justify-between mb-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 active:scale-90 transition"
            >
              ←
            </button>
          ) : (
            <div className="w-9" />
          )}
          <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">
            Step {step} of 5
          </span>
          <div className="w-9" />
        </div>

        <div className="grid grid-cols-5 gap-1.5 mb-7">
          {stepsList.map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s <= step ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50' : 'bg-zinc-800'
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-5">
            <div>
              <h1 className={`${stylishFont.className} text-3xl leading-tight`}>
                What’s your main <span className="text-emerald-400">health goal?</span>
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                We’ll tailor your daily South Indian meals & calorie budget around this.
              </p>
            </div>

            <div className="space-y-3">
              {GOALS.map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id)}
                  
                  className={`w-full p-4 rounded-2xl border text-left flex items-center gap-4 transition-all active:scale-[0.98] ${
                    goal === g.id
                      ? 'bg-emerald-500/15 border-emerald-400 shadow-lg shadow-emerald-500/10'
                      : 'bg-zinc-900/90 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-2xl shrink-0">
                    {g.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-extrabold text-base text-white">{g.title}</div>
                    <div className="text-xs text-zinc-400 mt-0.5">{g.desc}</div>
                  </div>
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      goal === g.id ? 'border-emerald-400 bg-emerald-400 text-zinc-950' : 'border-zinc-600'
                    }`}
                  >
                    {goal === g.id && <span className="text-xs font-black">✓</span>}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-5">
            <div>
              <h1 className={`${stylishFont.className} text-3xl leading-tight`}>
                Tell us about <span className="text-emerald-400">your body</span>
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Used to compute your Asian BMI & metabolic rate accurately.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {(['male', 'female'] as const).map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setGender(g)}
                  className={`py-3.5 rounded-2xl font-extrabold border transition flex items-center justify-center gap-2 ${
                    gender === g
                      ? 'bg-emerald-500 text-zinc-950 border-emerald-400 shadow-lg shadow-emerald-500/20'
                      : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                  }`}
                >
                  <span className="text-xl">{g === 'male' ? '👨' : '👩'}</span>
                  <span className="capitalize">{g}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Age (yrs)', val: age, set: setAge, min: 16, max: 85, step: 1 },
                { label: 'Height (cm)', val: height, set: setHeight, min: 130, max: 220, step: 1 },
                { label: 'Current Weight (kg)', val: weight, set: setWeight, min: 35, max: 200, step: 1 },
                { label: 'Target Weight (kg)', val: targetWeight, set: setTargetWeight, min: 35, max: 180, step: 1 },
              ].map((item) => (
                <div key={item.label} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-3.5">
                  <div className="text-[11px] font-bold uppercase text-zinc-400 mb-2">{item.label}</div>
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => item.set(Math.max(item.min, item.val - item.step))}
                      className="w-9 h-9 rounded-xl bg-zinc-800 text-lg font-black text-emerald-400 active:scale-90 transition"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.val}
                      onChange={(e) => item.set(Number(e.target.value) || item.min)}
                      className="w-16 bg-transparent text-center text-xl font-extrabold text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => item.set(Math.min(item.max, item.val + item.step))}
                      className="w-9 h-9 rounded-xl bg-zinc-800 text-lg font-black text-emerald-400 active:scale-90 transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-zinc-900 to-emerald-950/30 border border-emerald-500/30 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <div className="text-xs text-zinc-400 font-semibold">Live Asian BMI Score</div>
                <div className="text-sm font-bold text-emerald-400 mt-0.5">{bmiLabel}</div>
              </div>
              <div className="text-3xl font-black text-white">{bmi}</div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h1 className={`${stylishFont.className} text-3xl leading-tight`}>
                Your daily <span className="text-emerald-400">activity & pace</span>
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Helps calculate your exact daily calorie burn & timeline.
              </p>
            </div>

            <div className="space-y-2.5">
              {ACTIVITIES.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setActivityLevel(a.id)}
                  className={`w-full p-3.5 rounded-2xl border text-left flex items-center gap-3.5 transition ${
                    activityLevel === a.id
                      ? 'bg-emerald-500/15 border-emerald-400'
                      : 'bg-zinc-900 border-zinc-800'
                  }`}
                >
                  <span className="text-2xl">{a.emoji}</span>
                  <div className="flex-1">
                    <div className="font-bold text-sm">{a.title}</div>
                    <div className="text-xs text-zinc-400">{a.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">
                Weekly Goal Pace
              </label>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { val: 0.25, label: '0.25 kg/wk', tag: 'Relaxed' },
                  { val: 0.5, label: '0.5 kg/wk', tag: 'Recommended' },
                  { val: 0.75, label: '0.75 kg/wk', tag: 'Fast' },
                ] as const).map((p) => (
                  <button
                    key={p.val}
                    type="button"
                    onClick={() => setWeeklyPace(p.val)}
                    className={`p-3 rounded-2xl border text-center transition ${
                      weeklyPace === p.val
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="font-extrabold text-xs">{p.label}</div>
                    <div className="text-[10px] mt-0.5 opacity-80">{p.tag}</div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-emerald-400 font-semibold mt-2.5 text-center">
                🗓️ Estimated target date: <span className="underline">{targetDate}</span>
              </p>
            </div>
          </div>
        )}

                {step === 4 && (
          <div className="space-y-5">
            <div>
              <h1 className={`${stylishFont.className} text-3xl leading-tight`}>
                South Indian <span className="text-emerald-400">food & health</span>
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                We rotate fresh Tamil Nadu & South Indian meals every single day.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {DIETS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDietType(d.id)}
                  className={`p-3.5 rounded-2xl border text-left transition ${
                    dietType === d.id
                      ? 'bg-emerald-500/15 border-emerald-400'
                      : 'bg-zinc-900 border-zinc-800'
                  }`}
                >
                  <div className="text-2xl mb-1">{d.emoji}</div>
                  <div className="font-extrabold text-sm">{d.title}</div>
                  <div className="text-[11px] text-zinc-400 mt-0.5 leading-snug">{d.desc}</div>
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">
                Any Health Conditions?
              </label>
              <div className="flex flex-wrap gap-2">
                {CONDITIONS.map((c) => {
                  const active = medicalConditions.includes(c);
                  return (
                    <button
                      key={c}
                      type="button"
                      onClick={() => toggleCondition(c)}
                      className={`px-3.5 py-2 rounded-full text-xs font-bold border transition ${
                        active
                          ? 'bg-emerald-500 text-zinc-950 border-emerald-400'
                          : 'bg-zinc-900 text-zinc-300 border-zinc-800'
                      }`}
                    >
                      {c}
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-zinc-400 mb-2">
                Challenge Streak Goal 🏆
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {challengeOptions.map((days) => (
                  <button
                    key={days}
                    type="button"
                    onClick={() => setChallengeDays(days)}
                    className={`py-3 rounded-2xl border text-center transition ${
                      challengeDays === days
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400'
                    }`}
                  >
                    <div className="text-lg font-black">{days} Days</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
                {step === 5 && (
          <div className="space-y-5">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-400/30 text-emerald-400 text-xs font-bold mb-2">
                ✨ Healthify-Grade Custom Plan Ready
              </span>
              <h1 className={`${stylishFont.className} text-3xl leading-tight`}>
                Your Daily <span className="text-emerald-400">Blueprint</span>
              </h1>
              <p className="text-zinc-400 text-sm mt-1">
                Built for {weight} kg → {targetWeight} kg ({dietType.replace('_', '-')} South Indian diet).
              </p>
            </div>

            <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-950/40 border border-emerald-500/40 rounded-3xl p-5 space-y-4 shadow-xl">
              <div className="text-center pb-4 border-b border-zinc-800">
                <div className="text-xs uppercase tracking-widest text-zinc-400 font-bold">
                  Daily Calorie Budget
                </div>
                <div className="text-5xl font-black text-emerald-400 mt-1">
                  {dailyCalorieTarget} <span className="text-lg font-bold text-zinc-300">kcal</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-zinc-950/80 p-3 rounded-2xl border border-zinc-800">
                  <div className="text-lg font-black text-white">{dailyProteinTarget}g</div>
                  <div className="text-[11px] text-zinc-400">Protein/day</div>
                </div>
                <div className="bg-zinc-950/80 p-3 rounded-2xl border border-zinc-800">
                  <div className="text-lg font-black text-sky-400">{dailyWaterGlasses} 🥛</div>
                  <div className="text-[11px] text-zinc-400">Water Goal</div>
                </div>
                <div className="bg-zinc-950/80 p-3 rounded-2xl border border-zinc-800">
                  <div className="text-lg font-black text-amber-400">{bmi}</div>
                  <div className="text-[11px] text-zinc-400">Asian BMI</div>
                </div>
              </div>

              <div className="bg-zinc-950/60 p-3.5 rounded-2xl text-xs text-zinc-300 space-y-1">
                <div>🍛 <strong>7-Day Rotating Menu:</strong> Fresh Tamil & South Indian dishes daily</div>
                <div>🗓️ <strong>Target Milestone:</strong> Reach {targetWeight} kg by <strong className="text-emerald-400">{targetDate}</strong></div>
              </div>
            </div>

            {errorMsg && (
              <p className="text-red-400 text-xs bg-red-950/50 p-3 rounded-xl">⚠️ {errorMsg}</p>
            )}
          </div>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-zinc-950/95 backdrop-blur border-t border-zinc-900">
        {step < 5 ? (
          <button
            type="button"
            onClick={() => setStep(step + 1)}
            className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-base transition active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            Continue →
          </button>
        ) : (
          <button
            type="button"
            disabled={loading}
            onClick={handleSaveProfile}
            className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-base transition active:scale-95 shadow-lg shadow-emerald-500/20"
          >
            {loading ? 'Creating Your Plan... ⏳' : `Start My ${challengeDays}-Day Transformation 🔥`}
          </button>
        )}
      </div>
    </div>
  );
}




