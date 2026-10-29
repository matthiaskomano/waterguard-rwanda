import { Suspense } from "react";
import LiveMonitoringClient from "./monitoring-client";
import { headers } from "next/headers";

export default async function LiveMonitoringPage() {
  // Opt into dynamic rendering to prevent Next.js build errors for live data
  await headers();
  
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground">
          Loading live monitoring telemetry...
        </div>
      }
    >
      <LiveMonitoringClient />
    </Suspense>
  );
}