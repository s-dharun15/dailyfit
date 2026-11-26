import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.vercel.dailyfit_gold',
  appName: 'DailyFit',
  webDir: 'public',
  server: {
    url: 'https://vercel.app',
    cleartext: true,
  },
};

export default config;
