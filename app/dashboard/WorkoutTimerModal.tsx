'use client';

import { useState, useEffect, useRef } from 'react';
import { WorkoutDemo } from './data';

type Props = {
  workout: WorkoutDemo;
  onClose: () => void;
};

export default function WorkoutTimerModal({ workout, onClose }: Props) {
  const totalSets = 3;
  const workSeconds = 30;
  const restSeconds = 15;

  const [setNum, setSetNum] = useState(1);
  const [phase, setPhase] = useState<'work' | 'rest' | 'done'>('work');
  const [secondsLeft, setSecondsLeft] = useState(workSeconds);
  const [paused, setPaused] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playBeep = (freq = 880, duration = 0.25) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!audioCtxRef.current) audioCtxRef.current = new AudioCtx();
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Ignore audio block if muted
    }
  };

  useEffect(() => {
    if (paused || phase === 'done') return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          if (phase === 'work') {
            if (setNum >= totalSets) {
              playBeep(1046, 0.5);
              setPhase('done');
              return 0;
            } else {
              playBeep(587, 0.3);
              setPhase('rest');
              return restSeconds;
            }
          } else {
            playBeep(880, 0.3);
            setSetNum((s) => s + 1);
            setPhase('work');
            return workSeconds;
          }
        }
        if (prev <= 4) playBeep(660, 0.1);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [paused, phase, setNum]);

  const maxSec = phase === 'work' ? workSeconds : restSeconds;
  const pct = phase === 'done' ? 100 : Math.round((secondsLeft / maxSec) * 100);
  const ringColor = phase === 'work' ? '#10b981' : phase === 'rest' ? '#f59e0b' : '#34d399';

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-6 text-center space-y-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400">
            ⏱️ Guided Timer
          </span>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-400 hover:text-white font-bold text-xs"
          >
            ✕
          </button>
        </div>

        <div>
          <h3 className="text-xl font-black text-white">{workout.name}</h3>
          <p className="text-xs text-zinc-400 mt-0.5">{workout.reps}</p>
        </div>

        {/* Circular Progress Ring */}
        <div className="flex justify-center">
          <div
            className="w-44 h-44 rounded-full flex items-center justify-center transition-all duration-500"
            style={{ background: `conic-gradient(${ringColor} ${pct * 3.6}deg, #27272a 0deg)` }}
          >
            <div className="w-36 h-36 rounded-full bg-zinc-950 flex flex-col items-center justify-center">
              {phase === 'done' ? (
                <>
                  <span className="text-3xl">🎉</span>
                  <span className="text-sm font-black text-emerald-400 mt-1">All 3 Sets Done!</span>
                </>
              ) : (
                <>
                  <span
                    className={`text-[11px] font-extrabold uppercase tracking-wider ${
                      phase === 'work' ? 'text-emerald-400' : 'text-amber-400'
                    }`}
                  >
                    {phase === 'work' ? `Set ${setNum}/${totalSets} • Work` : 'Rest & Breathe'}
                  </span>
                  <span className="text-5xl font-black text-white mt-1">{secondsLeft}s</span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Controls */}
        {phase === 'done' ? (
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-sm transition active:scale-95"
          >
            Finish Exercise ✅
          </button>
        ) : (
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              className="flex-1 py-3.5 rounded-2xl bg-zinc-800 hover:bg-zinc-700 text-white font-extrabold text-xs transition"
            >
              {paused ? '▶️ Resume' : '⏸️ Pause'}
            </button>
            {phase === 'rest' && (
              <button
                type="button"
                onClick={() => {
                  setSetNum((s) => s + 1);
                  setPhase('work');
                  setSecondsLeft(workSeconds);
                }}
                className="flex-1 py-3.5 rounded-2xl bg-emerald-500 text-zinc-950 font-extrabold text-xs transition"
              >
                Skip Rest →
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
