import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import MatchRegistrationForm from '@/components/matches/MatchRegistrationForm';
import Link from 'next/link';

type Params = Promise<{ id: string }>;

export default async function MatchRegistrationPage({ params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/auth/login?redirect=/matches/${id}`);
  }

  // Fetch match data
  const { data: match, error: matchError } = await supabase
    .from('matches')
    .select('*')
    .eq('id', id)
    .single();

  if (matchError || !match) {
    redirect('/matches');
  }

  // Fetch user's children
  const { data: children } = await supabase
    .from('children')
    .select('*')
    .eq('parent_id', user.id);

  // Check if match is full
  const isFull = match.current_enrollment >= match.max_capacity;

  // Check if match is in the past
  const isPast = new Date(match.date) < new Date();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/matches"
          className="text-primary hover:text-primary-700 font-semibold text-sm mb-6 inline-block"
        >
          ← Back to Matches
        </Link>

        {/* Match Details Card */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">
                Match Registration
              </h1>
              <p className="text-gray-600 mt-2">
                Register your child for this soccer match
              </p>
            </div>
            <span className="inline-block bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
              {match.age_group}
            </span>
          </div>

          {/* Match Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0"
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
              <div>
                <p className="text-sm text-gray-600">Date</p>
                <p className="text-lg font-semibold text-gray-900">
                  {new Date(match.date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0"
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
              <div>
                <p className="text-sm text-gray-600">Time</p>
                <p className="text-lg font-semibold text-gray-900">{match.start_time}</p>
              </div>
            </div>

            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0"
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
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="text-lg font-semibold text-gray-900">{match.field_location}</p>
                <Link href="/field-info" className="text-sm text-primary hover:text-primary-700">
                  View Field Info →
                </Link>
              </div>
            </div>

            <div className="flex items-start">
              <svg
                className="w-6 h-6 text-primary mr-3 mt-1 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <div>
                <p className="text-sm text-gray-600">Capacity</p>
                <p className="text-lg font-semibold text-gray-900">
                  {match.current_enrollment} / {match.max_capacity} spots filled
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className={`h-2 rounded-full ${isFull ? 'bg-red-500' : 'bg-primary'}`}
                    style={{
                      width: `${Math.min(
                        (match.current_enrollment / match.max_capacity) * 100,
                        100
                      )}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {match.description && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm font-semibold text-gray-900 mb-1">Match Details</p>
              <p className="text-gray-700">{match.description}</p>
            </div>
          )}
        </div>

        {/* Registration Form or Messages */}
        {isPast ? (
          <div className="bg-gray-100 rounded-lg shadow-md p-8 text-center">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">This Match Has Ended</h2>
            <p className="text-gray-600 mb-6">
              This match took place on{' '}
              {new Date(match.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
            <Link href="/matches" className="btn-primary inline-block">
              View Upcoming Matches
            </Link>
          </div>
        ) : isFull ? (
          <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg shadow-md p-8 text-center">
            <svg
              className="w-16 h-16 text-yellow-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">This Match is Full</h2>
            <p className="text-gray-600 mb-6">
              All {match.max_capacity} spots have been filled. Check back later or browse other
              available matches.
            </p>
            <Link href="/matches" className="btn-primary inline-block">
              Browse Other Matches
            </Link>
          </div>
        ) : !children || children.length === 0 ? (
          <div className="bg-blue-50 border-2 border-blue-200 rounded-lg shadow-md p-8 text-center">
            <svg
              className="w-16 h-16 text-blue-500 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Add a Child First</h2>
            <p className="text-gray-600 mb-6">
              You need to add at least one child profile before you can register for matches.
            </p>
            <Link href="/dashboard/children/add" className="btn-primary inline-block">
              Add Child Profile
            </Link>
          </div>
        ) : (
          <MatchRegistrationForm match={match} children={children} />
        )}
      </div>
    </div>
  );
}
