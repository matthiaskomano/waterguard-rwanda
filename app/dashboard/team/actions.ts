'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getTeamMembers() {
  const supabase = await createClient()
  
  // Fetch real members from your database
  const { data, error } = await supabase
    .from('organization_members')
    .select('*')

  if (error) {
    console.error("Error fetching team:", error.message)
    return []
  }
  
  return data || []
}

export async function inviteTeamMember(formData: FormData) {
  const email = formData.get('email') as string
  const role = formData.get('role') as string
  
  // Note: Depending on your Supabase setup, you will either insert this into an 'invites' table
  // or use an Edge Function to trigger Supabase Auth invitations.
  // For now, we simulate a successful UI submission.
  
  revalidatePath('/dashboard/team')
  return { success: true }
}