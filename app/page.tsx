import Link from 'next/link';
import Hero from '@/components/layout/Hero';
import UpcomingMatches from '@/components/matches/UpcomingMatches';
import { createClient } from '@/lib/supabase/server';

export default async function HomePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Hero />

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 font-[family-name:var(--font-poppins)]">
            Why Choose Free Foot Play?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-[family-name:var(--font-poppins)]">Easy Scheduling</h3>
              <p className="text-gray-600">View and register for matches that fit your schedule. Real-time availability updates.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-[family-name:var(--font-poppins)]">Convenient Location</h3>
              <p className="text-gray-600">One dedicated field with clear directions, parking info, and amenities.</p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 font-[family-name:var(--font-poppins)]">Stay Updated</h3>
              <p className="text-gray-600">Automatic reminders and notifications for upcoming matches and schedule changes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Matches Preview */}
      <UpcomingMatches />

      {/* Call to Action - Different for logged in vs logged out users */}
      {user ? (
        <section className="py-16 bg-gradient-to-br from-primary-500 to-primary-700 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Welcome Back!
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Manage your children's profiles and register for upcoming matches.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Go to Dashboard
              </Link>
              <Link href="/matches" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Browse Matches
              </Link>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
              Ready to Get Your Kids Playing?
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Sign up today and register for your first match in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth/signup" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                Create Account
              </Link>
              <Link href="/matches" className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary font-semibold py-3 px-8 rounded-lg transition-colors duration-200">
                View Schedule
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
