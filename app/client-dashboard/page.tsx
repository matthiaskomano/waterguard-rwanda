"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Droplet, AlertTriangle, Activity, MapPin } from "lucide-react";

export default function ClientDashboard() {
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | undefined>("");
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const fetchClientData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      setUserEmail(user.email);

      // Fetch ONLY properties assigned to this specific user's UID
      // IMPORTANT: Change 'client_id' to match your actual column name in Supabase
      const { data: userProperties, error } = await supabase
        .from("properties")
        .select("*")
        .eq("client_id", user.id); 

      if (!error && userProperties) {
        setProperties(userProperties);
      }
      setIsLoading(false);
    };

    fetchClientData();
  }, [router, supabase]);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading your dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">My Water Monitoring</h1>
            <p className="text-sm text-slate-500">Welcome back, {userEmail}</p>
          </div>
          <button 
            onClick={async () => {
              await supabase.auth.signOut();
              router.push("/login");
            }}
            className="text-sm text-slate-600 hover:text-slate-900 border px-4 py-2 rounded-md bg-white"
          >
            Sign Out
          </button>
        </header>

        {properties.length === 0 ? (
          <div className="bg-white p-8 rounded-xl border text-center">
            <Droplet className="h-12 w-12 text-blue-200 mx-auto mb-3" />
            <h3 className="text-lg font-medium">No Properties Assigned</h3>
            <p className="text-slate-500 text-sm mt-1">Contact your administrator to have your property linked to this account.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div key={property.id} className="bg-white p-6 rounded-xl border shadow-sm space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">{property.name || "Unnamed Property"}</h3>
                    <div className="flex items-center text-sm text-slate-500 mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      {property.address || "No address provided"}
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${property.status === 'Online' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-700'}`}>
                    {property.status || "Online"}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex items-center text-slate-500 mb-1">
                      <Activity className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium uppercase tracking-wider">Usage Today</span>
                    </div>
                    <p className="text-lg font-bold text-blue-600">{property.daily_usage || "0"} L</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <div className="flex items-center text-slate-500 mb-1">
                      <AlertTriangle className="h-4 w-4 mr-1" />
                      <span className="text-xs font-medium uppercase tracking-wider">Active Alerts</span>
                    </div>
                    <p className="text-lg font-bold text-destructive">{property.alerts_count || "0"}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}