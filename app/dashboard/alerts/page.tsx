import { Suspense } from "react";
import AlertsClient from "./alerts-client";
import { headers } from "next/headers";

export default async function AlertsPage() {
  await headers();
  
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading alerts...</div>}>
      <AlertsClient />
    </Suspense>
  );
}