import { Power } from "lucide-react";
import { EmptyState } from "@/components/dashboard/empty-state";

export default function AutomationPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-primary">Valve Automation</h1>
        <p className="text-muted-foreground">Manage remote shutoff capabilities.</p>
      </div>
      <EmptyState 
        icon={Power}
        title="No automated valves configured"
        description="Connect an authorized motorized valve to enable remote and automatic water shutoff."
        actionLabel="Configure Valve"
      />
    </div>
  );
}