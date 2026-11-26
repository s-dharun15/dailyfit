'use client';

import { useState, useEffect } from 'react';

export default function RemindersButton() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dailyfit_reminders');
    if (saved === 'on' && typeof window !== 'undefined' && 'Notification' in window && Notification.permission === 'granted') {
      setEnabled(true);
    }
  }, []);

  const handleToggleReminders = async () => {
    // Turn OFF if currently ON
    if (enabled) {
      setEnabled(false);
      localStorage.setItem('dailyfit_reminders', 'off');
      return;
    }

    // Turn ON
    if (!('Notification' in window)) {
      setEnabled(true);
      localStorage.setItem('dailyfit_reminders', 'on');
      alert('Reminders saved! They will ring once installed on your Android phone. 📱');
      return;
    }

    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      setEnabled(true);
      localStorage.setItem('dailyfit_reminders', 'on');
      new Notification('DailyFit Reminders ON! 🔔', {
        body: 'Daily alerts set for 6:30 AM, 8:30 AM, 1:30 PM, 6:00 PM & 9:00 PM! ⚡',
      });
    } else {
      alert('Please allow notifications in your browser/phone settings first! 🔔');
    }
  };

  return (
    <button
      onClick={handleToggleReminders}
      title="Toggle Daily Reminders"
      className={`px-2.5 py-1.5 rounded-full text-xs font-bold border transition active:scale-95 ${
        enabled
          ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
          : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
      }`}
    >
      {enabled ? '🔔 On' : '🔕 Off'}
    </button>
  );
}
