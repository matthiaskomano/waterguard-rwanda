import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase admin client to bypass RLS for hardware endpoints
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Insert the incoming hardware data into your Supabase 'alerts' table
    const { error } = await supabase
      .from('alerts')
      .insert([
        {
          device_id: data.device_id,
          alert_type: data.status,
          severity: data.status === "Leak Detected" ? "Critical" : "Info",
          status: "Active"
        }
      ]);

    if (error) throw error;
    
    return NextResponse.json({ success: true, message: "Telemetry saved" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to process telemetry" }, { status: 500 });
  }
}