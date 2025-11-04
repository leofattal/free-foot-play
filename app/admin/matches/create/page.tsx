'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function CreateMatchPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    date: '',
    startTime: '',
    endTime: '',
    ageGroup: '',
    maxCapacity: '16',
    fieldLocation: 'Main Field',
    coachName: '',
    description: '',
    registrationDeadline: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ageGroups = [
    { value: 'U6', label: 'U6 (Under 6)' },
    { value: 'U8', label: 'U8 (Under 8)' },
    { value: 'U10', label: 'U10 (Under 10)' },
    { value: 'U12', label: 'U12 (Under 12)' },
    { value: 'U14', label: 'U14 (Under 14)' },
    { value: 'U16', label: 'U16 (Under 16)' },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const supabase = createClient();

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('You must be logged in to create matches');
      }

      // Check if user is admin or coach
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!profile || !['admin', 'coach'].includes(profile.role)) {
        throw new Error('Only admins and coaches can create matches');
      }

      // Insert match
      const { error: insertError } = await supabase.from('matches').insert({
        date: formData.date,
        start_time: formData.startTime,
        end_time: formData.endTime,
        age_group: formData.ageGroup,
        max_capacity: parseInt(formData.maxCapacity),
        field_location: formData.fieldLocation,
        coach_name: formData.coachName || null,
        coach_id: user.id,
        description: formData.description,
        registration_deadline: formData.registrationDeadline || null,
        status: 'open',
      });

      if (insertError) throw insertError;

      // Redirect to matches page
      router.push('/matches');
      router.refresh();
    } catch (err: unknown) {
      console.error('Create match error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while creating the match');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/matches"
            className="text-primary hover:text-primary-700 font-semibold text-sm mb-4 inline-block"
          >
            ← Back to Matches
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">
            Create New Match
          </h1>
          <p className="text-gray-600 mt-2">
            Schedule a new soccer match for kids to register
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Date */}
            <div>
              <label htmlFor="date" className="label">
                Match Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                required
                value={formData.date}
                onChange={handleChange}
                className="input-field"
                min={new Date().toISOString().split('T')[0]}
              />
            </div>

            {/* Time Range */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="label">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="startTime"
                  name="startTime"
                  required
                  value={formData.startTime}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>

              <div>
                <label htmlFor="endTime" className="label">
                  End Time <span className="text-red-500">*</span>
                </label>
                <input
                  type="time"
                  id="endTime"
                  name="endTime"
                  required
                  value={formData.endTime}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            </div>

            {/* Age Group */}
            <div>
              <label htmlFor="ageGroup" className="label">
                Age Group <span className="text-red-500">*</span>
              </label>
              <select
                id="ageGroup"
                name="ageGroup"
                required
                value={formData.ageGroup}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select age group</option>
                {ageGroups.map((group) => (
                  <option key={group.value} value={group.value}>
                    {group.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Capacity */}
            <div>
              <label htmlFor="maxCapacity" className="label">
                Max Capacity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                id="maxCapacity"
                name="maxCapacity"
                required
                min="4"
                max="50"
                value={formData.maxCapacity}
                onChange={handleChange}
                className="input-field"
              />
              <p className="mt-1 text-xs text-gray-500">
                Maximum number of children that can register (typically 16)
              </p>
            </div>

            {/* Field Location */}
            <div>
              <label htmlFor="fieldLocation" className="label">
                Field Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fieldLocation"
                name="fieldLocation"
                required
                value={formData.fieldLocation}
                onChange={handleChange}
                className="input-field"
                placeholder="Main Field"
              />
            </div>

            {/* Coach Name */}
            <div>
              <label htmlFor="coachName" className="label">
                Coach Name <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <input
                type="text"
                id="coachName"
                name="coachName"
                value={formData.coachName}
                onChange={handleChange}
                className="input-field"
                placeholder="Coach Smith"
              />
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="label">
                Description <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="input-field resize-none"
                placeholder="Fun Saturday morning soccer for ages 6-8. Bring your own ball and water bottle."
              />
            </div>

            {/* Registration Deadline */}
            <div>
              <label htmlFor="registrationDeadline" className="label">
                Registration Deadline <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <input
                type="datetime-local"
                id="registrationDeadline"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleChange}
                className="input-field"
              />
              <p className="mt-1 text-xs text-gray-500">
                If not set, registrations are open until the match starts
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating Match...' : 'Create Match'}
              </button>
              <Link
                href="/matches"
                className="flex-1 text-center py-2 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
