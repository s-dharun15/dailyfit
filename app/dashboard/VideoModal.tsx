'use client';

import { WorkoutDemo } from './data';

const exerciseSteps: Record<string, string> = {
  'Jumping Jacks': '1. Stand straight with feet together and hands at your sides.\n2. Jump feet out wide while raising both arms overhead.\n3. Jump back to start and keep a steady, light rhythm.',
  'Bodyweight Squats': '1. Stand with feet shoulder-width apart, toes slightly out.\n2. Push hips back and bend knees until thighs are parallel to the floor.\n3. Keep chest lifted and push through your heels to stand.',
  'Forearm Plank': '1. Rest on your forearms with elbows directly under your shoulders.\n2. Keep your body in a straight line—do not let hips sag or pike up.\n3. Squeeze your abs and glutes tightly while breathing steadily.',
  'Forward Lunges': '1. Step forward with one leg and lower hips until both knees bend at 90°.\n2. Keep your front knee stacked directly above your ankle.\n3. Push off your front foot back to standing and switch legs.',
  'Mountain Climbers': '1. Start in a high push-up plank with hands under your shoulders.\n2. Drive one knee toward your chest, then quickly switch legs.\n3. Keep your hips low and core braced throughout.',
  'Bicycle Crunches': '1. Lie flat on your back with hands lightly behind your head.\n2. Bring your right elbow toward your left knee while extending your right leg.\n3. Alternate sides in a controlled pedaling motion.',
};

function PoseIllustration({ name, phase }: { name: string; phase: 1 | 2 }) {
  return (
    <svg viewBox="0 0 160 160" className="w-full h-full">
      <line x1="20" y1="142" x2="140" y2="142" stroke="#3f3f46" strokeWidth="3" strokeLinecap="round" />

      {name === 'Jumping Jacks' && phase === 1 && (
        <g stroke="#34d399" strokeWidth="7" strokeLinecap="round" fill="none">
          <circle cx="80" cy="34" r="11" fill="#34d399" stroke="none" />
          <line x1="80" y1="48" x2="80" y2="92" />
          <line x1="80" y1="56" x2="64" y2="88" stroke="#a3e635" />
          <line x1="80" y1="56" x2="96" y2="88" stroke="#a3e635" />
          <line x1="80" y1="92" x2="73" y2="138" />
          <line x1="80" y1="92" x2="87" y2="138" />
        </g>
      )}
      {name === 'Jumping Jacks' && phase === 2 && (
        <g stroke="#34d399" strokeWidth="7" strokeLinecap="round" fill="none">
          <circle cx="80" cy="26" r="11" fill="#34d399" stroke="none" />
          <line x1="80" y1="40" x2="80" y2="84" />
          <polyline points="80,50 52,26 70,12" stroke="#a3e635" />
          <polyline points="80,50 108,26 90,12" stroke="#a3e635" />
          <line x1="80" y1="84" x2="54" y2="130" />
          <line x1="80" y1="84" x2="106" y2="130" />
        </g>
      )}

      {name === 'Bodyweight Squats' && phase === 1 && (
        <g stroke="#34d399" strokeWidth="7" strokeLinecap="round" fill="none">
          <circle cx="80" cy="34" r="11" fill="#34d399" stroke="none" />
          <line x1="80" y1="48" x2="80" y2="92" />
          <line x1="80" y1="58" x2="112" y2="58" stroke="#a3e635" />
          <line x1="80" y1="92" x2="74" y2="138" />
          <line x1="80" y1="92" x2="88" y2="138" />
        </g>
      )}
      {name === 'Bodyweight Squats' && phase === 2 && (
        <g stroke="#34d399" strokeWidth="7" strokeLinecap="round" fill="none">
          <circle cx="72" cy="58" r="11" fill="#34d399" stroke="none" />
          <line x1="68" y1="71" x2="56" y2="104" />
          <line x1="66" y1="76" x2="106" y2="74" stroke="#a3e635" />
          <polyline points="56,104 92,104 92,138" />
        </g>
      )}

      {name === 'Forearm Plank' && (
        <g stroke="#34d399" strokeWidth="7" strokeLinecap="round" fill="none">
          <circle cx="122" cy="96" r="10" fill="#34d399" stroke="none" />
          <polyline points="112,106 112,136 132,136" stroke="#a3e635" />
          <line x1="112" y1="106" x2="34" y2="136" />
        </g>
      )}

      {name === 'Forward Lunges' && phase === 1 && (
        <g stroke="#34d399" strokeWidth="7" strokeLinecap="round" fill="none">
          <circle cx="80" cy="34" r="11" fill="#34d399" stroke="none" />
          <line x1="80" y1="48" x2="80" y2="92" />
          <line x1="80" y1="58" x2="66" y2="86" stroke="#a3e635" />
          <line x1="80" y1="92" x2="76" y2="138" />
          <line x1="80" y1="92" x2="86" y2="138" />
        </g>
      )}
      {name === 'Forward Lunges' && phase === 2 && (
        <g stroke="#34d399" strokeWidth="7" strokeLinecap="round" fill="none">
          <circle cx="80" cy="52" r="11" fill="#34d399" stroke="none" />
          <line x1="80" y1="66" x2="80" y2="104" />
          <polyline points="80,104 114,104 114,138" />
          <polyline points="80,104 54,134 36,134" />
        </g>
      )}

      {(name === 'Mountain Climbers' || name === 'Bicycle Crunches') && phase === 1 && (
        <g stroke="#34d399" strokeWidth="7" strokeLinecap="round" fill="none">
          <circle cx="122" cy="86" r="10" fill="#34d399" stroke="none" />
          <line x1="112" y1="96" x2="112" y2="138" stroke="#a3e635" />
          <line x1="112" y1="96" x2="34" y2="136" />
        </g>
      )}
      {(name === 'Mountain Climbers' || name === 'Bicycle Crunches') && phase === 2 && (
        <g stroke="#34d399" strokeWidth="7" strokeLinecap="round" fill="none">
          <circle cx="122" cy="86" r="10" fill="#34d399" stroke="none" />
          <line x1="112" y1="96" x2="112" y2="138" stroke="#a3e635" />
          <line x1="112" y1="96" x2="56" y2="118" />
          <polyline points="56,118 88,116 74,136" />
        </g>
      )}
    </svg>
  );
}

export default function VideoModal({
  workout,
  onClose,
}: {
  workout: WorkoutDemo | null;
  onClose: () => void;
}) {
  if (!workout) return null;

  return (
    <div onClick={onClose} className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div onClick={(e) => e.stopPropagation()} className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl">
        <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-800">
          <div>
            <h3 className="text-sm font-extrabold text-white">🏃‍♂️ {workout.name}</h3>
            <p className="text-[11px] text-emerald-400 font-semibold">{workout.reps}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-full bg-zinc-800 text-zinc-300 hover:text-white font-bold text-sm">✕</button>
        </div>

        <div className="grid grid-cols-2 gap-2 bg-zinc-950 p-3">
          <div className="relative rounded-2xl bg-zinc-900/90 border border-zinc-800 aspect-square p-2">
            <PoseIllustration name={workout.name} phase={1} />
            <span className="absolute bottom-2 left-2 bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-md text-emerald-300">
              1. Start Pose
            </span>
          </div>
          <div className="relative rounded-2xl bg-zinc-900/90 border border-zinc-800 aspect-square p-2">
            <PoseIllustration name={workout.name} phase={2} />
            <span className="absolute bottom-2 left-2 bg-lime-500/20 border border-lime-500/40 text-[10px] font-extrabold px-2 py-0.5 rounded-md text-lime-300">
              2. Action Move
            </span>
          </div>
        </div>

        <div className="p-4 bg-zinc-950/60 border-t border-zinc-800 space-y-2">
          <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">📋 How To Do It Properly:</div>
          <p className="text-xs text-zinc-300 whitespace-pre-line leading-relaxed">
            {exerciseSteps[workout.name] || 'Keep your core tight, move with control, and breathe steadily.'}
          </p>
        </div>

        <div className="p-3.5">
          <button onClick={onClose} className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-extrabold text-xs">
            Got It! Back to Routine 💪
          </button>
        </div>
      </div>
    </div>
  );
}
