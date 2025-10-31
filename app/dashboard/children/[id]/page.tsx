import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import EditChildForm from '@/components/children/EditChildForm';

type Params = Promise<{ id: string }>;

export default async function EditChildPage({ params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/auth/login');
  }

  // Fetch child data
  const { data: child, error } = await supabase
    .from('children')
    .select('*')
    .eq('id', id)
    .eq('parent_id', user.id)
    .single();

  if (error || !child) {
    redirect('/dashboard');
  }

  return <EditChildForm child={child} />;
}
