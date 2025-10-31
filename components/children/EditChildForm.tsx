'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

interface Child {
  id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  age_group: string;
  medical_notes: string | null;
  emergency_contact_name: string;
  emergency_contact_phone: string;
}

interface EditChildFormProps {
  child: Child;
}

export default function EditChildForm({ child }: EditChildFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: child.first_name,
    lastName: child.last_name,
    dateOfBirth: child.date_of_birth,
    ageGroup: child.age_group,
    medicalNotes: child.medical_notes || '',
    emergencyContact: child.emergency_contact_name,
    emergencyPhone: child.emergency_contact_phone,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(false);

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

      // Update child
      const { error: updateError } = await supabase
        .from('children')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          date_of_birth: formData.dateOfBirth,
          age_group: formData.ageGroup,
          medical_notes: formData.medicalNotes || null,
          emergency_contact_name: formData.emergencyContact,
          emergency_contact_phone: formData.emergencyPhone,
        })
        .eq('id', child.id);

      if (updateError) throw updateError;

      // Redirect to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (err: unknown) {
      console.error('Update child error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while updating the child');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true);
      return;
    }

    setLoading(true);
    setError('');

    try {
      const supabase = createClient();

      // Delete child
      const { error: deleteError } = await supabase
        .from('children')
        .delete()
        .eq('id', child.id);

      if (deleteError) throw deleteError;

      // Redirect to dashboard
      router.push('/dashboard');
      router.refresh();
    } catch (err: unknown) {
      console.error('Delete child error:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An error occurred while deleting the child');
      }
    } finally {
      setLoading(false);
      setDeleteConfirm(false);
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
            Edit Child Profile
          </h1>
          <p className="text-gray-600 mt-2">
            Update {formData.firstName}'s information
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
                  <option key={group.value} value={group.value}>
                    {group.label}
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
                {loading ? 'Saving Changes...' : 'Save Changes'}
              </button>
              <Link
                href="/dashboard"
                className="flex-1 text-center py-2 px-6 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </Link>
            </div>
          </form>

          {/* Delete Section */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Danger Zone</h3>
            <p className="text-sm text-gray-600 mb-4">
              Deleting this child profile will remove all associated match registrations and cannot be undone.
            </p>
            <button
              onClick={handleDelete}
              disabled={loading}
              className={`px-4 py-2 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                deleteConfirm
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-red-50 text-red-600 hover:bg-red-100'
              }`}
            >
              {deleteConfirm ? 'Click Again to Confirm Delete' : 'Delete Child Profile'}
            </button>
            {deleteConfirm && (
              <button
                onClick={() => setDeleteConfirm(false)}
                className="ml-3 px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
