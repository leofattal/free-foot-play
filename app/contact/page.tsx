import ContactForm from '@/components/contact/ContactForm';
import Link from 'next/link';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
            Contact Us
          </h1>
          <p className="text-xl text-primary-100">
            Have questions? We're here to help!
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>
          </div>

          {/* Contact Information & FAQs */}
          <div className="space-y-8">
            {/* Contact Info Card */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-6 font-[family-name:var(--font-poppins)]">
                Get in Touch
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                    <a
                      href="mailto:info@freefootplay.com"
                      className="text-primary hover:text-primary-700"
                    >
                      info@freefootplay.com
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                    <a
                      href="tel:+15551234567"
                      className="text-primary hover:text-primary-700"
                    >
                      (555) 123-4567
                    </a>
                    <p className="text-sm text-gray-600 mt-1">
                      Monday - Friday, 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="w-6 h-6 text-primary mt-1"
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
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Field Location</h3>
                    <p className="text-gray-700">123 Soccer Field Drive</p>
                    <p className="text-gray-700">Anytown, ST 12345</p>
                    <Link
                      href="/field-info"
                      className="text-primary hover:text-primary-700 text-sm mt-1 inline-block"
                    >
                      View on Map →
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-gradient-to-br from-primary-500 to-primary-700 text-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold mb-4 font-[family-name:var(--font-poppins)]">
                Quick Links
              </h2>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/matches"
                    className="flex items-center hover:text-primary-100 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    View Match Schedule
                  </Link>
                </li>
                <li>
                  <Link
                    href="/field-info"
                    className="flex items-center hover:text-primary-100 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Field Information
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="flex items-center hover:text-primary-100 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                    Your Dashboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* FAQ Preview */}
            <div className="bg-blue-50 border-l-4 border-blue-400 rounded-lg p-6">
              <h3 className="text-lg font-bold text-blue-900 mb-3">
                Frequently Asked Questions
              </h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-semibold text-blue-900">
                    How do I register my child for a match?
                  </p>
                  <p className="text-blue-700 mt-1">
                    Simply browse available matches, select one that fits your child's age
                    group, and click Register. You'll need to create an account first.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-blue-900">
                    What should my child bring to the match?
                  </p>
                  <p className="text-blue-700 mt-1">
                    Water bottle, shin guards, appropriate cleats or sneakers, and sunscreen.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-blue-900">Can I cancel a registration?</p>
                  <p className="text-blue-700 mt-1">
                    Yes, you can cancel from your dashboard. Please cancel at least 24 hours
                    before the match.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
