import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch user's children
  const { data: children } = await supabase
    .from('children')
    .select('*')
    .eq('parent_id', user.id);

  // Fetch upcoming registrations
  const { data: registrations } = await supabase
    .from('registrations')
    .select(`
      *,
      matches (
        date,
        start_time,
        age_group,
        field_location
      ),
      children (
        first_name,
        last_name
      )
    `)
    .eq('parent_id', user.id)
    .eq('status', 'confirmed')
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">
            Welcome back, {profile?.full_name || 'Parent'}!
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your children&apos;s soccer match registrations
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Registered Children</p>
                <p className="text-2xl font-bold text-gray-900">{children?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Upcoming Matches</p>
                <p className="text-2xl font-bold text-gray-900">{registrations?.length || 0}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                  <path d="M12 2 L12 22 M2 12 L22 12" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Matches Played</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Children Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">
                My Children
              </h2>
              <Link href="/dashboard/children/add" className="text-primary hover:text-primary-700 font-semibold text-sm">
                + Add Child
              </Link>
            </div>

            {children && children.length > 0 ? (
              <div className="space-y-4">
                {children.map((child) => (
                  <div key={child.id} className="card flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {child.first_name} {child.last_name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        Age Group: {child.age_group}
                      </p>
                    </div>
                    <Link
                      href={`/dashboard/children/${child.id}`}
                      className="text-primary hover:text-primary-700 text-sm font-semibold"
                    >
                      Edit
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <p className="text-gray-600 mb-4">No children registered yet</p>
                <Link href="/dashboard/children/add" className="btn-primary inline-block">
                  Add Your First Child
                </Link>
              </div>
            )}
          </div>

          {/* Upcoming Matches Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">
                Upcoming Matches
              </h2>
              <Link href="/matches" className="text-primary hover:text-primary-700 font-semibold text-sm">
                Browse Matches
              </Link>
            </div>

            {registrations && registrations.length > 0 ? (
              <div className="space-y-4">
                {registrations.slice(0, 3).map((registration: {
                  id: string;
                  matches: { date: string; start_time: string; age_group: string; field_location: string } | null;
                  children: { first_name: string; last_name: string } | null;
                }) => (
                  <div key={registration.id} className="card">
                    <div className="flex justify-between items-start mb-2">
                      <span className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {registration.matches?.age_group}
                      </span>
                      <span className="text-sm text-gray-600">
                        {registration.matches?.date && new Date(registration.matches.date).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {registration.children?.first_name} {registration.children?.last_name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {registration.matches?.start_time} • {registration.matches?.field_location}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="card text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-600 mb-4">No upcoming matches</p>
                <Link href="/matches" className="btn-primary inline-block">
                  Find a Match
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 card">
          <h2 className="text-xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-poppins)]">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            <Link href="/matches" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-semibold">View Schedule</span>
            </Link>

            <Link href="/dashboard/children/add" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              <span className="text-sm font-semibold">Add Child</span>
            </Link>

            <Link href="/field-info" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="text-sm font-semibold">Field Info</span>
            </Link>

            <Link href="/contact" className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <svg className="w-6 h-6 text-primary mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span className="text-sm font-semibold">Contact Us</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
