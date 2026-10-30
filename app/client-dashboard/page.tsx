"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Home, Wifi, AlertTriangle, Droplet, ChevronRight, Activity, Search } from "lucide-react";
import ClientMap from "@/components/ClientMap";

export default function ClientDashboardHome() {
  const [properties, setProperties] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [activity, setActivity] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // 1. Fetch properties assigned to this client
      const { data: userProps } = await supabase
        .from("properties")
        .select("*")
        .eq("client_id", user.id);
      
      const propertyIds = userProps?.map(p => p.id) || [];

      // 2. Fetch alerts specifically for these properties
      const { data: userAlerts } = await supabase
        .from("alerts")
        .select("*, properties(name)")
        .in("property_id", propertyIds)
        .order("created_at", { ascending: false })
        .limit(5);

      // 3. Fetch activity specifically for these properties
      const { data: userActivity } = await supabase
        .from("activity_logs")
        .select("*, properties(name)")
        .in("property_id", propertyIds)
        .order("created_at", { ascending: false })
        .limit(5);

      setProperties(userProps || []);
      setAlerts(userAlerts || []);
      setActivity(userActivity || []);
      setIsLoading(false);
    };

    fetchDashboardData();
  }, [supabase]);

  if (isLoading) return <div className="animate-pulse h-full w-full flex items-center justify-center">Loading Data...</div>;

  const onlineDevices = properties.filter(p => p.status === 'Online').length;
  const activeAlerts = alerts.filter(a => a.status === 'Active').length;
  const totalFlow = properties.reduce((acc, curr) => acc + (curr.flow_rate || 0), 0);

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Welcome back!</h1>
        <p className="text-sm text-slate-500">Here is the current status of your registered properties.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Total Properties", value: properties.length, sub: "Registered on your account", icon: Home, color: "text-blue-600", bg: "bg-blue-100" },
          { title: "Online Devices", value: onlineDevices, sub: "Working properly", icon: Wifi, color: "text-green-600", bg: "bg-green-100" },
          { title: "Active Alerts", value: activeAlerts, sub: "Requires attention", icon: AlertTriangle, color: "text-orange-500", bg: "bg-orange-100" },
          { title: "Total Water Flow", value: `${totalFlow.toFixed(1)} L/min`, sub: "Across all properties", icon: Droplet, color: "text-blue-500", bg: "bg-blue-100" }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${stat.bg} ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-900">{stat.title}</h3>
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-xs text-slate-500">{stat.sub}</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-slate-300" />
          </div>
        ))}
      </div>

      {/* Main Grid: Map & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg"><Home className="h-4 w-4"/></div>
                Your Properties Map
              </h2>
              <p className="text-xs text-slate-500">Real-time location and status of your registered properties.</p>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
              <input type="text" placeholder="Search property, area or landmark..." className="w-full border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-xs focus:ring-1 focus:ring-blue-500 outline-none" />
            </div>
          </div>
          <ClientMap properties={properties} />
          {/* Map Legend */}
          <div className="flex gap-4 mt-4 text-xs font-medium text-slate-600">
            <span className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-green-500"/> Online</span>
            <span className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-orange-500"/> Low Flow</span>
            <span className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-red-500"/> Offline</span>
            <span className="flex items-center gap-1.5"><div className="h-2.5 w-2.5 rounded-full bg-blue-500"/> Active</span>
          </div>
        </div>

        {/* Right Column: Alerts & Activity */}
        <div className="space-y-6">
          {/* Alerts */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500"/> Recent Alerts
              </h3>
              <button className="text-xs text-blue-600 font-semibold">View All</button>
            </div>
            <div className="space-y-4">
              {alerts.length === 0 ? <p className="text-xs text-slate-500">No active alerts.</p> : alerts.map(alert => (
                <div key={alert.id} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 p-1.5 rounded-full ${alert.severity === 'high' ? 'bg-red-100 text-red-500' : 'bg-orange-100 text-orange-500'}`}>
                      <AlertTriangle className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{alert.properties?.name}</p>
                      <p className="text-xs text-slate-500">{alert.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400">2 hours ago</span>
                    <ChevronRight className="h-4 w-4 text-slate-300" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Activity className="h-4 w-4 text-blue-500"/> Recent Activity
              </h3>
              <button className="text-xs text-blue-600 font-semibold">View All</button>
            </div>
            <div className="space-y-4">
              {activity.length === 0 ? <p className="text-xs text-slate-500">No recent activity.</p> : activity.map(act => (
                <div key={act.id} className="flex items-center justify-between border-b border-slate-50 pb-3 last:border-0">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 p-1.5 rounded-full bg-green-100 text-green-600">
                      <Wifi className="h-3.5 w-3.5" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{act.properties?.name}</p>
                      <p className="text-xs text-slate-500">{act.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4 text-slate-300" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-6">
          <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg"><Home className="h-4 w-4"/></div>
          Your Properties
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-y border-slate-200">
              <tr>
                <th className="px-4 py-3 font-semibold">Property Name</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Flow Rate</th>
                <th className="px-4 py-3 font-semibold">Last Seen</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {properties.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-slate-500">No properties found.</td></tr>
              ) : properties.map((prop) => (
                <tr key={prop.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                  <td className="px-4 py-4 font-bold text-slate-900">{prop.name}</td>
                  <td className="px-4 py-4 text-slate-600">{prop.type || "Commercial"}</td>
                  <td className="px-4 py-4 text-slate-600">{prop.location || "Kigali"}</td>
                  <td className="px-4 py-4">
                    <span className="flex items-center gap-1.5">
                      <div className={`h-2.5 w-2.5 rounded-full ${prop.status === 'Online' ? 'bg-green-500' : 'bg-red-500'}`}/>
                      <span className={prop.status === 'Online' ? 'text-green-700' : 'text-red-700'}>{prop.status}</span>
                    </span>
                  </td>
                  <td className="px-4 py-4 text-slate-600">{prop.flow_rate || "0"} L/min</td>
                  <td className="px-4 py-4 text-slate-500 text-xs">Today, 08:24 AM</td>
                  <td className="px-4 py-4 text-center">
                    <button className="px-3 py-1 border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 font-medium text-xs transition-colors">
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}