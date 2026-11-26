export type Profile = {
  id: string;
  gender: 'male' | 'female';
  age: number;
  weight: number;
  height: number;
  challenge_days: number;
  daily_calorie_target: number;
};

export type Answers = {
  morning_water: boolean | null;
  morning_workout: boolean | null;
  healthy_breakfast: boolean | null;
  no_sugar: boolean | null;
  healthy_lunch: boolean | null;
  no_long_nap: boolean | null;
  evening_workout: boolean | null;
  no_late_caffeine: boolean | null;
  light_dinner: boolean | null;
  night_water: boolean | null;
};

export type WorkoutDemo = {
  name: string;
  reps: string;
  youtubeId: string;
};

export function getRoutineData(profile: Profile, dietType: 'veg' | 'nonveg') {
  const totalWaterLiters = Number((profile.weight * 0.035).toFixed(1));
  const totalGlasses = Math.round((totalWaterLiters * 1000) / 250);
  const wakeupWaterMl = Math.round(totalWaterLiters * 1000 * 0.22);
  const nightWaterMl = Math.round(totalWaterLiters * 1000 * 0.20);
  const morningMins = profile.weight > 80 ? 25 : 30;
  const eveningMins = profile.age > 45 ? 25 : 35;
  const bCal = Math.round(profile.daily_calorie_target * 0.28);
  const lCal = Math.round(profile.daily_calorie_target * 0.38);
  const dCal = Math.round(profile.daily_calorie_target * 0.26);

  const timeSlots = [
    {
      badge: '6:30 AM',
      tab: '🌅 Wake-Up',
      title: 'Wake-Up & Morning Burn',
      accent: 'from-amber-500/20 to-orange-500/5 border-amber-500/30',
      items: [
        {
          icon: '💧',
          label: 'Wake-Up Hydration',
          points: [
            `Drink ${wakeupWaterMl} ml of warm water right after waking up`,
            'Helps kick-start your metabolism before any food',
          ],
        },
        {
          icon: '🏃',
          label: `${morningMins}-Min Morning Workout`,
          points: [
            '15 mins brisk walk or light jogging',
            '3 rounds of the exercises listed below',
          ],
        },
      ],
      workouts: [
        { name: 'Jumping Jacks', reps: '3 sets × 30 sec', youtubeId: 'iSSAk4XCsRA' },
        { name: 'Bodyweight Squats', reps: '3 sets × 15 reps', youtubeId: 'YaXPRqUwItQ' },
        { name: 'Forearm Plank', reps: '3 sets × 30 sec', youtubeId: 'ASdvN_XEl_c' },
      ] as WorkoutDemo[],
      questions: [
        { key: 'morning_water' as keyof Answers, text: `Drank ${wakeupWaterMl}ml water?`, pts: 30 },
        { key: 'morning_workout' as keyof Answers, text: `Did ${morningMins}m morning workout?`, pts: profile.weight > 75 ? 180 : 150 },
      ],
    },
    {
      badge: '8:30 AM',
      tab: '🍳 Morning',
      title: `Morning Meal (~${bCal} kcal)`,
      accent: 'from-emerald-500/20 to-teal-500/5 border-emerald-500/30',
      items: [
        {
          icon: '🍽️',
          label: 'Breakfast Options (Pick Any One)',
          points: dietType === 'veg'
            ? [
                '2 to 3 steamed idlis with sambar',
                '1 bowl vegetable oats with 5 soaked almonds',
              ]
            : [
                '3 egg whites + 1 whole egg with 2 multigrain toasts',
                '2 steamed idlis with 2 boiled eggs',
              ],
        },
        {
          icon: '☕',
          label: 'Tea, Coffee & Sugar Rule',
          points: [
            'Best choice: plain green tea or black coffee',
            'Milk tea or coffee: max 1 small cup with ZERO white sugar',
          ],
        },
      ],
      workouts: [] as WorkoutDemo[],
      questions: [
        { key: 'healthy_breakfast' as keyof Answers, text: `Ate ~${bCal} kcal breakfast?`, pts: 110 },
        { key: 'no_sugar' as keyof Answers, text: 'Zero white sugar today?', pts: 90 },
      ],
    },
    {
      badge: '1:30 PM',
      tab: '☀️ Afternoon',
      title: `Lunch (~${lCal} kcal) & Nap`,
      accent: 'from-sky-500/20 to-blue-500/5 border-sky-500/30',
      items: [
        {
          icon: '🥗',
          label: 'Balanced Lunch Plate',
          points: dietType === 'veg'
            ? [
                '1 small cup cooked rice or 2 chapatis',
                '1 full bowl dal or paneer curry',
                '1 large bowl fresh veggie salad + 1 glass buttermilk',
              ]
            : [
                '1 small cup cooked rice or 2 chapatis',
                '120g grilled chicken or fish',
                '1 large bowl fresh veggie salad + 1 glass buttermilk',
              ],
        },
        {
          icon: '😴',
          label: 'Afternoon Sleep Rule',
          points: [
            'Avoid sleeping right after lunch (slows digestion)',
            'If very tired, take max a 20-min power nap before 3:00 PM',
          ],
        },
      ],
      workouts: [] as WorkoutDemo[],
      questions: [
        { key: 'healthy_lunch' as keyof Answers, text: `Followed ~${lCal} kcal lunch?`, pts: 130 },
        { key: 'no_long_nap' as keyof Answers, text: 'Skipped heavy afternoon sleep?', pts: 40 },
      ],
    },
    {
      badge: '6:00 PM',
      tab: '🌆 Evening',
      title: 'Evening Sweat & Caffeine Cutoff',
      accent: 'from-orange-500/20 to-rose-500/5 border-orange-500/30',
      items: [
        {
          icon: '💪',
          label: `${eveningMins}-Min Evening Workout`,
          points: [
            '15 mins brisk walk, cycling, or HIIT cardio',
            '3 rounds of the toning exercises listed below',
          ],
        },
        {
          icon: '🚫',
          label: 'Evening Tea & Coffee Rule',
          points: [
            'Skip milk tea and coffee after 5:00 PM for deep sleep',
            'Healthy swap: herbal tea, lemon water, or roasted chana',
          ],
        },
      ],
      workouts: [
        { name: 'Forward Lunges', reps: '3 sets × 12 each leg', youtubeId: 'COKYKgQ8KR0' },
        { name: 'Mountain Climbers', reps: '3 sets × 30 sec', youtubeId: 'zT-9L3CEcmk' },
        { name: 'Bicycle Crunches', reps: '3 sets × 15 reps', youtubeId: 'Iwyvozckjak' },
      ] as WorkoutDemo[],
      questions: [
        { key: 'evening_workout' as keyof Answers, text: `Did ${eveningMins}m evening workout?`, pts: profile.weight > 75 ? 200 : 170 },
        { key: 'no_late_caffeine' as keyof Answers, text: 'No tea or coffee after 5 PM?', pts: 30 },
      ],
    },
    {
      badge: '8:30 PM',
      tab: '🌙 Night',
      title: `Light Dinner (~${dCal} kcal) & Water`,
      accent: 'from-purple-500/20 to-indigo-500/5 border-purple-500/30',
      items: [
        {
          icon: '🥣',
          label: 'Light Dinner (2.5 Hrs Before Bed)',
          points: dietType === 'veg'
            ? [
                `Option 1: 2 phulkas + 1 bowl palak paneer or dal (~${dCal} kcal)`,
                `Option 2: Large veggie soup + cucumber salad (~${Math.round(dCal * 0.85)} kcal)`,
              ]
            : [
                `Option 1: 2 phulkas + grilled chicken breast (~${dCal} kcal)`,
                `Option 2: Clear chicken soup + fresh salad (~${Math.round(dCal * 0.85)} kcal)`,
              ],
        },
        {
          icon: '💧',
          label: 'Night Hydration',
          points: [
            `Sip ${nightWaterMl} ml of water slowly up to 45 mins before bed`,
            `Completes your full ${totalWaterLiters}L daily water target`,
          ],
        },
      ],
      workouts: [] as WorkoutDemo[],
      questions: [
        { key: 'light_dinner' as keyof Answers, text: `Ate light ~${dCal} kcal dinner?`, pts: 140 },
        { key: 'night_water' as keyof Answers, text: `Finished ${nightWaterMl}ml night water?`, pts: 30 },
      ],
    },
  ];

  return { totalWaterLiters, totalGlasses, timeSlots };
}
