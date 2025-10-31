'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

export default function AddChildPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    ageGroup: '',
    medicalNotes: '',
    emergencyContact: '',
    emergencyPhone: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const ageGroups = [
    'U6 (Under 6)',
    'U8 (Under 8)',
    'U10 (Under 10)',
    'U12 (Under 12)',
    'U14 (Under 14)',
    'U16 (Under 16)',
    'U18 (Under 18)',
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
        throw new Error('You must be logged in to add a child');
      }

      // Insert child
      const { error: insertError } = await supabase.from('children').insert({
        parent_id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        date_of_birth: formData.dateOfBirth,
        age_group: formData.ageGroup,
        medical_notes: formData.medicalNotes || null,
        emergency_contact_name: formData.emergencyContact,
        emergency_contact_phone: formData.emergencyPhone,
      });

      if (insertError) throw insertError;

      // Redirect to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (err: unknown) {
      console.error('Add child error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while adding the child');
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
            href="/dashboard"
            className="text-primary hover:text-primary-700 font-semibold text-sm mb-4 inline-block"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 font-[family-name:var(--font-poppins)]">
            Add Child Profile
          </h1>
          <p className="text-gray-600 mt-2">
            Create a profile for your child to register them for soccer matches
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
            {/* First Name */}
            <div>
              <label htmlFor="firstName" className="label">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className="input-field"
                placeholder="John"
              />
            </div>

            {/* Last Name */}
            <div>
              <label htmlFor="lastName" className="label">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className="input-field"
                placeholder="Doe"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label htmlFor="dateOfBirth" className="label">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                required
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="input-field"
                max={new Date().toISOString().split('T')[0]}
              />
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
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </div>

            {/* Emergency Contact Name */}
            <div>
              <label htmlFor="emergencyContact" className="label">
                Emergency Contact Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                required
                value={formData.emergencyContact}
                onChange={handleChange}
                className="input-field"
                placeholder="Jane Doe"
              />
            </div>

            {/* Emergency Phone */}
            <div>
              <label htmlFor="emergencyPhone" className="label">
                Emergency Contact Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="emergencyPhone"
                name="emergencyPhone"
                required
                value={formData.emergencyPhone}
                onChange={handleChange}
                className="input-field"
                placeholder="(555) 123-4567"
              />
            </div>

            {/* Medical Notes */}
            <div>
              <label htmlFor="medicalNotes" className="label">
                Medical Notes{' '}
                <span className="text-gray-500 text-sm">(Optional)</span>
              </label>
              <textarea
                id="medicalNotes"
                name="medicalNotes"
                rows={4}
                value={formData.medicalNotes}
                onChange={handleChange}
                className="input-field resize-none"
                placeholder="Any allergies, medical conditions, or special needs we should be aware of..."
              />
              <p className="mt-1 text-xs text-gray-500">
                This information will be kept confidential and used only for safety purposes
              </p>
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Adding Child...' : 'Add Child'}
              </button>
              <Link
                href="/dashboard"
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
