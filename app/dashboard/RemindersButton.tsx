'use client';

import { useState, useEffect } from 'react';

const SCHEDULE = [
  { hour: 6, min: 30, title: '🌅 Wake-Up Hydration & Burn', body: 'Drink your warm jeera/lemon water & start your morning workout!' },
  { hour: 8, min: 30, title: '🍳 South Indian Breakfast Time', body: 'Log your idli/dosa/pongal breakfast & skip white sugar!' },
  { hour: 13, min: 30, title: '☀️ Balanced Lunch Plate', body: 'Time for your South Indian lunch + neer mor! Avoid afternoon sleep.' },
  { hour: 18, min: 0, title: '🌆 Evening Workout & Caffeine Cutoff', body: 'Start your evening toning session & skip tea/coffee after 5 PM!' },
  { hour: 20, min: 30, title: '🌙 Light Dinner & Final Water', body: 'Have a light South Indian dinner & complete your daily Check-In!' },
];

export default function RemindersButton() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dailyfit_reminders');
    if (saved === 'on') {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const checkSchedule = () => {
      const now = new Date();
      const h = now.getHours();
      const m = now.getMinutes();
      const todayStr = now.toISOString().split('T').at(0) || 'today';

      SCHEDULE.forEach((slot) => {
        if (h === slot.hour && m === slot.min) {
          const firedKey = `dailyfit_notified_${todayStr}_${slot.hour}_${slot.min}`;
          if (!localStorage.getItem(firedKey)) {
            localStorage.setItem(firedKey, '1');
            if ('Notification' in window && Notification.permission === 'granted') {
              new Notification(slot.title, { body: slot.body, icon: '/dailyfit-512.png' });
            }
          }
        }
      });
    };

    const interval = setInterval(checkSchedule, 30000);
    return () => clearInterval(interval);
  }, [enabled]);

  const handleToggleReminders = async () => {
    if (enabled) {
      setEnabled(false);
      localStorage.setItem('dailyfit_reminders', 'off');
      return;
    }

    if (!('Notification' in window)) {
      setEnabled(true);
      localStorage.setItem('dailyfit_reminders', 'on');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setEnabled(true);
      localStorage.setItem('dailyfit_reminders', 'on');
      new Notification('DailyFit Reminders Active! 🔔', {
        body: 'Alerts set for 6:30 AM, 8:30 AM, 1:30 PM, 6:00 PM & 8:30 PM!',
        icon: '/dailyfit-512.png',
      });
    } else {
      setEnabled(true);
      localStorage.setItem('dailyfit_reminders', 'on');
    }
  };

  return (
    <button
      onClick={handleToggleReminders}
      title="Toggle Daily Meal & Workout Reminders"
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition active:scale-95 whitespace-nowrap ${
        enabled
          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
      }`}
    >
      {enabled ? '🔔 On' : '🔕 Off'}
    </button>
  );
}
