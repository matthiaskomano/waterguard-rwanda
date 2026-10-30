"use client";

import { Building } from "lucide-react";

export default function PropertiesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">My Properties</h1>
        <p className="text-sm text-slate-500">Manage your assigned locations and monitoring devices.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-16 text-center flex flex-col items-center justify-center">
        <div className="p-4 bg-blue-50 rounded-full mb-4">
          <Building className="h-10 w-10 text-blue-500" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Property Management</h2>
        <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
          Detailed views for individual properties, floor plans, and specific device assignments are coming soon.
        </p>
      </div>
    </div>
  );
}