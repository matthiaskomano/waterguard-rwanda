'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getAlerts() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('alerts')
    .select(`
      id,
      type,
      severity,
      flow_rate,
      status,
      created_at,
      properties ( name ),
      devices ( device_identifier )
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching alerts:", error.message)
    return []
  }
  
  return data || []
}

export async function updateAlertStatus(id: string, status: string, formData: FormData) {
  const supabase = await createClient()
  
  const { error } = await supabase
    .from('alerts')
    .update({ status })
    .eq('id', id)

  if (error) {
    console.error("Error updating alert:", error.message)
    return { error: error.message }
  }

  revalidatePath('/dashboard/alerts')
  return { success: true }
}

export async function runDiagnostics(formData: FormData) {
  const supabase = await createClient()
  
  // Get user's org
  const { data: orgs } = await supabase
    .from('organization_members')
    .select('organization_id')
    .limit(1)
    .single()

  if (orgs) {
    // Generate a simulated diagnostic alert for demonstration
    await supabase.from('alerts').insert({
      organization_id: orgs.organization_id,
      type: "Diagnostic Scan Completed",
      severity: "Info",
      flow_rate: "N/A",
      status: "Resolved"
    })
  }

  revalidatePath('/dashboard/alerts')
}