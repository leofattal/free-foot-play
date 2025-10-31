import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import MatchFilters from '@/components/matches/MatchFilters';

type SearchParams = Promise<{
  age_group?: string;
  status?: string;
  date_from?: string;
}>;

export default async function MatchesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const supabase = await createClient();

  // Build query based on filters
  let query = supabase
    .from('matches')
    .select('*')
    .order('date', { ascending: true })
    .order('start_time', { ascending: true });

  // Apply filters
  if (params.age_group) {
    query = query.eq('age_group', params.age_group);
  }

  if (params.status) {
    query = query.eq('status', params.status);
  } else {
    // Default to showing open matches
    query = query.eq('status', 'open');
  }

  if (params.date_from) {
    query = query.gte('date', params.date_from);
  } else {
    // Default to showing future matches
    query = query.gte('date', new Date().toISOString().split('T')[0]);
  }

  const { data: matches, error } = await query;

  if (error) {
    console.error('Error fetching matches:', error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
            Match Schedule
          </h1>
          <p className="text-xl text-primary-100">
            Browse available matches and register your kids to play
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
              <h2 className="text-xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
                Filters
              </h2>
              <MatchFilters
                currentAgeGroup={params.age_group}
                currentStatus={params.status}
                currentDateFrom={params.date_from}
              />
            </div>
          </aside>

          {/* Matches Grid */}
          <main className="flex-1">
            {!matches || matches.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <svg
                  className="w-20 h-20 text-gray-300 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <h3 className="text-2xl font-bold mb-2 text-gray-900">No Matches Found</h3>
                <p className="text-gray-600 mb-6">
                  No matches match your current filters. Try adjusting your search criteria.
                </p>
                <Link href="/matches" className="btn-outline">
                  Clear Filters
                </Link>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600">
                    <span className="font-semibold text-gray-900">{matches.length}</span>{' '}
                    {matches.length === 1 ? 'match' : 'matches'} found
                  </p>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {matches.map((match) => {
                    const isFull = match.current_enrollment >= match.max_capacity;
                    const percentFilled =
                      (match.current_enrollment / match.max_capacity) * 100;
                    const isUpcoming = new Date(match.date) >= new Date();

                    return (
                      <div
                        key={match.id}
                        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                      >
                        {/* Status Banner */}
                        {!isUpcoming && (
                          <div className="bg-gray-500 text-white text-center py-2 text-sm font-semibold">
                            PAST MATCH
                          </div>
                        )}

                        <div className="p-6">
                          {/* Age Group Badge & Status */}
                          <div className="flex items-center justify-between mb-4">
                            <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {match.age_group}
                            </span>
                            {isUpcoming && (
                              <>
                                {isFull ? (
                                  <span className="text-red-600 font-semibold text-sm">
                                    FULL
                                  </span>
                                ) : (
                                  <span className="text-green-600 font-semibold text-sm">
                                    OPEN
                                  </span>
                                )}
                              </>
                            )}
                          </div>

                          {/* Match Details */}
                          <div className="space-y-3 mb-4">
                            <div className="flex items-center text-gray-700">
                              <svg
                                className="w-5 h-5 mr-2 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span>
                                {new Date(match.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  month: 'long',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <svg
                                className="w-5 h-5 mr-2 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                              <span>{match.start_time}</span>
                            </div>
                            <div className="flex items-center text-gray-700">
                              <svg
                                className="w-5 h-5 mr-2 text-primary"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                              </svg>
                              <span className="text-sm">View Field Info</span>
                            </div>
                          </div>

                          {/* Capacity Bar */}
                          <div className="mb-4">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="text-gray-600">Spots Filled</span>
                              <span className="font-semibold">
                                {match.current_enrollment}/{match.max_capacity}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full transition-all ${
                                  isFull ? 'bg-red-500' : 'bg-primary'
                                }`}
                                style={{ width: `${Math.min(percentFilled, 100)}%` }}
                              />
                            </div>
                          </div>

                          {/* Action Button */}
                          {isUpcoming ? (
                            <Link
                              href={isFull ? '/matches' : `/matches/${match.id}`}
                              className={`block text-center py-2 px-4 rounded-lg font-semibold transition-colors ${
                                isFull
                                  ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                  : 'bg-primary text-white hover:bg-primary-700'
                              }`}
                            >
                              {isFull ? 'Join Waitlist' : 'Register Now'}
                            </Link>
                          ) : (
                            <div className="text-center py-2 px-4 rounded-lg font-semibold bg-gray-100 text-gray-500">
                              Match Ended
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
