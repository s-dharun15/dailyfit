export type Profile = {
  id: string;
  gender: 'male' | 'female';
  age: number;
  weight: number;
  target_weight?: number;
  height: number;
  goal?: string;
  weekly_pace?: number;
  activity_level?: string;
  diet_type?: string;
  medical_conditions?: string[];
  challenge_days: number;
  daily_calorie_target: number;
  daily_protein_target?: number;
  daily_water_glasses?: number;
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

type DayMenu = {
  dayName: string;
  breakfast: { veg: string[]; eggetarian: string[]; non_veg: string[]; vegan: string[] };
  lunch: { veg: string[]; eggetarian: string[]; non_veg: string[]; vegan: string[] };
  snack: string;
  dinner: { veg: string[]; eggetarian: string[]; non_veg: string[]; vegan: string[] };
};

const SEVEN_DAY_SOUTH_INDIAN_MENU: DayMenu[] = [
  {
    dayName: 'Day 1 • Classic Tamil',
    breakfast: {
      veg: ['3 Steamed Idlis + 1 cup Drumstick Sambar + Mint Chutney', '1 small cup Filter Coffee (zero sugar)'],
      eggetarian: ['2 Steamed Idlis + Sambar + 2 Boiled Egg Whites', '1 cup Sukku Malli Coffee (no sugar)'],
      non_veg: ['2 Steamed Idlis + Sambar + 2 Egg White Pepper Omelette', '1 cup Black Coffee / Green Tea'],
      vegan: ['3 Steamed Idlis + 1 cup Drumstick Sambar + Pudina Chutney', 'Herbal Tulsi Ginger Tea'],
    },
    lunch: {
      veg: ['1 cup Matta/Brown Rice + Keerai Kootu + Pepper Rasam', '1 bowl Cucumber Pachadi + 1 glass Neer Mor (Buttermilk)'],
      eggetarian: ['1 cup Brown Rice + Egg Masala Curry (2 eggs, light oil)', 'Vendakkai Poriyal + 1 glass Spiced Buttermilk'],
      non_veg: ['1 cup Brown Rice + 120g Home-Style Chicken Chettinad (low oil)', 'Cabbage Poriyal + Rasam + 1 glass Buttermilk'],
      vegan: ['1 cup Matta Rice + Keerai Kootu + Tomato Rasam', 'Carrot Kosambari Salad + Lemon Mint Water'],
    },
    snack: '1 bowl Boiled Black Kondakadalai (Chana) Sundal + Sukku Coffee',
    dinner: {
      veg: ['2 Ragi Dosas + 1 bowl Vegetable Kurma (light coconut)', 'Cucumber & Carrot Raita'],
      eggetarian: ['2 Ragi Dosas + 2-Egg Podimas (South Indian scrambled eggs)', '1 bowl Clear Drumstick Soup'],
      non_veg: ['2 Ragi Dosas + 100g Pepper Chicken Roast (tawa grilled)', '1 bowl Clear Nattu Kozhi / Veg Soup'],
      vegan: ['2 Ragi Dosas + 1 bowl Kollu (Horse Gram) Rasam & Stir-fry', 'Sprouted Green Gram Salad'],
    },
  },
  {
    dayName: 'Day 2 • Millet Power',
    breakfast: {
      veg: ['1 bowl Ven Pongal (made with little millet/samai) + Kathirikai Gotsu', '5 Soaked Almonds + Plain Tea'],
      eggetarian: ['1 bowl Millet Ven Pongal + 2 Boiled Eggs', '1 cup Plain Green Tea'],
      non_veg: ['2 Pesarattu (Green Moong Dosa) + 2 Egg Whites Bhurji', '1 cup Black Coffee (zero sugar)'],
      vegan: ['1 bowl Samai (Little Millet) Pongal + Brinjal Gotsu', '5 Soaked Almonds + Ginger Tea'],
    },
    lunch: {
      veg: ['2 Whole Wheat Chapatis + 1 bowl Paneer & Peas Masala (low oil)', '1 cup Curd + Beetroot Poriyal'],
      eggetarian: ['1 cup Red Rice + Paruppu (Dal) + 2-Egg Omelette', 'Beans Poriyal + 1 glass Neer Mor'],
      non_veg: ['1 cup Red Rice + 130g Vanjaram / Tilapia Fish Kulambu (light oil)', 'Snake Gourd (Pudalangai) Kootu + Buttermilk'],
      vegan: ['2 Whole Wheat Chapatis + 1 bowl Rajma / Cowpea (Karamani) Sundal Gravy', 'Beetroot Poriyal + Cucumber Salad'],
    },
    snack: '1 bowl Pasi Payaru (Green Moong) Sundal + Lemon Ginger Water',
    dinner: {
      veg: ['2 Adai Dosas (mixed dal) + 1 bowl Avial (light yogurt)', '1 cup Warm Turmeric Milk (low fat)'],
      eggetarian: ['2 Adai Dosas + 1 bowl Tomato Chutney + 2 Egg Whites', '1 bowl Clear Vegetable Soup'],
      non_veg: ['100g Tawa Grilled Fish / Chicken + 1 Wheat Dosa', '1 bowl Pepper Rasam & Steamed Veggies'],
      vegan: ['2 Adai Dosas + 1 bowl Coconut-Free Veggie Stew', '1 bowl Warm Moringa Leaf Soup'],
    },
  },
  {
    dayName: 'Day 3 • High-Protein South',
    breakfast: {
      veg: ['2 Rava / Oats Idlis + 1 cup Tiffin Sambar + Coriander Chutney', '1 cup Filter Coffee (zero sugar)'],
      eggetarian: ['2 Wheat Dosas + 2-Egg Kalakki / Omelette + Mint Chutney', '1 cup Plain Tea (no sugar)'],
      non_veg: ['3 Egg Whites + 1 Whole Egg Masala Omelette + 2 Idlis', '1 cup Black Coffee'],
      vegan: ['2 Oats Idlis + 1 cup Tiffin Sambar + Tomato Chutney', '1 cup Hibiscus / Herbal Tea'],
    },
    lunch: {
      veg: ['1 cup Sambar Sadam (loaded with drumsticks, carrots & dal)', '1 bowl Curd + Kovakkai (Ivy Gourd) Poriyal'],
      eggetarian: ['1 cup Sambar Sadam + 2 Boiled Eggs + Papad (roasted)', '1 glass Neer Mor + Cucumber Slices'],
      non_veg: ['1 cup Brown Rice + 120g Grilled Chicken Breast + Pepper Rasam', '1 bowl Curd + Spinach Stir-fry'],
      vegan: ['1 cup Sambar Sadam (extra dal & veggies)', 'Kovakkai Poriyal + Raw Mango & Cucumber Salad'],
    },
    snack: '1 glass Kambu Koozh (Pearl Millet Porridge) or Roasted Makhana',
    dinner: {
      veg: ['2 Chapatis + 1 bowl Palak Paneer / Tofu Bhurji', '1 bowl Clear Tomato & Pepper Soup'],
      eggetarian: ['2 Chapatis + 1 bowl Egg Drop Clear Soup + Salad', '2 Boiled Egg Whites'],
      non_veg: ['120g Tandoori / Tawa Chicken Tikka + 1 Chapati', '1 bowl Mint Raita & Cucumber Salad'],
      vegan: ['2 Chapatis + 1 bowl Tofu & Spinach Masala', '1 bowl Clear Tomato Pepper Soup'],
    },
  },
  {
    dayName: 'Day 4 • Gut & Fiber Reset',
    breakfast: {
      veg: ['1 bowl Kambu (Pearl Millet) / Ragi Upma + Coconut Chutney (1 tbsp)', '1 cup Plain Green Tea'],
      eggetarian: ['1 bowl Ragi Upma + 2 Boiled Eggs', '1 cup Sukku Malli Coffee'],
      non_veg: ['2 Appams (or Dosa) + 1 bowl Chicken Stew (light coconut milk)', '1 cup Black Coffee'],
      vegan: ['1 bowl Kambu Vegetable Upma + Roasted Peanut Chutney', '1 cup Plain Green Tea'],
    },
    lunch: {
      veg: ['1 cup Curd Rice (with pomegranate & ginger) + Paruppu Usili', '1 bowl Mixed Veg Sambar'],
      eggetarian: ['1 cup Rice + 1 bowl Dal Tadka + 2-Egg Pepper Fry', '1 glass Buttermilk + Carrot Salad'],
      non_veg: ['1 cup Rice + 120g Meen Varuval (tawa-seared fish) + Rasam', '1 bowl Curd + Cabbage Thoran'],
      vegan: ['1 cup Lemon / Tamarind Millet Rice + Beans Paruppu Usili', '1 bowl Clear Drumstick Soup'],
    },
    snack: '1 bowl Boiled Peanuts (Verkadalai) + Plain Tea (no sugar)',
    dinner: {
      veg: ['3 Mini Uttapams (topped with onion, tomato & capsicum)', '1 bowl Sambar'],
      eggetarian: ['2 Onion Uttapams + 2 Egg Whites + Sambar', '1 bowl Cucumber Salad'],
      non_veg: ['1 bowl Nattu Kozhi Pepper Soup + 100g Grilled Chicken + Veggies', '1 small Ragi Roti'],
      vegan: ['3 Mini Veggie Uttapams + 1 bowl Sambar', '1 bowl Cucumber & Tomato Salad'],
    },
  },
  {
    dayName: 'Day 5 • Chettinad & Millet',
    breakfast: {
      veg: ['2 Idiyappam (String Hoppers) + 1 bowl Kadala Curry (Black Chickpeas)', '1 cup Plain Coffee'],
      eggetarian: ['2 Idiyappam + 1 bowl Egg Roast (1.5 eggs, low oil)', '1 cup Green Tea'],
      non_veg: ['2 Idiyappam + 1 bowl Light Chicken Curry', '1 cup Black Coffee'],
      vegan: ['2 Idiyappam + 1 bowl Kadala Curry (Black Chickpeas)', '1 cup Herbal Tea'],
    },
    lunch: {
      veg: ['1 cup Thinai (Foxtail Millet) Rice + Vendakkai Mor Kuzhambu', '1 bowl Chana Dal Sundal + Salad'],
      eggetarian: ['1 cup Thinai Rice + 2-Egg Curry + Rasam', '1 glass Neer Mor + Veggie Salad'],
      non_veg: ['1 cup Thinai Rice + 120g Pepper Chicken Masala + Rasam', '1 glass Buttermilk + Salad'],
      vegan: ['1 cup Thinai Rice + Arachuvitta Sambar + Ladies Finger Fry', 'Sprouts & Cucumber Salad'],
    },
    snack: '1 bowl Pori (Puffed Rice) Kara Mixture (no oil) + Ginger Tea',
    dinner: {
      veg: ['2 Phulkas + 1 bowl Mushroom Chettinad Masala (low oil)', '1 bowl Sprouted Moong Salad'],
      eggetarian: ['2 Phulkas + 2-Egg Bhurji + Cucumber Raita', '1 bowl Clear Veg Soup'],
      non_veg: ['120g Grilled Fish / Chicken + 1 Phulka + Mint Chutney', '1 bowl Clear Pepper Soup'],
      vegan: ['2 Phulkas + 1 bowl Mushroom Chettinad Masala', '1 bowl Sprouted Moong Salad'],
    },
  },
  {
    dayName: 'Day 6 • Light & Energizing',
    breakfast: {
      veg: ['2 Pesarattu (Whole Green Gram Dosa) + Ginger Chutney', '1 bowl Low-Fat Curd'],
      eggetarian: ['2 Egg-Topped Pesarattu Dosas + Ginger Chutney', '1 cup Plain Tea'],
      non_veg: ['3 Egg White Scrambled + 2 Wheat Dosas + Mint Chutney', '1 cup Black Coffee'],
      vegan: ['2 Pesarattu (Whole Green Gram Dosa) + Ginger Allam Chutney', '5 Soaked Almonds'],
    },
    lunch: {
      veg: ['1 cup Brown Rice + Vatha Kuzhambu (light oil) + Keerai Masiyal', '1 glass Neer Mor + Cucumber'],
      eggetarian: ['1 cup Brown Rice + Paruppu + 2 Boiled Eggs', '1 glass Buttermilk + Carrot Poriyal'],
      non_veg: ['1 cup Brown Rice + 120g Prawn / Chicken Thokku + Rasam', '1 glass Buttermilk + Cucumber'],
      vegan: ['1 cup Brown Rice + Keerai Masiyal + Pepper Rasam', 'Carrot & Raw Banana Poriyal'],
    },
    snack: '1 bowl Sweet Corn / Pachai Payaru Sundal + Sukku Coffee',
    dinner: {
      veg: ['1 large bowl Kollu (Horse Gram) Soup + 100g Grilled Paneer & Veggies', '1 small Ragi Dosa'],
      eggetarian: ['1 bowl Kollu Soup + 2 Boiled Eggs + 1 Ragi Dosa', 'Cucumber Salad'],
      non_veg: ['1 bowl Clear Chicken & Veggie Soup + 100g Grilled Chicken', '1 small Ragi Dosa'],
      vegan: ['1 large bowl Kollu Soup + 100g Grilled Tofu & Veggies', '1 small Ragi Dosa'],
    },
  },
  {
    dayName: 'Day 7 • Sunday Special (Clean)',
    breakfast: {
            veg: ['2 Masala Dosas (tawa roasted, minimal oil) + Sambar + Chutney', '1 small Filter Coffee (no sugar)'],
      eggetarian: ['1 Masala Dosa + 1 Egg Dosa + Sambar', '1 small Filter Coffee (no sugar)'],
      non_veg: ['2 Dosas + 1 bowl Home-Style Chicken Salna (lean pieces)', '1 cup Black Coffee'],
      vegan: ['2 Crisp Paper Dosas (1 tsp oil) + Sambar + Tomato Chutney', '1 cup Herbal Tea'],
    },
    lunch: {
      veg: ['1 cup Vegetable Biryani (made with Seeraga Samba / Brown Rice) + Onion Raita', '1 bowl Roasted Papad + Salad'],
      eggetarian: ['1 cup Egg Biryani (2 boiled eggs, light ghee) + Onion Raita', '1 bowl Cucumber Salad'],
      non_veg: ['1 cup Home-Style Chicken Biryani (120g chicken, controlled portion) + Raita', '1 bowl Cucumber & Onion Salad'],
      vegan: ['1 cup Mushroom & Soya Chunks Seeraga Samba Biryani', '1 bowl Mint & Cucumber Salad'],
    },
    snack: '1 bowl Watermelon / Papaya Cubes + Green Tea',
    dinner: {
      veg: ['2 Steamed Idlis + 1 bowl Hot Pepper Rasam (light post-biryani reset)', '1 glass Warm Water'],
      eggetarian: ['2 Steamed Idlis + 1 bowl Hot Pepper Rasam + 2 Egg Whites', '1 glass Warm Water'],
      non_veg: ['1 bowl Clear Chicken Pepper Rasam + 2 Steamed Idlis', '1 glass Warm Water'],
      vegan: ['2 Steamed Idlis + 1 bowl Hot Pepper Rasam', '1 glass Warm Water'],
    },
  },
];

export function getRoutineData(
  profile: Profile,
  dietOverride?: 'veg' | 'nonveg' | string,
  currentDay: number = 1
) {
  const activeDiet = (dietOverride || profile.diet_type || 'non_veg') as
    | 'veg'
    | 'eggetarian'
    | 'non_veg'
    | 'vegan';
  const normalizedDiet: 'veg' | 'eggetarian' | 'non_veg' | 'vegan' =
    activeDiet === ('nonveg' as string) ? 'non_veg' : activeDiet;

  const dayIndex = (Math.max(1, currentDay) - 1) % SEVEN_DAY_SOUTH_INDIAN_MENU.length;
  const todayMenu = SEVEN_DAY_SOUTH_INDIAN_MENU[dayIndex];

  const totalWaterLiters = Number((profile.weight * 0.035).toFixed(1));
  const totalGlasses = profile.daily_water_glasses || Math.round((totalWaterLiters * 1000) / 250);
  const wakeupWaterMl = Math.round(totalWaterLiters * 1000 * 0.22);
  const nightWaterMl = Math.round(totalWaterLiters * 1000 * 0.2);
  const morningMins = profile.weight > 80 ? 25 : 30;
  const eveningMins = profile.age > 45 ? 25 : 35;
  const bCal = Math.round(profile.daily_calorie_target * 0.28);
  const lCal = Math.round(profile.daily_calorie_target * 0.38);
  const dCal = Math.round(profile.daily_calorie_target * 0.26);

  const isEvenDay = currentDay % 2 === 0;

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
            `Drink ${wakeupWaterMl} ml of warm water (add jeera or lemon) on an empty stomach`,
            'Kick-starts digestion & fat metabolism before breakfast',
          ],
        },
        {
          icon: '🏃',
          label: `${morningMins}-Min Morning Workout (${isEvenDay ? 'Core & Mobility' : 'Cardio Burn'})`,
          points: [
            '15 mins brisk outdoor walk or spot jogging',
            '3 rounds of the guided exercises below',
          ],
        },
      ],
      workouts: (isEvenDay
        ? [
            { name: 'High Knees', reps: '3 sets × 30 sec', youtubeId: 'ZNDHOHGU0Wc' },
            { name: 'Glute Bridges', reps: '3 sets × 15 reps', youtubeId: 'OUgsJ8-Vi0E' },
            { name: 'Forearm Plank', reps: '3 sets × 35 sec', youtubeId: 'ASdvN_XEl_c' },
          ]
        : [
            { name: 'Jumping Jacks', reps: '3 sets × 30 sec', youtubeId: 'iSSAk4XCsRA' },
            { name: 'Bodyweight Squats', reps: '3 sets × 15 reps', youtubeId: 'YaXPRqUwItQ' },
            { name: 'Forearm Plank', reps: '3 sets × 30 sec', youtubeId: 'ASdvN_XEl_c' },
          ]) as WorkoutDemo[],
      questions: [
        { key: 'morning_water' as keyof Answers, text: `Drank ${wakeupWaterMl}ml warm water?`, pts: 30 },
        { key: 'morning_workout' as keyof Answers, text: `Did ${morningMins}m morning workout?`, pts: profile.weight > 75 ? 180 : 150 },
      ],
    },
    {
      badge: '8:30 AM',
      tab: '🍳 Morning',
      title: `South Indian Breakfast (~${bCal} kcal)`,
      accent: 'from-emerald-500/20 to-teal-500/5 border-emerald-500/30',
      items: [
        {
          icon: '🍛',
          label: `${todayMenu.dayName} • Breakfast`,
          points: todayMenu.breakfast[normalizedDiet],
        },
        {
          icon: '☕',
          label: 'Filter Coffee / Tea Rule',
          points: [
            'Max 1 small cup filter coffee or tea with ZERO white sugar',
            'Swap sugar with plain decoction, green tea, or sukku malli',
          ],
        },
      ],
      workouts: [] as WorkoutDemo[],
      questions: [
        { key: 'healthy_breakfast' as keyof Answers, text: `Ate ~${bCal} kcal South Indian breakfast?`, pts: 110 },
        { key: 'no_sugar' as keyof Answers, text: 'Zero white sugar today?', pts: 90 },
      ],
    },
    {
      badge: '1:30 PM',
      tab: '☀️ Afternoon',
      title: `South Indian Lunch (~${lCal} kcal)`,
      accent: 'from-sky-500/20 to-blue-500/5 border-sky-500/30',
      items: [
        {
          icon: '🥗',
          label: `${todayMenu.dayName} • Balanced Thali`,
          points: todayMenu.lunch[normalizedDiet],
        },
        {
          icon: '😴',
          label: 'Post-Lunch Digestion Rule',
          points: [
            'Walk for 10 mins after lunch to control blood sugar spikes',
            'Avoid heavy afternoon sleep (max 20-min power nap before 3 PM)',
          ],
        },
      ],
      workouts: [] as WorkoutDemo[],
      questions: [
        { key: 'healthy_lunch' as keyof Answers, text: `Followed ~${lCal} kcal lunch plate?`, pts: 130 },
        { key: 'no_long_nap' as keyof Answers, text: 'Skipped heavy afternoon sleep?', pts: 40 },
      ],
    },
    {
      badge: '6:00 PM',
      tab: '🌆 Evening',
      title: 'Evening Snack, Workout & Cutoff',
      accent: 'from-orange-500/20 to-rose-500/5 border-orange-500/30',
      items: [
        {
          icon: '🥜',
          label: '4:30 PM Healthy Tamil Snack',
          points: [
            todayMenu.snack,
            'Skip bakery puffs, samosas, and sugary milk tea after 5:00 PM',
          ],
        },
        {
          icon: '💪',
          label: `${eveningMins}-Min Evening Toning`,
          points: [
            '15 mins brisk walk, skipping, or cycling',
            '3 rounds of the toning exercises below',
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
        { key: 'no_late_caffeine' as keyof Answers, text: 'No tea/coffee or fried snacks after 5 PM?', pts: 30 },
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
          label: `${todayMenu.dayName} • Dinner (2.5 Hrs Before Bed)`,
          points: todayMenu.dinner[normalizedDiet],
        },
        {
          icon: '💧',
          label: 'Night Hydration',
          points: [
            `Sip ${nightWaterMl} ml water up to 45 mins before sleeping`,
            `Completes your ${totalWaterLiters}L daily hydration target`,
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

  return { totalWaterLiters, totalGlasses, timeSlots, todayMenu };
}

