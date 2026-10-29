
import { Suspense } from "react";
import LiveMonitoringClient from "./monitoring-client";

export const instant = false;

export default function LiveMonitoringPage() {
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
