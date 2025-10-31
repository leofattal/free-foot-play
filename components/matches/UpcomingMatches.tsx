import Link from 'next/link';

// This will be replaced with real data from Supabase later
const mockMatches = [
  {
    id: 1,
    date: '2025-11-05',
    time: '10:00 AM',
    ageGroup: 'U8',
    enrolled: 12,
    capacity: 16,
    status: 'open',
  },
  {
    id: 2,
    date: '2025-11-05',
    time: '2:00 PM',
    ageGroup: 'U10',
    enrolled: 14,
    capacity: 16,
    status: 'open',
  },
  {
    id: 3,
    date: '2025-11-06',
    time: '10:00 AM',
    ageGroup: 'U12',
    enrolled: 16,
    capacity: 16,
    status: 'full',
  },
];

export default function UpcomingMatches() {
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
          {mockMatches.map((match) => (
            <div key={match.id} className="card hover:shadow-lg transition-shadow">
              {/* Age Group Badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {match.ageGroup}
                </span>
                {match.status === 'full' ? (
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
                  <span>{new Date(match.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
                </div>
                <div className="flex items-center text-gray-700">
                  <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{match.time}</span>
                </div>
              </div>

              {/* Capacity */}
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Spots Filled</span>
                  <span className="font-semibold">{match.enrolled}/{match.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${match.status === 'full' ? 'bg-red-500' : 'bg-primary'}`}
                    style={{ width: `${(match.enrolled / match.capacity) * 100}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={match.status === 'full' ? '/matches' : `/matches/${match.id}`}
                className={`block text-center py-2 px-4 rounded-lg font-semibold transition-colors ${
                  match.status === 'full'
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-primary text-white hover:bg-primary-700'
                }`}
              >
                {match.status === 'full' ? 'Join Waitlist' : 'Register'}
              </Link>
            </div>
          ))}
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
