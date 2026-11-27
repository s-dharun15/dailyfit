'use client';

import { useState } from 'react';
import { Profile } from './data';

type Props = {
  profile: Profile;
  completedCount: number;
  totalCaloriesLost: number;
  startWeight: number;
  latestWeight: number;
  bmi: number;
  onClose: () => void;
};

export default function ShareProgressModal({
  profile,
  completedCount,
  totalCaloriesLost,
  startWeight,
  latestWeight,
  bmi,
  onClose,
}: Props) {
  const [sharing, setSharing] = useState(false);
  const [copied, setCopied] = useState(false);

  const lost = +(startWeight - latestWeight).toFixed(1);
  const weightText =
    lost > 0 ? `-${lost} kg Lost` : lost < 0 ? `+${Math.abs(lost)} kg Gained` : `${latestWeight} kg`;

  const generateCardBlob = async (): Promise<Blob | null> => {
    const canvas = document.createElement('canvas');
    canvas.width = 900;
    canvas.height = 1120;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    // Background gradient
    const bg = ctx.createLinearGradient(0, 0, 900, 1120);
    bg.addColorStop(0, '#09090b');
    bg.addColorStop(0.55, '#052e16');
    bg.addColorStop(1, '#09090b');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 900, 1120);

    // Outer border
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.45)';
    ctx.lineWidth = 4;
    ctx.roundRect(40, 40, 820, 1040, 44);
    ctx.stroke();

    // Brand Title
    ctx.fillStyle = '#ffffff';
    ctx.font = '800 56px sans-serif';
    ctx.fillText('Daily', 90, 140);
    ctx.fillStyle = '#34d399';
    ctx.fillText('Fit', 228, 140);

    ctx.fillStyle = '#a1a1aa';
    ctx.font = '700 24px sans-serif';
    ctx.fillText('SOUTH INDIAN FITNESS CHALLENGE', 90, 182);

    // Big Streak Hero
    ctx.fillStyle = '#10b981';
    ctx.font = '900 130px sans-serif';
    ctx.fillText(`${completedCount} DAYS`, 90, 355);

    ctx.fillStyle = '#d4d4d8';
    ctx.font = '700 32px sans-serif';
    ctx.fillText(`Completed out of ${profile.challenge_days}-Day Goal 🔥`, 90, 408);

    // 3 Stat Boxes
    const boxes = [
      { label: 'TOTAL BURNED', value: `${totalCaloriesLost.toLocaleString()} kcal`, y: 480 },
      { label: 'WEIGHT PROGRESS', value: `${latestWeight} kg (${weightText})`, y: 650 },
      { label: 'ASIAN BMI SCORE', value: `${bmi} BMI`, y: 820 },
    ];

    boxes.forEach((b) => {
      ctx.fillStyle = 'rgba(9, 9, 11, 0.78)';
      ctx.beginPath();
      ctx.roundRect(90, b.y, 720, 140, 28);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#34d399';
      ctx.font = '800 20px sans-serif';
      ctx.fillText(b.label, 125, b.y + 48);

      ctx.fillStyle = '#ffffff';
      ctx.font = '900 44px sans-serif';
      ctx.fillText(b.value, 125, b.y + 106);
    });

    // Footer URL
    ctx.fillStyle = '#71717a';
    ctx.font = '700 24px sans-serif';
    ctx.fillText('Tracked with DailyFit • dailyfit-gold.vercel.app', 90, 1030);

    return new Promise((resolve) => canvas.toBlob((blob) => resolve(blob), 'image/png'));
  };

  const handleShare = async () => {
    setSharing(true);
    const shareText = `🔥 Day ${completedCount}/${profile.challenge_days} on DailyFit! Burned ${totalCaloriesLost.toLocaleString()} kcal with South Indian meals & home workouts. Join me: https://vercel.app`;

    try {
      const blob = await generateCardBlob();
      if (blob && navigator.share) {
        const file = new File([blob], 'dailyfit-progress.png', { type: 'image/png' });
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: 'My DailyFit Transformation',
            text: shareText,
            files: [file],
          });
          setSharing(false);
          return;
        }
      }

      if (navigator.share) {
        await navigator.share({ title: 'My DailyFit Transformation', text: shareText });
      } else {
        await navigator.clipboard.writeText(shareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      }
    } catch {
      // User cancelled share dialog
    }
    setSharing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-4 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-400">
            📤 Achievement Card
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white font-bold text-xs"
          >
            ✕
          </button>
        </div>

        {/* Live Visual Preview */}
        <div className="bg-gradient-to-br from-zinc-950 via-emerald-950/50 to-zinc-950 border border-emerald-500/40 rounded-3xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-lg font-black text-white">
              Daily<span className="text-emerald-400">Fit</span>
            </div>
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-300">
              {profile.challenge_days}D Challenge
            </span>
          </div>

          <div>
            <div className="text-4xl font-black text-emerald-400">
              🔥 {completedCount} {completedCount === 1 ? 'Day' : 'Days'}
            </div>
            <div className="text-xs text-zinc-300 mt-0.5">South Indian Fitness Streak</div>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-zinc-950/80 p-3 rounded-2xl border border-white/5">
              <div className="text-[10px] text-zinc-400 uppercase font-bold">Total Burned</div>
              <div className="text-sm font-black text-white mt-0.5">
                {totalCaloriesLost.toLocaleString()} kcal
              </div>
            </div>
            <div className="bg-zinc-950/80 p-3 rounded-2xl border border-white/5">
              <div className="text-[10px] text-zinc-400 uppercase font-bold">Weight</div>
              <div className="text-sm font-black text-emerald-400 mt-0.5">{weightText}</div>
            </div>
          </div>
        </div>

        <button
          type="button"
          disabled={sharing}
          onClick={handleShare}
          className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs transition active:scale-95"
        >
          {copied
            ? 'Copied Progress Text to Clipboard! ✅'
            : sharing
            ? 'Generating Card... ⏳'
            : 'Share to WhatsApp / Instagram 🚀'}
        </button>
      </div>
    </div>
  );
}
