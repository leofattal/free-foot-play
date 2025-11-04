'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

interface MatchFiltersProps {
  currentAgeGroup?: string;
  currentStatus?: string;
  currentDateFrom?: string;
  currentDateTo?: string;
  currentSearch?: string;
}

function MatchFiltersForm({ currentAgeGroup, currentStatus, currentDateFrom, currentDateTo, currentSearch }: MatchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const ageGroups = [
    { value: 'U6', label: 'U6 (Under 6)' },
    { value: 'U8', label: 'U8 (Under 8)' },
    { value: 'U10', label: 'U10 (Under 10)' },
    { value: 'U12', label: 'U12 (Under 12)' },
    { value: 'U14', label: 'U14 (Under 14)' },
    { value: 'U16', label: 'U16 (Under 16)' },
  ];

  const statuses = [
    { value: 'open', label: 'Open' },
    { value: 'full', label: 'Full' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);

    if (value === '' || value === 'all') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/matches?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push('/matches');
  };

  const hasActiveFilters = currentAgeGroup || currentStatus || currentDateFrom || currentDateTo || currentSearch;

  return (
    <div className="space-y-6">
      {/* Search Filter */}
      <div>
        <label htmlFor="search" className="block text-sm font-semibold text-gray-700 mb-2">
          Search
        </label>
        <input
          type="text"
          id="search"
          placeholder="Search by location, coach..."
          value={currentSearch || ''}
          onChange={(e) => handleFilterChange('search', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      {/* Age Group Filter */}
      <div>
        <label htmlFor="age_group" className="block text-sm font-semibold text-gray-700 mb-2">
          Age Group
        </label>
        <select
          id="age_group"
          value={currentAgeGroup || 'all'}
          onChange={(e) => handleFilterChange('age_group', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Ages</option>
          {ageGroups.map((age) => (
            <option key={age.value} value={age.value}>
              {age.label}
            </option>
          ))}
        </select>
      </div>

      {/* Status Filter */}
      <div>
        <label htmlFor="status" className="block text-sm font-semibold text-gray-700 mb-2">
          Status
        </label>
        <select
          id="status"
          value={currentStatus || 'open'}
          onChange={(e) => handleFilterChange('status', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="open">Open</option>
          {statuses.map((status) => (
            <option key={status.value} value={status.value}>
              {status.label}
            </option>
          ))}
        </select>
      </div>

      {/* Date Range Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Date Range
        </label>
        <div className="space-y-2">
          <input
            type="date"
            id="date_from"
            placeholder="From"
            value={currentDateFrom || ''}
            onChange={(e) => handleFilterChange('date_from', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <input
            type="date"
            id="date_to"
            placeholder="To"
            value={currentDateTo || ''}
            onChange={(e) => handleFilterChange('date_to', e.target.value)}
            min={currentDateFrom || new Date().toISOString().split('T')[0]}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">Leave empty for all upcoming matches</p>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full px-4 py-2 text-sm font-semibold text-primary border border-primary rounded-lg hover:bg-primary-50 transition-colors"
        >
          Clear All Filters
        </button>
      )}

      {/* Info Box */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-blue-50 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">Need Help?</h3>
          <p className="text-xs text-blue-700 mb-3">
            Can't find the right match? Contact us and we'll help you find the perfect game for your child.
          </p>
          <a
            href="/contact"
            className="text-xs font-semibold text-blue-900 hover:text-blue-700 underline"
          >
            Contact Support →
          </a>
        </div>
      </div>
    </div>
  );
}

export default function MatchFilters(props: MatchFiltersProps) {
  return (
    <Suspense fallback={
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    }>
      <MatchFiltersForm {...props} />
    </Suspense>
  );
}
