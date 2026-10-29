
import { Suspense } from "react";
import AlertsClient from "./alerts-client";

export const instant = false;

export default function AlertsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground">
          Loading alerts...
        </div>
      }
    >
      <AlertsClient />
    </Suspense>
  );
}
