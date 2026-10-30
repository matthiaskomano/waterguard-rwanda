"use client";

import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
        <p className="text-sm text-slate-500">Update your profile, password, and notification preferences.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-16 text-center flex flex-col items-center justify-center">
        <div className="p-4 bg-slate-100 rounded-full mb-4">
          <Settings className="h-10 w-10 text-slate-600" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Preferences & Security</h2>
        <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
          Profile management and alert routing preferences (Email/SMS/Telegram) will be available in this section shortly.
        </p>
      </div>
    </div>
  );
}