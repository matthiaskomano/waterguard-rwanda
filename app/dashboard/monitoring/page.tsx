import { Suspense } from "react";
import { connection } from "next/server";
import LiveMonitoringClient from "./monitoring-client";

export default async function LiveMonitoringPage() {
  await connection();

  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading live monitoring telemetry...</div>}>
      <LiveMonitoringClient />
    </Suspense>
  );
}