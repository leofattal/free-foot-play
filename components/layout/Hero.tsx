import Link from 'next/link';

export default function Hero() {
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
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2 font-[family-name:var(--font-poppins)]">100+</div>
              <div className="text-primary-100">Active Players</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2 font-[family-name:var(--font-poppins)]">50+</div>
              <div className="text-primary-100">Matches This Month</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold mb-2 font-[family-name:var(--font-poppins)]">5+</div>
              <div className="text-primary-100">Age Groups</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
