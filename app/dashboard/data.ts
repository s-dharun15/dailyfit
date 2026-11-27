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

type SouthIndianDayMenu = {
  dayLabel: string;
  vegBreakfast: string[];
  nonVegBreakfast: string[];
  vegLunch: string[];
  nonVegLunch: string[];
  eveningSnack: string;
  vegDinner: (dCal: number) => string[];
  nonVegDinner: (dCal: number) => string[];
};

const SOUTH_INDIAN_WEEKLY_MENU: SouthIndianDayMenu[] = [
  {
    dayLabel: 'Sunday Special',
    vegBreakfast: [
      '2 crisp Masala Dosas (tawa roasted, 1 tsp oil) with drumstick sambar',
      '1 bowl Pongal (little millet/samai) with kathirikai gotsu',
    ],
    nonVegBreakfast: [
      '2 Egg Dosas with sambar and mint chutney',
      '2 steamed idlis with home-style chicken salna (lean pieces)',
    ],
    vegLunch: [
      '1 cup Vegetable Seeraga Samba Biryani with cucumber & onion raita',
      '1 bowl roasted appalam + 1 glass neer mor (spiced buttermilk)',
    ],
    nonVegLunch: [
      '1 cup Home-Style Chicken Biryani (120g lean chicken) with onion raita',
      '1 large bowl cucumber-carrot salad + 1 glass neer mor',
    ],
    eveningSnack: '1 bowl steamed black kondakadalai (chana) sundal + sukku malli coffee',
    vegDinner: (dCal) => [
      `Option 1: 2 steamed idlis + 1 bowl hot pepper rasam (~${dCal} kcal)`,
      `Option 2: 1 bowl kollu (horse gram) soup + cucumber salad (~${Math.round(dCal * 0.85)} kcal)`,
    ],
    nonVegDinner: (dCal) => [
      `Option 1: 1 bowl clear nattu kozhi pepper soup + 2 idlis (~${dCal} kcal)`,
      `Option 2: 100g tawa pepper chicken + fresh veggie salad (~${Math.round(dCal * 0.85)} kcal)`,
    ],
  },
  {
    dayLabel: 'Monday Menu',
    vegBreakfast: [
      '3 steamed idlis with drumstick sambar & pudina (mint) chutney',
      '1 bowl ragi (finger millet) porridge with 5 soaked almonds',
    ],
    nonVegBreakfast: [
      '2 steamed idlis with sambar & 2 boiled eggs',
      '2-egg South Indian masala omelette with 1 wheat dosa',
    ],
    vegLunch: [
      '1 small cup matta/brown rice + keerai kootu + pepper rasam',
      '1 bowl vendaikkai (ladies finger) poriyal + 1 glass buttermilk',
    ],
    nonVegLunch: [
      '1 small cup brown rice + 120g home-style Chicken Chettinad (low oil)',
      '1 bowl cabbage poriyal + tomato rasam + 1 glass buttermilk',
    ],
    eveningSnack: '1 bowl pasi payaru (green moong) sundal + plain green tea',
    vegDinner: (dCal) => [
      `Option 1: 2 ragi dosas + 1 bowl vegetable kurma (light coconut) (~${dCal} kcal)`,
      `Option 2: 2 chapatis + 1 bowl paruppu (dal) & cucumber raita (~${Math.round(dCal * 0.9)} kcal)`,
    ],
    nonVegDinner: (dCal) => [
      `Option 1: 2 ragi dosas + 2-egg podimas (scrambled eggs) (~${dCal} kcal)`,
      `Option 2: 120g tawa-grilled fish + 1 wheat dosa & rasam (~${Math.round(dCal * 0.85)} kcal)`,
    ],
  },
  {
    dayLabel: 'Tuesday Menu',
    vegBreakfast: [
      '2 adai dosas (mixed protein dal) with avial (light yogurt)',
      '1 bowl kambu (pearl millet) vegetable upma with ginger chutney',
    ],
    nonVegBreakfast: [
      '2 pesarattu (green moong dosas) with 2 egg whites bhurji',
      '2 idiyappam (string hoppers) with 1 bowl light egg roast',
    ],
    vegLunch: [
      '1 cup sambar sadam (loaded with drumsticks, carrots & dal)',
      '1 bowl curd + kovakkai (ivy gourd) poriyal',
    ],
    nonVegLunch: [
      '1 small cup red rice + 130g Vanjaram / Tilapia meen kuzhambu (light oil)',
      '1 bowl pudalangai (snake gourd) kootu + 1 glass neer mor',
    ],
    eveningSnack: '1 bowl boiled peanuts (verkadalai) + lemon ginger water',
    vegDinner: (dCal) => [
      `Option 1: 2 chapatis + 1 bowl paneer & peas masala (low oil) (~${dCal} kcal)`,
      `Option 2: 1 bowl moringa (murungai keerai) soup + sprouted moong salad (~${Math.round(dCal * 0.85)} kcal)`,
    ],
    nonVegDinner: (dCal) => [
      `Option 1: 2 chapatis + 120g pepper chicken masala (low oil) (~${dCal} kcal)`,
      `Option 2: 1 bowl egg-drop clear soup + 100g grilled chicken (~${Math.round(dCal * 0.85)} kcal)`,
    ],
  },
  {
    dayLabel: 'Wednesday Menu',
    vegBreakfast: [
      '2 pesarattu (whole green gram dosas) with ginger allam chutney',
      '2 rava/oats idlis with tiffin sambar & coriander chutney',
    ],
    nonVegBreakfast: [
      '3 egg whites + 1 whole egg kalakki/omelette with 2 idlis',
      '2 appams with 1 bowl light chicken stew',
    ],
    vegLunch: [
      '1 cup thinai (foxtail millet) rice + vendaikkai mor kuzhambu',
      '1 bowl chana dal sundal + cucumber-tomato salad',
    ],
    nonVegLunch: [
      '1 small cup brown rice + 120g grilled chicken breast + pepper rasam',
      '1 bowl curd + keerai (spinach) poriyal',
    ],
    eveningSnack: '1 glass kambu koozh (pearl millet drink) or roasted makhana',
    vegDinner: (dCal) => [
      `Option 1: 3 mini veggie uttappams + 1 bowl sambar (~${dCal} kcal)`,
      `Option 2: 2 phulkas + 1 bowl mushroom chettinad masala (~${Math.round(dCal * 0.9)} kcal)`,
    ],
    nonVegDinner: (dCal) => [
      `Option 1: 120g tawa chicken tikka + 1 chapati & mint raita (~${dCal} kcal)`,
      `Option 2: 2 onion uttappams + 2 boiled egg whites & sambar (~${Math.round(dCal * 0.85)} kcal)`,
    ],
  },
  {
    dayLabel: 'Thursday Menu',
    vegBreakfast: [
      '2 idiyappam (string hoppers) with 1 bowl kadala curry (black chickpeas)',
      '1 bowl samai (little millet) ven pongal with brinjal gotsu',
    ],
    nonVegBreakfast: [
      '2 idiyappam with 1 bowl home-style chicken curry (light oil)',
      '2 wheat dosas with 2-egg pepper omelette & mint chutney',
    ],
    vegLunch: [
      '1 cup curd rice (with pomegranate & ginger) + beans paruppu usili',
      '1 bowl mixed vegetable sambar',
    ],
    nonVegLunch: [
      '1 small cup rice + 120g meen varuval (tawa-seared fish) + rasam',
      '1 bowl curd + cabbage poriyal',
    ],
    eveningSnack: '1 bowl pori (puffed rice) kara mixture (no oil) + ginger tea',
    vegDinner: (dCal) => [
      `Option 1: 2 phulkas + 1 bowl palak paneer or dal tadka (~${dCal} kcal)`,
      `Option 2: 1 bowl drumstick clear soup + 100g grilled paneer (~${Math.round(dCal * 0.85)} kcal)`,
    ],
    nonVegDinner: (dCal) => [
      `Option 1: 2 phulkas + 120g grilled chicken breast & salad (~${dCal} kcal)`,
      `Option 2: 1 bowl clear chicken soup + 1 ragi dosa (~${Math.round(dCal * 0.85)} kcal)`,
    ],
  },
  {
    dayLabel: 'Friday Menu',
    vegBreakfast: [
      '2 ragi dosas with tomato-onion chutney & sambar',
      '1 bowl broken wheat (samba godhumai) vegetable upma + curd',
    ],
    nonVegBreakfast: [
      '2 ragi dosas with 2-egg masala bhurji',
      '2 steamed idlis with 2 boiled eggs & kara chutney',
    ],
    vegLunch: [
      '1 small cup brown rice + vatha kuzhambu (light oil) + keerai masiyal',
      '1 bowl carrot kosambari + 1 glass neer mor',
    ],
    nonVegLunch: [
      '1 small cup brown rice + 120g prawn or chicken thokku + rasam',
      '1 bowl cucumber pachadi + 1 glass buttermilk',
    ],
    eveningSnack: '1 bowl sweet corn & pachai payaru sundal + sukku coffee',
    vegDinner: (dCal) => [
      `Option 1: 2 adai dosas + 1 bowl coconut-free veggie stew (~${dCal} kcal)`,
      `Option 2: 1 large bowl kollu rasam + 100g tawa paneer & veggies (~${Math.round(dCal * 0.85)} kcal)`,
    ],
    nonVegDinner: (dCal) => [
      `Option 1: 120g tawa-grilled fish + 1 phulka & mint chutney (~${dCal} kcal)`,
      `Option 2: 1 bowl nattu kozhi rasam + 2 steamed idlis (~${Math.round(dCal * 0.85)} kcal)`,
    ],
  },
  {
    dayLabel: 'Saturday Menu',
    vegBreakfast: [
      '3 mini podi idlis (1 tsp gingelly oil) with hot sambar',
      '2 whole wheat dosas with mint-coriander chutney',
    ],
    nonVegBreakfast: [
      '3 egg whites scrambled + 2 wheat dosas with mint chutney',
      '2 dosas with 1 bowl home-style egg curry',
    ],
    vegLunch: [
      '1 cup lemon or tamarind millet rice + paruppu usili + curd',
      '1 bowl beetroot poriyal + clear tomato rasam',
    ],
    nonVegLunch: [
      '1 small cup rice + 120g pepper chicken curry + rasam',
      '1 bowl curd + snake gourd poriyal',
    ],
    eveningSnack: '1 bowl sprouted green gram & raw mango salad + green tea',
    vegDinner: (dCal) => [
      `Option 1: 2 chapatis + 1 bowl chana masala (light oil) (~${dCal} kcal)`,
      `Option 2: 1 bowl vegetable sambar soup + 2 steamed idlis (~${Math.round(dCal * 0.85)} kcal)`,
    ],
    nonVegDinner: (dCal) => [
      `Option 1: 2 chapatis + 100g pepper chicken roast & salad (~${dCal} kcal)`,
      `Option 2: 1 bowl clear chicken & veggie soup + 2 boiled egg whites (~${Math.round(dCal * 0.85)} kcal)`,
    ],
  },
];

export function getRoutineData(
  profile: Profile,
  dietType: 'veg' | 'nonveg',
  dayIndex?: number
) {
  const resolvedDay = typeof dayIndex === 'number' ? dayIndex : new Date().getDay();
  const todayMenu = SOUTH_INDIAN_WEEKLY_MENU[resolvedDay % 7];

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
            `Drink ${wakeupWaterMl} ml of warm water (jeera or lemon) right after waking up`,
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
          label: `${todayMenu.dayLabel} • South Indian Breakfast (Pick Any One)`,
          points: dietType === 'veg' ? todayMenu.vegBreakfast : todayMenu.nonVegBreakfast,
        },
        {
          icon: '☕',
          label: 'Filter Coffee, Tea & Sugar Rule',
          points: [
            'Best choice: plain green tea, sukku malli coffee, or black coffee',
            'Filter coffee or milk tea: max 1 small cup with ZERO white sugar',
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
          label: `${todayMenu.dayLabel} • Balanced South Indian Lunch`,
          points: dietType === 'veg' ? todayMenu.vegLunch : todayMenu.nonVegLunch,
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
          label: 'Evening Snack & Caffeine Rule',
          points: [
            `Healthy 4:30 PM Tamil snack: ${todayMenu.eveningSnack}`,
            'Skip sugary milk tea, coffee, and fried snacks after 5:00 PM',
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
          label: `${todayMenu.dayLabel} • Light South Indian Dinner`,
          points: dietType === 'veg' ? todayMenu.vegDinner(dCal) : todayMenu.nonVegDinner(dCal),
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

