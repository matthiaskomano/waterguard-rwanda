import { Suspense } from "react";
import AlertsClient from "./alerts-client";
import { connection } from "next/server";

export default async function AlertsPage() {
  await connection();
  
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading alerts...</div>}>
      <AlertsClient />
    </Suspense>
  );
}