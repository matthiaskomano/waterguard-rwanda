import { Suspense } from "react";
import AlertsClient from "./alerts-client";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Allow blocking route for Next.js dynamic IO
export const instant = false;

export default async function AlertsPage() {
  // Opt into dynamic rendering safely for Next.js 15+
  await connection();

  // Fetch real alerts from Supabase
  const supabase = await createClient();
  const { data: alerts } = await supabase
    .from("alerts")
    .select("*, properties(name)")
    .order("created_at", { ascending: false });

  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground animate-pulse">
          Loading live alerts...
        </div>
      }
    >
      <AlertsClient initialAlerts={alerts || []} />
    </Suspense>
  );
}