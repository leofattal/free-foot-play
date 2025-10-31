import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function Hero() {
  const supabase = await createClient();

  // Check if user is logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Fetch real stats from database
  const [childrenResult, matchesResult] = await Promise.all([
    supabase.from('children').select('id', { count: 'exact', head: true }),
    supabase.from('matches')
      .select('id', { count: 'exact', head: true })
      .gte('date', new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0])
      .lte('date', new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString().split('T')[0]),
  ]);

  const activePlayersCount = childrenResult.count || 0;
  const matchesThisMonthCount = matchesResult.count || 0;

  // Count unique age groups
  const ageGroups = [
    'U6 (Under 6)',
    'U8 (Under 8)',
    'U10 (Under 10)',
    'U12 (Under 12)',
    'U14 (Under 14)',
    'U16 (Under 16)',
    'U18 (Under 18)',
  ];
  const ageGroupsCount = ageGroups.length;

  return (
    <section className="bg-gradient-to-br from-primary-500 to-primary-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
            Get Your Kids Playing Soccer!
          </h1>
          <p className="text-xl sm:text-2xl mb-8 text-primary-100 max-w-3xl mx-auto">
            Easy registration for youth soccer matches. Sign up your children for games at our dedicated field.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="bg-accent hover:bg-accent-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
                >
                  Go to Dashboard
                </Link>
                <Link
                  href="/matches"
                  className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
                >
                  Browse Matches
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/auth/signup"
                  className="bg-accent hover:bg-accent-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
                >
                  Register Now
                </Link>
                <Link
                  href="/matches"
                  className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 text-lg"
                >
                  View Matches
                </Link>
              </>
            )}
          </div>

          {/* Quick Stats - Real Data */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2 font-[family-name:var(--font-poppins)]">
                {activePlayersCount > 0 ? `${activePlayersCount}+` : '0'}
              </div>
              <div className="text-primary-100">Active Players</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2 font-[family-name:var(--font-poppins)]">
                {matchesThisMonthCount > 0 ? `${matchesThisMonthCount}+` : '0'}
              </div>
              <div className="text-primary-100">Matches This Month</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2 font-[family-name:var(--font-poppins)]">
                {ageGroupsCount}+
              </div>
              <div className="text-primary-100">Age Groups</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
