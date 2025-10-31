import { createClient } from '@/lib/supabase/server';
import GoogleMap from '@/components/maps/GoogleMap';

export const metadata = {
  title: 'Field Information - Free Foot Play',
  description: 'Find our soccer field location, directions, parking, and field rules.',
};

export default async function FieldInfoPage() {
  const supabase = await createClient();

  // Fetch field information from database
  const { data: fieldInfo } = await supabase
    .from('field_information')
    .select('*')
    .single();

  // Default field info if database is not set up yet
  const field = fieldInfo || {
    name: 'Main Soccer Field',
    address: '123 Soccer Lane, Sports City, SC 12345',
    latitude: 34.0522,
    longitude: -118.2437,
    parking_info: 'Free parking available in the lot adjacent to the field. Additional street parking on Main Street.',
    rules: 'Please arrive 15 minutes before match time. All players must wear shin guards. No cleats with metal studs. Respect the field and clean up after yourselves.',
    amenities: 'Restrooms available near the parking lot. Water fountains on site. Shaded seating area for spectators. First aid kit available with field coordinator.',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 font-[family-name:var(--font-poppins)]">
            Field Information
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to know about our soccer field location, directions, and facilities.
          </p>
        </div>

        {/* Quick Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="card text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 font-[family-name:var(--font-poppins)]">Easy to Find</h3>
            <p className="text-gray-600 text-sm">
              Centrally located with clear directions and GPS coordinates
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 font-[family-name:var(--font-poppins)]">Free Parking</h3>
            <p className="text-gray-600 text-sm">
              Ample parking space for all families and spectators
            </p>
          </div>

          <div className="card text-center">
            <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 font-[family-name:var(--font-poppins)]">Great Facilities</h3>
            <p className="text-gray-600 text-sm">
              Restrooms, water fountains, and shaded seating areas
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Map and Location */}
          <div>
            {/* Map */}
            <div className="card mb-6">
              <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
                📍 Location
              </h2>

              {/* Google Map */}
              <div className="mb-4">
                <GoogleMap
                  latitude={field.latitude}
                  longitude={field.longitude}
                  markerTitle={field.name}
                  zoom={15}
                  height="400px"
                />
              </div>

              {/* Address */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold mb-2 text-gray-900">{field.name}</h3>
                <p className="text-gray-700 mb-3">{field.address}</p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${field.latitude},${field.longitude}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 btn-primary text-center"
                  >
                    <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Get Directions
                  </a>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(field.address);
                      alert('Address copied to clipboard!');
                    }}
                    className="flex-1 btn-outline text-center"
                  >
                    <svg className="w-5 h-5 inline-block mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Address
                  </button>
                </div>
              </div>
            </div>

            {/* Parking Information */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
                🅿️ Parking
              </h2>
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {field.parking_info}
                </p>
              </div>

              <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-700">
                      <strong>Tip:</strong> Arrive 15 minutes early to find parking and get your kids ready!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Rules and Amenities */}
          <div>
            {/* Field Rules */}
            <div className="card mb-6">
              <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
                📋 Field Rules
              </h2>
              <div className="prose prose-sm max-w-none">
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>⚠️ Important:</strong> Please read and follow these rules to ensure everyone's safety and enjoyment.
                  </p>
                </div>

                <div className="space-y-3 text-gray-700">
                  {field.rules.split('. ').map((rule: string, index: number) => (
                    <div key={index} className="flex items-start">
                      <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{rule.trim()}{rule.endsWith('.') ? '' : '.'}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <p className="text-sm text-green-800">
                  <strong>Code of Conduct:</strong> We expect all players, parents, and spectators to demonstrate good sportsmanship, respect for others, and a positive attitude.
                </p>
              </div>
            </div>

            {/* Amenities */}
            <div className="card">
              <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
                ⚽ Facilities & Amenities
              </h2>

              <div className="grid sm:grid-cols-2 gap-4">
                {field.amenities.split('. ').map((amenity: string, index: number) => (
                  <div key={index} className="flex items-start bg-gray-50 p-3 rounded-lg">
                    <svg className="w-5 h-5 text-primary mt-0.5 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-sm text-gray-700">{amenity.trim()}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="font-semibold text-gray-900">What to Bring:</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                    </svg>
                    <span className="text-sm">Soccer ball</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    <span className="text-sm">Shin guards</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    <span className="text-sm">Water bottle</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-accent mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-sm">Sunscreen</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Weather & Cancellations */}
        <div className="mt-8 card bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 font-[family-name:var(--font-poppins)]">
                Weather & Cancellations
              </h3>
              <p className="text-gray-700 mb-2">
                In case of severe weather, matches may be cancelled or postponed. We'll notify all registered parents via email and SMS (if enabled) at least 2 hours before the scheduled match time.
              </p>
              <p className="text-sm text-gray-600">
                <strong>Tip:</strong> Check your email before leaving home, especially if weather conditions look uncertain.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8 text-center card bg-primary text-white">
          <h3 className="text-2xl font-bold mb-3 font-[family-name:var(--font-poppins)]">
            Have Questions?
          </h3>
          <p className="mb-6 text-primary-100">
            Need help finding the field or have questions about facilities? We're here to help!
          </p>
          <a
            href="/contact"
            className="inline-block bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
