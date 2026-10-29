import { Suspense } from "react";
import AutomationClient from "./automation-client";

export const dynamic = "force-dynamic";

export default function AutomationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading automation controls...</div>}>
      <AutomationClient />
    </Suspense>
  );
}