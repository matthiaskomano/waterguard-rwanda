'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getDevices() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('devices')
    .select('*, properties(name)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching devices:", error)
    return []
  }
  return data
}

export async function getPropertiesForDropdown() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('properties')
    .select('id, name')
    
  if (error) return []
  return data
}

export async function registerDevice(formData: FormData) {
  const supabase = await createClient()
  
  const { data: orgs } = await supabase
    .from('organization_members')
    .select('organization_id')
    .limit(1)
    .single()

  if (!orgs) return { error: "No organization found." }

  const newDevice = {
    organization_id: orgs.organization_id,
    name: formData.get('name') as string,
    device_identifier: formData.get('identifier') as string,
    property_id: formData.get('property_id') as string || null,
    status: 'Online',
    last_seen_at: new Date().toISOString(),
  }

  const { error } = await supabase.from('devices').insert(newDevice)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/devices')
  return { success: true }
}