import Link from 'next/link';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white px-5 py-10">
      <div className="max-w-xl mx-auto bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-black text-white">
            Daily<span className="text-emerald-400">Fit</span> Privacy Policy
          </h1>
          <Link
            href="/"
            className="px-3 py-1.5 rounded-full bg-emerald-500 text-zinc-950 text-xs font-extrabold"
          >
            ← Back to App
          </Link>
        </div>

        <p className="text-xs text-zinc-400">Effective Date: November 2026</p>

        <div className="space-y-4 text-xs text-zinc-300 leading-relaxed">
          <section className="space-y-1">
            <h2 className="text-sm font-extrabold text-emerald-400">1. Information We Collect</h2>
            <p>
              DailyFit collects your email address for authentication and basic fitness profile metrics
              (age, gender, height, weight, and dietary preference) solely to calculate personalized
              South Indian meal plans, calorie budgets, and hydration targets.
            </p>
          </section>

          <section className="space-y-1">
            <h2 className="text-sm font-extrabold text-emerald-400">2. How Your Data Is Used & Stored</h2>
            <p>
              Your profile, daily habit check-ins, food logs, and weight history are securely stored using
              Supabase encrypted cloud storage and are accessible only to your authenticated account. We
              never sell, rent, or share your personal health data with third-party advertisers.
            </p>
          </section>

          <section className="space-y-1">
            <h2 className="text-sm font-extrabold text-emerald-400">3. Health & Medical Disclaimer</h2>
            <p>
              DailyFit provides general wellness, nutrition, and home exercise guidance. It is not a
              substitute for professional medical advice. Consult a qualified physician before starting any
              new diet or fitness program.
            </p>
          </section>

          <section className="space-y-1">
            <h2 className="text-sm font-extrabold text-emerald-400">4. Account & Data Deletion</h2>
            <p>
              You may request permanent deletion of your account and all associated fitness logs at any
              time by logging out or contacting our support team.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
