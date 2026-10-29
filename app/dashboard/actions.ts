'use server'

import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function logOut() {
  const supabase = await createClient()
  
  // Destroys the active user session
  await supabase.auth.signOut()
  
  // Redirects the user back to the public landing page
  redirect('/')
}