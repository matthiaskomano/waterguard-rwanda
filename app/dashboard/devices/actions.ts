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
  const { data: { user } } = await supabase.auth.getUser()
  
  // 1. Safely query organization_members for this specific user
  let { data: orgMember } = await supabase
    .from('organization_members')
    .select('organization_id')
    .eq('user_id', user?.id)
    .limit(1)
    .maybeSingle()

  // 2. Fallback: If not found, try to grab any available organization ID for testing
  if (!orgMember) {
    const { data: anyOrg } = await supabase
      .from('organization_members')
      .select('organization_id')
      .limit(1)
      .maybeSingle()
      
    orgMember = anyOrg
  }

  // 3. Build the payload dynamically
  const newDevice: Record<string, any> = {
    name: formData.get('name') as string,
    device_identifier: formData.get('identifier') as string,
    property_id: formData.get('property_id') as string || null,
    status: 'Online',
    last_seen_at: new Date().toISOString(),
  }

  // Only attach organization_id if we successfully found one in the database
  if (orgMember && orgMember.organization_id) {
    newDevice.organization_id = orgMember.organization_id
  }

  // 4. Insert the device
  const { error } = await supabase.from('devices').insert(newDevice)

  if (error) {
    console.error("Insert Error:", error.message)
    return { error: error.message }
  }

  revalidatePath('/dashboard/devices')
  return { success: true }
}