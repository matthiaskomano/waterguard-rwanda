"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { createClient } from "@/lib/supabase/client";
import { Building2, AlertTriangle, Droplet, Search, Map, Wifi, ArrowRight, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Import map with SSR disabled to prevent window errors
const LiveMap = dynamic(() => import("./live-map"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-slate-100 animate-pulse rounded-xl border flex items-center justify-center text-muted-foreground">Loading Kigali Map...</div>
});

export default function LiveMonitoringClient() {
  const [properties, setProperties] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedProperty, setFocusedProperty] = useState<any | null>(null);
  const supabase = createClient();

  // Fetch initial data and subscribe to real-time updates
  useEffect(() => {
    const fetchProperties = async () => {
      const { data } = await supabase.from('properties').select('*').order('name');
      if (data) setProperties(data);
    };

    fetchProperties();

    const channel = supabase
      .channel('public:properties')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'properties' }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setProperties((prev) => [...prev, payload.new]);
        } else if (payload.eventType === 'UPDATE') {
          setProperties((prev) => prev.map(p => p.id === payload.new.id ? payload.new : p));
        } else if (payload.eventType === 'DELETE') {
          setProperties((prev) => prev.filter(p => p.id !== payload.old.id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  // Derived Stats
  const onlineCount = properties.filter(p => p.status === 'Healthy' || p.status === 'Online').length;
  const alertCount = properties.filter(p => p.status === 'Offline' || p.status === 'Low Flow').length;
  // Calculate flow if your table has it, otherwise default 0
  const totalFlow = properties.reduce((sum, p) => sum + (Number(p.current_flow) || 0), 0);

  // Filter properties for the sidebar
  const filteredProperties = properties.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Healthy':
      case 'Online': return 'text-emerald-600 bg-emerald-50';
      case 'Low Flow': return 'text-amber-600 bg-amber-50';
      case 'Offline': return 'text-red-600 bg-red-50';
      default: return 'text-blue-600 bg-blue-50';
    }
  };

  const getStatusDot = (status: string) => {
    switch (status) {
      case 'Healthy':
      case 'Online': return 'bg-emerald-500';
      case 'Low Flow': return 'bg-amber-500';
      case 'Offline': return 'bg-red-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className="flex flex-col gap-6 h-[calc(100vh-8rem)]">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#0a192f] flex items-center gap-2">
          <Wifi className="h-6 w-6 text-blue-500" />
          Live Monitoring
        </h1>
        <p className="text-muted-foreground text-sm">Real-time telemetry and flow rate analysis from active sensors.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl border bg-white shadow-sm flex flex-col justify-between cursor-pointer hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-emerald-100 text-emerald-600"><Building2 className="h-5 w-5" /></div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Properties</p>
              <h3 className="text-xl font-bold">{properties.length}</h3>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
            Registered in Kigali <ArrowRight className="h-3 w-3" />
          </div>
        </div>

        <div className="p-4 rounded-xl border bg-white shadow-sm flex flex-col justify-between cursor-pointer hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-blue-100 text-blue-600"><Droplet className="h-5 w-5" /></div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Online</p>
                <h3 className="text-xl font-bold">{onlineCount}</h3>
              </div>
            </div>
            <span className="text-xs font-semibold text-emerald-500 flex items-center">↑ 83%</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Active & responding</p>
        </div>

        <div className="p-4 rounded-xl border bg-white shadow-sm flex flex-col justify-between cursor-pointer hover:border-slate-300 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-full bg-amber-100 text-amber-600"><AlertTriangle className="h-5 w-5" /></div>
              <div>
                <p className="text-xs text-muted-foreground font-medium">Alerts</p>
                <h3 className="text-xl font-bold">{alertCount}</h3>
              </div>
            </div>
            <span className="text-xs font-semibold text-red-500 flex items-center">↑ 17%</span>
          </div>
          <p className="text-xs text-slate-500 mt-2">Need attention</p>
        </div>

        <div className="p-4 rounded-xl border bg-white shadow-sm flex flex-col justify-between cursor-pointer hover:border-slate-300 transition-colors">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-full bg-indigo-100 text-indigo-600"></div>
            <div>
              <p className="text-xs text-muted-foreground font-medium">Total Flow</p>
              <h3 className="text-xl font-bold">{totalFlow.toFixed(1)} L/min</h3>
            </div>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500 mt-2">
            Across all properties <ArrowRight className="h-3 w-3" />
          </div>
        </div>
      </div>

      {/* Main Content Split: Map and List */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[500px]">
        
        {/* Left: Interactive Map */}
        <div className="lg:w-2/3 h-[500px] lg:h-full flex flex-col gap-3 bg-white p-4 rounded-xl border shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 z-10">
            <div>
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                 Properties Map - Kigali
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">Live locations of all registered properties</p>
            </div>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search property, area..." 
                className="pl-8 h-8 text-xs bg-slate-50 border-slate-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex-1 rounded-lg overflow-hidden border">
            <LiveMap properties={filteredProperties} focusedProperty={focusedProperty} />
          </div>
        </div>

        {/* Right: Properties List */}
        <div className="lg:w-1/3 h-[500px] lg:h-full flex flex-col bg-white rounded-xl border shadow-sm overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between bg-slate-50/50">
            <div>
              <h3 className="font-bold text-slate-800 flex items-center gap-2">
                <Building2 className="h-4 w-4 text-primary" /> Properties List
              </h3>
              <p className="text-[10px] text-muted-foreground mt-0.5">All registered properties and their current status</p>
            </div>
            <Link href="/dashboard/properties">
              <Button size="sm" className="h-7 text-xs bg-blue-600 hover:bg-blue-700">
                <Plus className="h-3 w-3 mr-1" /> Add Property
              </Button>
            </Link>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredProperties.length === 0 ? (
              <div className="p-8 text-center text-sm text-slate-500">No properties found.</div>
            ) : (
              filteredProperties.map(prop => (
                <div 
                  key={prop.id} 
                  onClick={() => setFocusedProperty(prop)}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors border border-transparent hover:border-slate-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-md bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-800 leading-tight">{prop.name}</h4>
                      <p className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[140px]">{prop.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-right">
                    <div className={`px-2 py-1 rounded-full flex items-center gap-1.5 text-[10px] font-semibold ${getStatusColor(prop.status)}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${getStatusDot(prop.status)}`}></span>
                      {prop.status === 'Healthy' ? 'Online' : prop.status}
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-xs font-semibold text-slate-700">{prop.current_flow || "0.0"} L/min</p>
                      <p className="text-[9px] text-slate-400 mt-0.5">Last seen: 2 min ago</p>
                    </div>
                    <ArrowRight className="h-3 w-3 text-slate-300" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}