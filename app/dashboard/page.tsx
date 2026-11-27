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
import EditProfileModal from './EditProfileModal';
import WorkoutTimerModal from './WorkoutTimerModal';
import FoodLogTab from './FoodLogTab';


;


const stylishFont = Outfit({ subsets: ['latin'], weight: ['800'] });
const bodyFont = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400', '600', '700', '800'] });

export default function Dashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
 const [activeTab, setActiveTab] = useState<'routine' | 'food' | 'checkin' | 'streak'>('routine');

  const [selectedSlot, setSelectedSlot] = useState(0);
const [dietType, setDietType] = useState<'veg' | 'nonveg'>('nonveg');
const [glassesDrunk, setGlassesDrunk] = useState(0);
const [previewDay, setPreviewDay] = useState<number | undefined>(undefined);


useEffect(() => {
  const h = new Date().getHours() + new Date().getMinutes() / 60;
  if (h >= 5 && h < 8) setSelectedSlot(0);
  else if (h >= 8 && h < 12) setSelectedSlot(1);
  else if (h >= 12 && h < 16.5) setSelectedSlot(2);
  else if (h >= 16.5 && h < 20) setSelectedSlot(3);
  else setSelectedSlot(4);

  const key = new Date().toISOString().split('T').at(0) || 'today';
  const savedWater = localStorage.getItem(`dailyfit_water_${key}`);
  if (savedWater) setGlassesDrunk(Number(savedWater));
}, []);

const handleAddWater = (maxGlasses: number) => {
  const key = new Date().toISOString().split('T').at(0) || 'today';
  setGlassesDrunk((prev) => {
    const next = Math.min(maxGlasses + 4, prev + 1);
    localStorage.setItem(`dailyfit_water_${key}`, String(next));
    return next;
  });
};

  const [alreadyLoggedToday, setAlreadyLoggedToday] = useState(false);
  const [saving, setSaving] = useState(false);
  const [activeVideo, setActiveVideo] = useState<WorkoutDemo | null>(null);
const [showEditProfile, setShowEditProfile] = useState(false);
const [timerWorkout, setTimerWorkout] = useState<WorkoutDemo | null>(null);
const [showCoach, setShowCoach] = useState(false);



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
      const { data: userLogs } = await supabase.from('daily_logs').select('*').eq('user_id', session.user.id).order('day_number', { ascending: true });
      if (userLogs) {
        setLogs(userLogs);
        if (userLogs.some((l) => l.log_date === new Date().toISOString().split('T'))) setAlreadyLoggedToday(true);
      }
    };
    loadData();
  }, [router]);

  if (!profile) return <Logo size={32} />


  const { totalWaterLiters, totalGlasses, timeSlots } = getRoutineData(profile, dietType, previewDay);
  const allQuestions = timeSlots.flatMap((s) => s.questions);
  const todayCaloriesLost = allQuestions.reduce((sum, q) => sum + (answers[q.key] ? q.pts : 0), 0);
  const totalCaloriesLost = logs.reduce((sum, item) => sum + (item.calories_lost || 0), 0);
  const currentDay = Math.min(logs.length + 1, profile.challenge_days);
  const ringPercent = Math.min(100, Math.round((todayCaloriesLost / 950) * 100));
  const allAnswered = Object.values(answers).every((val) => val !== null);
  const currentCard = timeSlots[selectedSlot];

  const handleSubmitCheckIn = async () => {
    if (!allAnswered) return;
    setSaving(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const { error } = await supabase.from('daily_logs').insert({ user_id: session.user.id, day_number: currentDay, ...answers, calories_lost: todayCaloriesLost });
    if (!error) {
      setLogs((prev) => [...prev, { day_number: currentDay, calories_lost: todayCaloriesLost }]);
      setAlreadyLoggedToday(true);
      setActiveTab('streak');
    }
    setSaving(false);
  };

  return (
    <div className={`${bodyFont.className} min-h-screen bg-zinc-950 text-white pb-24 w-full select-none`}>
            <div className="px-4 pt-4 pb-3 flex items-center justify-between gap-2 sticky top-0 bg-zinc-950/90 backdrop-blur-md z-20 border-b border-zinc-900">
        <div className="flex items-center gap-2 shrink-0">
          <Logo size={30} />
          <h1 className={`${stylishFont.className} text-lg text-white`}>
            Daily<span className="text-emerald-400">Fit</span>
          </h1>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <div className="bg-zinc-900 p-0.5 rounded-full border border-zinc-800 flex text-[10px] font-bold">
            <button onClick={() => setDietType('veg')} className={`px-2 py-1 rounded-full whitespace-nowrap ${dietType === 'veg' ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-400'}`}>🥗 Veg</button>
            <button onClick={() => setDietType('nonveg')} className={`px-2 py-1 rounded-full whitespace-nowrap ${dietType === 'nonveg' ? 'bg-amber-400 text-zinc-950' : 'text-zinc-400'}`}>🍗 Non-Veg</button>
          </div>
                    <button
            onClick={() => setShowCoach(true)}
            className="px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-500 hover:text-zinc-950 transition"
          >
            🩺 Coach
          </button>

          <button
          
         
  onClick={() => setShowEditProfile(true)}
  className="px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap bg-zinc-900 border border-zinc-700 text-zinc-300 hover:border-emerald-400 hover:text-emerald-300 transition"
>
  ⚙️ Edit
</button>
<RemindersButton />

          <button
            onClick={async () => { await supabase.auth.signOut(); router.push('/'); }}
            className="px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap bg-rose-500/15 border border-rose-500/40 text-rose-400 hover:bg-rose-500 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </div>


      <div className="px-5 mt-4 grid grid-cols-2 gap-3">
        <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-4 flex flex-col items-center justify-center">
          <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-bold mb-1">Day {currentDay}/{profile.challenge_days}</span>
          <div className="w-24 h-24 rounded-full flex items-center justify-center my-1" style={{ background: `conic-gradient(#10b981 ${ringPercent * 3.6}deg, #27272a 0deg)` }}>
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
            <div className="text-2xl font-black mt-1">{glassesDrunk} <span className="text-sm font-normal text-zinc-400">/ {totalGlasses}</span></div>
            <p className="text-[11px] text-zinc-400 mt-0.5">Goal: {totalWaterLiters} Liters</p>
          </div>
          <button onClick={() => handleAddWater(totalGlasses)} className="w-full py-2.5 rounded-2xl bg-sky-500 hover:bg-sky-400 text-zinc-950 font-extrabold text-xs active:scale-90">+1 Glass (250ml) 🥤</button>
        </div>
      </div>
            {activeTab === 'routine' && (
        <div className="px-5 mt-5">
                    <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-2.5 mb-3">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-400">
                📅 Weekly South Indian Menu
              </span>
              {previewDay !== undefined && (
                <button
                  type="button"
                  onClick={() => setPreviewDay(undefined)}
                  className="text-[10px] font-bold text-amber-400 underline"
                >
                  Back to Today
                </button>
              )}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, idx) => {
                const activeIdx = previewDay !== undefined ? previewDay : new Date().getDay();
                const isSelected = activeIdx === idx;
                return (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setPreviewDay(idx)}
                    className={`py-1.5 rounded-lg text-[10px] font-extrabold transition ${
                      isSelected
                        ? 'bg-emerald-500 text-zinc-950 shadow-sm'
                        : 'bg-zinc-950 text-zinc-400 border border-zinc-800/80 hover:text-white'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

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
                <span className="text-sm leading-none">{slot.tab.split(' ')[0]}</span>
                <span className="truncate w-full text-center">
                  {slot.tab.split(' ')[1]} {slot.questions.every((q) => answers[q.key] !== null) && '✓'}
                </span>
              </button>
            ))}
          </div>

          <div className={`mt-3 bg-gradient-to-b ${currentCard.accent} border rounded-3xl p-5 space-y-4`}>
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-zinc-950/60">⏰ {currentCard.badge}</span>
              <span className="text-xs text-zinc-400">Step {selectedSlot + 1} of 5</span>
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
                  <div key={i} className="bg-zinc-950/90 border border-emerald-500/20 rounded-2xl px-3.5 py-2.5 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{w.name}</div>
                      <div className="text-[11px] text-zinc-400">{w.reps}</div>
                    </div>
                                        <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => setTimerWorkout(w)}
                        className="px-2.5 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-extrabold active:scale-95"
                      >
                        ⏱️ Start
                      </button>
                      <button
                        onClick={() => setActiveVideo(w)}
                        className="px-2.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-extrabold active:scale-95"
                      >
                        ▶️ Demo
                      </button>
                    </div>

                  </div>
                ))}
              </div>
            )}

            
            <div className="flex gap-2 pt-1">
              {selectedSlot > 0 && <button onClick={() => setSelectedSlot((s) => s - 1)} className="px-4 py-3 rounded-2xl bg-zinc-900 text-xs font-bold text-zinc-300">← Back</button>}
              {selectedSlot < 4 ? (
                <button onClick={() => setSelectedSlot((s) => s + 1)} className="flex-1 py-3 rounded-2xl bg-white text-zinc-950 font-extrabold text-xs">Next: {timeSlots[selectedSlot + 1].tab} →</button>
              ) : (
                <button onClick={() => setActiveTab('checkin')} className="flex-1 py-3 rounded-2xl bg-emerald-500 text-zinc-950 font-extrabold text-xs">Review & Finish Day {currentDay} ✅</button>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'checkin' && (
        <div className="px-5 mt-5">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5">
            <h2 className={`${stylishFont.className} text-lg text-emerald-400 mb-1`}>End-of-Day Summary ✅</h2>
            <p className="text-xs text-zinc-400 mb-4">Confirm all 10 Yes/No habits to lock in today’s calorie burn:</p>
            <div className="space-y-2.5">
              {allQuestions.map((q) => (
                <div key={q.key} className="flex items-center justify-between bg-zinc-950 p-3 rounded-2xl border border-zinc-800/80">
                  <span className="text-xs text-zinc-200">{q.text}</span>
                  <div className="flex gap-1.5">
                    <button onClick={() => setAnswers((p) => ({ ...p, [q.key]: true }))} className={`px-3 py-1 rounded-xl text-xs font-bold ${answers[q.key] === true ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-zinc-400'}`}>Yes</button>
                    <button onClick={() => setAnswers((p) => ({ ...p, [q.key]: false }))} className={`px-3 py-1 rounded-xl text-xs font-bold ${answers[q.key] === false ? 'bg-rose-500 text-white' : 'bg-zinc-800 text-zinc-400'}`}>No</button>
                  </div>
                </div>
              ))}
            </div>
            {alreadyLoggedToday ? (
              <div className="mt-5 p-4 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-center text-xs font-bold text-emerald-300">🎉 Day {logs.length} already saved! Come back tomorrow for Day {currentDay}.</div>
            ) : (
              <button disabled={!allAnswered || saving} onClick={handleSubmitCheckIn} className={`w-full mt-5 py-4 rounded-2xl font-extrabold text-sm ${allAnswered ? 'bg-emerald-500 text-zinc-950' : 'bg-zinc-800 text-zinc-500'}`}>
                {saving ? 'Saving... ⏳' : allAnswered ? `Save Day ${currentDay} (-${todayCaloriesLost} kcal) 🔥` : 'Answer all 10 Yes/No above'}
              </button>
            )}
          </div>
        </div>
      )}
      {activeTab === 'food' && <FoodLogTab profile={profile} dietType={dietType} />}


      {activeTab === 'streak' && <StreakTab profile={profile} completedCount={logs.length} totalCaloriesLost={totalCaloriesLost} currentDay={currentDay} alreadyLoggedToday={alreadyLoggedToday} />}

            <div className="fixed bottom-0 left-0 right-0 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-900 px-4 py-2.5 grid grid-cols-4 gap-2 z-20">
        {[
          { id: 'routine', icon: '📅', label: 'Routine' },
          { id: 'food', icon: '🍛', label: 'Food Log' },
          { id: 'checkin', icon: '✅', label: 'Check-In' },
          { id: 'streak', icon: '🔥', label: `${profile.challenge_days}D Streak` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as 'routine' | 'food' | 'checkin' | 'streak')}
            className={`py-2 rounded-2xl flex flex-col items-center gap-0.5 text-[11px] font-extrabold transition ${
              activeTab === tab.id ? 'bg-emerald-500 text-zinc-950' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <span className="text-base leading-none">{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>


      <VideoModal workout={activeVideo} onClose={() => setActiveVideo(null)} />
           {showEditProfile && (
     <EditProfileModal
       profile={profile}
       onClose={() => setShowEditProfile(false)}
       onUpdated={(updated) => setProfile(updated)}
     />
   )}
      {timerWorkout && (
     <WorkoutTimerModal workout={timerWorkout} onClose={() => setTimerWorkout(null)} />
   )}


    </div>
  );
}

