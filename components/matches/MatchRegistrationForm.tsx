'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

interface Match {
  id: string;
  date: string;
  start_time: string;
  age_group: string;
  max_capacity: number;
  current_enrollment: number;
  field_location: string;
}

interface Child {
  id: string;
  first_name: string;
  last_name: string;
  age_group: string;
}

interface MatchRegistrationFormProps {
  match: Match;
  children: Child[];
}

export default function MatchRegistrationForm({ match, children }: MatchRegistrationFormProps) {
  const router = useRouter();
  const [selectedChildId, setSelectedChildId] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Filter children by matching age group
  const eligibleChildren = children.filter((child) => child.age_group === match.age_group);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!selectedChildId) {
      setError('Please select a child');
      return;
    }

    if (!agreedToTerms) {
      setError('Please agree to the terms and conditions');
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      // Get current user
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error('You must be logged in to register');
      }

      // Check if child is already registered for this match
      const { data: existingRegistration } = await supabase
        .from('registrations')
        .select('id')
        .eq('match_id', match.id)
        .eq('child_id', selectedChildId)
        .single();

      if (existingRegistration) {
        throw new Error('This child is already registered for this match');
      }

      // Create registration
      const { error: insertError } = await supabase.from('registrations').insert({
        parent_id: user.id,
        child_id: selectedChildId,
        match_id: match.id,
        status: 'confirmed',
      });

      if (insertError) throw insertError;

      // Redirect to dashboard
      router.push('/dashboard?registration=success');
      router.refresh();
    } catch (err: unknown) {
      console.error('Registration error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred during registration');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-[family-name:var(--font-poppins)]">
        Complete Registration
      </h2>

      {/* Error Message */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      {eligibleChildren.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
          <div className="flex items-start">
            <svg
              className="w-6 h-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0"
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
            <div>
              <p className="font-semibold text-yellow-900 mb-1">No Eligible Children</p>
              <p className="text-sm text-yellow-700">
                None of your registered children match the age group ({match.age_group}) for this
                match. Please add a child in the correct age group or browse other matches.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Child Selection */}
          <div>
            <label htmlFor="child" className="label">
              Select Child <span className="text-red-500">*</span>
            </label>
            <select
              id="child"
              value={selectedChildId}
              onChange={(e) => setSelectedChildId(e.target.value)}
              required
              className="input-field"
            >
              <option value="">Choose a child to register</option>
              {eligibleChildren.map((child) => (
                <option key={child.id} value={child.id}>
                  {child.first_name} {child.last_name} ({child.age_group})
                </option>
              ))}
            </select>
            <p className="mt-2 text-sm text-gray-600">
              Only children in the {match.age_group} age group are shown
            </p>
          </div>

          {/* Important Information */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
            <ul className="text-sm text-blue-700 space-y-1 list-disc list-inside">
              <li>Please arrive 15 minutes before the match start time</li>
              <li>Bring water, shin guards, and appropriate footwear</li>
              <li>Parents/guardians must remain at the field during the match</li>
              <li>Cancellations must be made at least 24 hours in advance</li>
            </ul>
          </div>

          {/* Terms and Conditions */}
          <div className="border-t border-gray-200 pt-6">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded mt-1"
              />
              <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                I agree to the terms and conditions, including the waiver of liability. I confirm
                that my child is physically able to participate and I will remain present during
                the match. <span className="text-red-500">*</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !selectedChildId || !agreedToTerms}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Registering...
              </span>
            ) : (
              'Complete Registration'
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            By clicking "Complete Registration", you will secure a spot for your child in this
            match.
          </p>
        </form>
      )}
    </div>
  );
}
