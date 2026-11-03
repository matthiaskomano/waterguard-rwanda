
"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getProperties() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching properties:", error.message);
    return [];
  }

  console.log(
    `Successfully fetched ${data?.length ?? 0} properties from Supabase.`
  );

  return data ?? [];
}

export async function createProperty(formData: FormData) {
  const supabase = await createClient();

  // Validate required fields
  const name = String(formData.get("name") ?? "").trim();
  const propertyType = String(
    formData.get("property_type") ??
    formData.get("type") ??
    ""
  ).trim();
  const location = String(formData.get("location") ?? "").trim();

  if (!name) {
    return { error: "Property name is required." };
  }

  if (!propertyType) {
    return { error: "Please select a property type." };
  }

  if (!location) {
    return { error: "Property location is required." };
  }

  // Get the user's organization
  const { data: membership, error: membershipError } = await supabase
    .from("organization_members")
    .select("organization_id")
    .limit(1)
    .single();

  if (membershipError || !membership?.organization_id) {
    console.error("Organization lookup error:", membershipError?.message);

    return {
      error: "No organization found. Please contact your administrator.",
    };
  }

  // Extract and validate coordinates
  const latValue = formData.get("latitude");
  const lngValue = formData.get("longitude");

  const latStr = String(latValue ?? "").trim();
  const lngStr = String(lngValue ?? "").trim();

  const latitude = latStr === "" ? null : Number(latStr);
  const longitude = lngStr === "" ? null : Number(lngStr);

  if (latitude !== null && !Number.isFinite(latitude)) {
    return { error: "Please enter a valid latitude." };
  }

  if (longitude !== null && !Number.isFinite(longitude)) {
    return { error: "Please enter a valid longitude." };
  }

  if (latitude !== null && (latitude < -90 || latitude > 90)) {
    return {
      error: "Latitude must be between -90 and 90.",
    };
  }

  if (longitude !== null && (longitude < -180 || longitude > 180)) {
    return {
      error: "Longitude must be between -180 and 180.",
    };
  }

  if (
    (latitude === null && longitude !== null) ||
    (latitude !== null && longitude === null)
  ) {
    return {
      error: "Please provide both latitude and longitude.",
    };
  }

  // Prepare property record
  const newProperty = {
    organization_id: membership.organization_id,
    name,
    property_type: propertyType,
    location,
    latitude,
    longitude,
    status: "Healthy",
  };

  // Save to Supabase
  const { data, error } = await supabase
    .from("properties")
    .insert(newProperty)
    .select()
    .single();

  if (error) {
    console.error("Property creation error:", error.message);

    return {
      error: error.message,
    };
  }

  // Refresh properties page
  revalidatePath("/dashboard/properties");

  return {
    success: true,
    property: data,
  };
}
