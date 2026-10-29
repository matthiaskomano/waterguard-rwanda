'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getProperties() {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Error fetching properties:", error.message)
    return []
  }
  
  return data || []
}

export async function createProperty(formData: FormData) {
  const supabase = await createClient()
  
  // Get the user's first organization
  const { data: orgs } = await supabase
    .from('organization_members')
    .select('organization_id')
    .limit(1)
    .single()

  if (!orgs) return { error: "No organization found." }

  // Extract map coordinates if they were provided
  const latStr = formData.get('latitude') as string | null;
  const lngStr = formData.get('longitude') as string | null;
  const latitude = latStr ? parseFloat(latStr) : null;
  const longitude = lngStr ? parseFloat(lngStr) : null;

  // Extract the newly added owner ID
  const owner_id = formData.get('owner_id') as string | null;

  const newProperty = {
    organization_id: orgs.organization_id,
    name: formData.get('name') as string,
    property_type: formData.get('type') as string,
    location: formData.get('location') as string,
    latitude: latitude,
    longitude: longitude,
    owner_id: owner_id || null, // Assign to the client if provided
    status: 'Healthy'
  }

  const { error } = await supabase.from('properties').insert(newProperty)

  if (error) return { error: error.message }

  revalidatePath('/dashboard/properties')
  return { success: true }
}