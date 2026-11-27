'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import { useRouter } from 'next/navigation';
import { Profile, Answers, WorkoutDemo, getRoutineData } from './data';
import StreakTab from './StreakTab';
import VideoModal from './VideoModal';
import RemindersButton from './RemindersButton';
import Logo from '../Logo';

const stylishFont = Outfit({ subsets: ['latin'], weight: ['800'] });
const bodyFont = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '600', '700', '800'] });

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'routine' | 'checkin' | 'streak'>('routine');
  const getRealTimeSlotIndex = () => {
  const hour = new Date().getHours() + new Date().getMinutes() / 60;
  if (hour >= 5 && hour < 8) return 0;
  if (hour >= 8 && hour < 12) return 1;
  if (hour >= 12 && hour < 16.5) return 2;
  if (hour >= 16.5 && hour < 20) return 3;
  return 4;
};
const [selectedSlot, setSelectedSlot] = useState(getRealTimeSlotIndex);
const currentLiveSlot = getRealTimeSlotIndex();
  const [dietType, setDietType] = useState<string>('non_veg');
  const [previewDayOffset, setPreviewDayOffset] = useState(0);
  const [glassesDrunk, setGlassesDrunk] = useState(0);
  const [alreadyLoggedToday, setAlreadyLoggedToday] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeVideo, setActiveVideo] = useState<WorkoutDemo | null>(null);
  const router = useRouter();
  const [answers, setAnswers] = useState<Answers>({
    morning_water: null, morning_workout: null, healthy_breakfast: null, no_sugar: null,
    healthy_lunch: null, no_long_nap: null, evening_workout: null, no_late_caffeine: null,
    light_dinner: null, night_water: null,
  });

  useEffect(() => {
    const loadData = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return router.push('/');
      const { data: prof } = await supabase.from('profiles').select('*').eq('id', session.user.id).single();
      if (!prof) return router.push('/onboarding');
      setProfile(prof);
      if (prof.diet_type) setDietType(prof.diet_type);

      const { data: userLogs } = await supabase
        .from('daily_logs')
        .select('*')
        .eq('user_id', session.user.id)
        .order('day_number', { ascending: true });

      if (userLogs) {
        setLogs(userLogs);
        if (userLogs.some((l) => l.log_date === new Date().toISOString().split('T').at(0))) {
          setAlreadyLoggedToday(true);
        }
      }
    };
    loadData();
  }, [router]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center gap-3 text-emerald-400 font-bold">
        <Logo size={42} />
        <span className="text-xs tracking-widest uppercase">Loading DailyFit...</span>
      </div>
    );
  }

  const currentDay = Math.min(logs.length + 1, profile.challenge_days);
  const displayDay = currentDay + previewDayOffset;
  const { totalWaterLiters, totalGlasses, timeSlots, todayMenu } = getRoutineData(profile, dietType, displayDay);

  const allQuestions = timeSlots.flatMap((s) => s.questions);
  const todayCaloriesLost = allQuestions.reduce((sum, q) => sum + (answers[q.key] ? q.pts : 0), 0);
  const totalCaloriesLost = logs.reduce((sum, item) => sum + (item.calories_lost || 0), 0);
  const ringPercent = Math.min(100, Math.round((todayCaloriesLost / 950) * 100));
  const allAnswered = Object.values(answers).every((val) => val !== null);
  const currentCard = timeSlots[selectedSlot];

  const bmi = +(profile.weight / ((profile.height / 100) * (profile.height / 100))).toFixed(1);
  const proteinGoal = profile.daily_protein_target || Math.round(profile.weight * 1.4);

  const handleSubmitCheckIn = async () => {
    if (!allAnswered) return;
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase.from('daily_logs').insert({
      user_id: session.user.id,
      day_number: currentDay,
      ...answers,
      calories_lost: todayCaloriesLost,
    });
    if (!error) {
      setLogs((prev) => [...prev, { day_number: currentDay, calories_lost: todayCaloriesLost }]);
      setAlreadyLoggedToday(true);
      setActiveTab('streak');
    }
    setSaving(false);
  };
    const dietOptions = [
    { id: 'veg', label: '🥗 Veg' },
    { id: 'eggetarian', label: '🥚 Egg' },
    { id: 'non_veg', label: '🍗 Non-Veg' },
    { id: 'vegan', label: '🌱 Vegan' },
  ];

  const dayOffsets = new Array<number>(0, 1, 2, 3, 4, 5, 6);

  return (
    <div className={`${bodyFont.className} min-h-screen bg-zinc-950 text-white pb-32 w-full select-none`}>
      {/* Sticky Top Header */}
      <div className="px-4 pt-3 pb-2.5 flex items-center justify-between gap-2 sticky top-0 bg-zinc-950/95 backdrop-blur-md z-20 border-b border-zinc-900">
        <div className="flex items-center gap-2 shrink-0">
          <Logo size={28} />
          <h1 className={`${stylishFont.className} text-lg text-white`}>
            Daily<span className="text-emerald-400">Fit</span>
          </h1>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <RemindersButton />
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/');
            }}
            className="px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap bg-rose-500/15 border border-rose-500/40 text-rose-400 hover:bg-rose-500 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Diet Preference Selector Bar */}
      <div className="px-4 pt-3 flex items-center justify-between gap-2">
        <div className="bg-zinc-900 p-1 rounded-2xl border border-zinc-800 grid grid-cols-4 gap-1 w-full text-[11px] font-bold">
          {dietOptions.map((d) => (
            <button
              key={d.id}
              onClick={() => setDietType(d.id)}
              className={`py-1.5 rounded-xl transition ${
                dietType === d.id
                  ? 'bg-emerald-500 text-zinc-950 font-extrabold shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {d.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hero Stats: Calorie Ring + Hydration */}
      <div className="px-4 mt-3.5 grid grid-cols-2 gap-3">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-4 flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1">
            Day {currentDay}/{profile.challenge_days}
          </span>
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center my-1 transition-all duration-500"
            style={{ background: `conic-gradient(#10b981 ${ringPercent * 3.6}deg, #27272a 0deg)` }}
          >
            <div className="w-20 h-20 rounded-full bg-zinc-950 flex flex-col items-center justify-center">
              <span className="text-lg font-black text-white">{todayCaloriesLost}</span>
              <span className="text-[9px] text-zinc-400 uppercase">kcal lost</span>
            </div>
          </div>
          <span className="text-[11px] text-zinc-400 mt-1">Budget: {profile.daily_calorie_target} kcal</span>
        </div>

        <div className="bg-gradient-to-br from-sky-950/60 to-zinc-900 border border-sky-500/20 rounded-3xl p-4 flex flex-col justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-sky-400 font-bold">Hydration 💧</span>
            <div className="text-2xl font-black mt-1">
              {glassesDrunk} <span className="text-sm font-normal text-zinc-400">/ {totalGlasses}</span>
            </div>
            <p className="text-[11px] text-zinc-400 mt-0.5">Goal: {totalWaterLiters} Liters</p>
          </div>
          <button
            onClick={() => setGlassesDrunk((g) => Math.min(totalGlasses + 4, g + 1))}
            className="w-full py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-zinc-950 font-extrabold text-xs active:scale-90 transition"
          >
            +1 Glass (250ml) 🥤
          </button>
        </div>
      </div>

      {/* HealthifyMe Macro & Body Strip */}
      <div className="px-4 mt-3 grid grid-cols-3 gap-2">
        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-2.5 text-center">
          <div className="text-[10px] text-zinc-400 uppercase font-bold">Protein Goal</div>
          <div className="text-sm font-black text-emerald-400 mt-0.5">{proteinGoal}g / day</div>
        </div>
        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-2.5 text-center">
          <div className="text-[10px] text-zinc-400 uppercase font-bold">Asian BMI</div>
          <div className="text-sm font-black text-amber-400 mt-0.5">{bmi}</div>
        </div>
        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-2xl p-2.5 text-center">
          <div className="text-[10px] text-zinc-400 uppercase font-bold">Target Wt</div>
          <div className="text-sm font-black text-white mt-0.5">
            {profile.target_weight || Math.max(45, profile.weight - 5)} kg
          </div>
        </div>
      </div>

      {/* ROUTINE TAB */}
      {activeTab === 'routine' && (
        <div className="px-4 mt-4">
          {/* 7-Day Rotating South Indian Menu Switcher */}
          <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-3 mb-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-400">
                🍛 {todayMenu.dayName}
              </span>
              <span className="text-[10px] text-zinc-400">
                {previewDayOffset === 0 ? 'Today’s Menu' : `Previewing +${previewDayOffset}d`}
              </span>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {dayOffsets.map((offset) => {
                const dayNum = ((currentDay + offset - 1) % 7) + 1;
                return (
                  <button
                    key={offset}
                    onClick={() => setPreviewDayOffset(offset)}
                    className={`py-1.5 rounded-lg text-[10px] font-extrabold transition ${
                      previewDayOffset === offset
                        ? 'bg-emerald-500 text-zinc-950'
                        : 'bg-zinc-950 text-zinc-400 border border-zinc-800'
                    }`}
                  >
                    D{dayNum}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 5 Time-Slot Tabs */}
          <div className="grid grid-cols-5 gap-1.5 pb-1">
            {timeSlots.map((slot, i) => (
              <button
                key={i}
                onClick={() => setSelectedSlot(i)}
                className={`py-2 px-1 rounded-xl text-[10px] font-bold transition flex flex-col items-center gap-0.5 ${
                  selectedSlot === i
                    ? 'bg-emerald-500 text-zinc-950 shadow-md shadow-emerald-500/20'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800'
                }`}
              >
                <span className="text-sm leading-none">{slot.tab.split(' ').at(0)}</span>
                <span className="truncate w-full text-center">
                  {slot.tab.split(' ').at(1)} {slot.questions.every((q) => answers[q.key] !== null) && '✓'}
                </span>
              </button>
            ))}
          </div>

          {/* Active Time-Slot Card */}
          <div className={`mt-3 bg-gradient-to-b ${currentCard.accent} border rounded-3xl p-5 space-y-4`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-zinc-950/60">
                ⏰ {currentCard.badge}
              </span>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
  {selectedSlot === currentLiveSlot
    ? '🟢 Active Now'
    : selectedSlot < currentLiveSlot
    ? '✅ Earlier Today'
    : `🔒 Upcoming (${currentCard.badge})`}
</span>
            </div>

            <h2 className={`${stylishFont.className} text-xl text-white`}>{currentCard.title}</h2>

            <div className="space-y-3">
              {currentCard.items.map((item, idx) => (
                <div key={idx} className="bg-zinc-950/70 rounded-2xl p-3.5 border border-white/5 flex gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div>
                    <div className="text-xs font-bold text-white">{item.label}</div>
                    <ul className="mt-1 space-y-1">
                      {item.points.map((pt, pIdx) => (
                        <li key={pIdx} className="text-xs text-zinc-300 leading-relaxed flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            {currentCard.workouts.length > 0 && (
              <div className="space-y-2">
                {currentCard.workouts.map((w, i) => (
                  <div
                    key={i}
                    className="bg-zinc-950/90 border border-emerald-500/20 rounded-2xl px-3.5 py-2.5 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{w.name}</div>
                      <div className="text-[11px] text-zinc-400">{w.reps}</div>
                    </div>
                    <button
                      onClick={() => setActiveVideo(w)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-extrabold active:scale-95"
                    >
                      ▶️ Watch Demo
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="pt-2 border-t border-white/10 space-y-2.5">
                          <div className="text-[11px] uppercase tracking-wider text-zinc-400 font-bold">
                Quick Log This Step:
              </div>
              {currentCard.questions.map((q) => (
                <div key={q.key} className="flex items-center justify-between bg-zinc-950/80 px-3.5 py-2.5 rounded-2xl">
                  <div>
                    <div className="text-xs font-semibold text-zinc-100">{q.text}</div>
                    <div className="text-[10px] text-emerald-400 font-bold">+{q.pts} kcal</div>
                  </div>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setAnswers((p) => ({ ...p, [q.key]: true }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${
                        answers[q.key] === true ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setAnswers((p) => ({ ...p, [q.key]: false }))}
                      className={`px-3 py-1.5 rounded-xl text-xs font-extrabold ${
                        answers[q.key] === false ? 'bg-rose-500 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-1">
              {selectedSlot > 0 && (
                <button
                  onClick={() => setSelectedSlot((s) => s - 1)}
                  className="px-4 py-3 rounded-2xl bg-zinc-900 text-xs font-bold text-zinc-300"
                >
                  ← Back
                </button>
              )}
              {selectedSlot < 4 ? (
                <button
                  onClick={() => setSelectedSlot((s) => s + 1)}
                  className="flex-1 py-3 rounded-2xl bg-white text-zinc-950 font-extrabold text-xs"
                >
                  Next: {timeSlots[selectedSlot + 1].tab} →
                </button>
              ) : (
                <button
                  onClick={() => setActiveTab('checkin')}
                  className="flex-1 py-3 rounded-2xl bg-emerald-500 text-zinc-950 font-extrabold text-xs"
                >
                  Review & Finish Day {currentDay} ✅
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* CHECK-IN TAB */}
      {activeTab === 'checkin' && (
        <div className="px-4 mt-5">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
            <h2 className={`${stylishFont.className} text-lg text-emerald-400 mb-1`}>End-of-Day Summary ✅</h2>
            <p className="text-xs text-zinc-400 mb-4">Confirm all 10 Yes/No habits to lock in today’s calorie burn:</p>
            <div className="space-y-2.5">
              {allQuestions.map((q) => (
                <div
                  key={q.key}
                  className="flex items-center justify-between bg-zinc-950 p-3 rounded-2xl border border-zinc-800/80"
                >
                  <span className="text-xs text-zinc-200">{q.text}</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setAnswers((p) => ({ ...p, [q.key]: true }))}
                      className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        answers[q.key] === true ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setAnswers((p) => ({ ...p, [q.key]: false }))}
                      className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        answers[q.key] === false ? 'bg-rose-500 text-white' : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {alreadyLoggedToday ? (
              <div className="mt-5 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center text-xs text-emerald-300 font-bold">
                🎉 Day {currentDay} already logged! Come back tomorrow for Day {currentDay + 1}’s South Indian menu.
              </div>
            ) : (
              <button
                onClick={handleSubmitCheckIn}
                disabled={!allAnswered || saving}
                className="w-full mt-5 py-4 rounded-2xl bg-emerald-500 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-extrabold text-sm transition active:scale-95"
              >
                {saving
                  ? 'Saving Progress... ⏳'
                  : allAnswered
                  ? `Lock In ${todayCaloriesLost} kcal Lost 🔥`
                  : 'Answer All 10 Questions Above'}
              </button>
            )}
          </div>
        </div>
      )}

      {/* STREAK TAB */}
      {activeTab === 'streak' && (
             <StreakTab
       profile={profile}
       completedCount={logs.length}
       totalCaloriesLost={totalCaloriesLost}
       currentDay={currentDay}
       alreadyLoggedToday={alreadyLoggedToday}
     />

      )}

      {/* Bottom Sticky Tab Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-900 px-4 py-2.5 grid grid-cols-3 gap-2 z-20">
        {[
          { id: 'routine', icon: '🍛', label: 'Routine' },
          { id: 'checkin', icon: '✅', label: 'Check-In' },
          { id: 'streak', icon: '🔥', label: `${profile.challenge_days}D Streak` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'routine' | 'checkin' | 'streak')}
            className={`py-2 rounded-2xl flex flex-col items-center gap-0.5 text-[11px] font-extrabold transition ${
              activeTab === tab.id ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span className="text-base leading-none">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {activeVideo && <VideoModal workout={activeVideo} onClose={() => setActiveVideo(null)} />}
    </div>
  );
}


