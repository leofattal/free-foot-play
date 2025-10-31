import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function UpcomingMatches() {
  const supabase = await createClient();

  // Fetch upcoming matches from database
  const { data: matches } = await supabase
    .from('matches')
    .select('*')
    .gte('date', new Date().toISOString().split('T')[0])
    .eq('status', 'open')
    .order('date', { ascending: true })
    .order('start_time', { ascending: true })
    .limit(3);

  if (!matches || matches.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Upcoming Matches
            </h2>
            <p className="text-gray-600 text-lg">
              Check back soon for new match schedules!
            </p>
          </div>

          <div className="card text-center py-12 max-w-2xl mx-auto">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No Matches Scheduled Yet</h3>
            <p className="text-gray-600 mb-6">
              We're currently planning new matches. Check back soon or contact us for more information!
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
            Upcoming Matches
          </h2>
          <p className="text-gray-600 text-lg">
            Check out our latest match schedule and register your kids today!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {matches.map((match) => {
            const isFull = match.current_enrollment >= match.max_capacity;
            const percentFilled = (match.current_enrollment / match.max_capacity) * 100;

            return (
              <div key={match.id} className="card hover:shadow-lg transition-shadow">
                {/* Age Group Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {match.age_group}
                  </span>
                  {isFull ? (
                    <span className="text-red-600 font-semibold text-sm">FULL</span>
                  ) : (
                    <span className="text-green-600 font-semibold text-sm">OPEN</span>
                  )}
                </div>

                {/* Match Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {new Date(match.date).toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{match.start_time}</span>
                  </div>
                </div>

                {/* Capacity */}
                <div className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Spots Filled</span>
                    <span className="font-semibold">
                      {match.current_enrollment}/{match.max_capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${isFull ? 'bg-red-500' : 'bg-primary'}`}
                      style={{ width: `${percentFilled}%` }}
                    />
                  </div>
                </div>

                {/* Action Button */}
                <Link
                  href={isFull ? '/matches' : `/matches/${match.id}`}
                  className={`block text-center py-2 px-4 rounded-lg font-semibold transition-colors ${
                    isFull
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                      : 'bg-primary text-white hover:bg-primary-700'
                  }`}
                >
                  {isFull ? 'Join Waitlist' : 'Register'}
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <Link href="/matches" className="btn-outline">
            View All Matches
          </Link>
        </div>
      </div>
    </section>
  );
}
