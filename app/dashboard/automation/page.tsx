import { Suspense } from "react";
import AutomationClient from "./automation-client";
import { connection } from "next/server";

export default async function AutomationPage() {
  await connection();

  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading automation controls...</div>}>
      <AutomationClient />
    </Suspense>
  );
}