"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { Users, Building, Mail, Link as LinkIcon, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminClientsPage() {
  const [clients, setClients] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [isAssigning, setIsAssigning] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    setFetchError(null);
    
    // 1. Fetch properties
    const { data: propertiesData } = await supabase
      .from("properties")
      .select("*")
      .order("created_at", { ascending: false });

    // 2. Fetch clients from the public profiles table
    const { data: clientsData, error: clientsError } = await supabase
      .from("profiles")
      .select("*"); 

    if (clientsError) {
      console.error("Error fetching clients:", clientsError);
      setFetchError(clientsError.message);
    }

    setProperties(propertiesData || []);
    setClients(clientsData || []);
    setIsLoading(false);
  };

  const openAssignModal = (client: any) => {
    setSelectedClient(client);
    setSelectedPropertyId("");
    setSuccessMessage("");
    setIsModalOpen(true);
  };

  const handleAssignProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPropertyId || !selectedClient) return;
    
    setIsAssigning(true);

    const { error } = await supabase
      .from("properties")
      .update({ client_id: selectedClient.id })
      .eq("id", selectedPropertyId);

    if (!error) {
      setSuccessMessage("Property successfully assigned!");
      fetchData(); // Refresh data
      setTimeout(() => {
        setIsModalOpen(false);
        setSuccessMessage("");
      }, 2000);
    } else {
      console.error("Assignment error:", error.message);
    }
    
    setIsAssigning(false);
  };

  if (isLoading) {
    return <div className="flex h-full items-center justify-center p-12"><Loader2 className="h-8 w-8 animate-spin text-blue-600" /></div>;
  }

  return (
    <div className="space-y-6 p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Client Management</h1>
          <p className="text-sm text-slate-500">View registered clients and assign them to properties.</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white">
          <Users className="h-4 w-4 mr-2" />
          Invite New Client
        </Button>
      </div>

      {fetchError && (
        <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg text-sm">
          <strong>Database Error:</strong> {fetchError}
        </div>
      )}

      {/* Clients Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold">Client Details</th>
              <th className="px-6 py-4 font-semibold">Assigned Properties</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {clients.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                  No clients found in the profiles table. 
                </td>
              </tr>
            ) : clients.map((client) => {
              const clientProperties = properties.filter(p => p.client_id === client.id);
              
              return (
                <tr key={client.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900">{client.full_name || client.name || "Unnamed Client"}</div>
                    <div className="text-slate-500 flex items-center mt-1">
                      <Mail className="h-3 w-3 mr-1" /> {client.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {clientProperties.length > 0 ? (
                      <div className="flex flex-col gap-1">
                        {clientProperties.map(p => (
                          <span key={p.id} className="inline-flex items-center text-xs font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded-md w-fit">
                            <Building className="h-3 w-3 mr-1" /> {p.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">No properties assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => openAssignModal(client)}
                      className="border-blue-200 text-blue-600 hover:bg-blue-50"
                    >
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Assign Property
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Assignment Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md border border-slate-200 flex flex-col overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="font-bold text-lg text-slate-900">Assign Property</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form onSubmit={handleAssignProperty} className="p-6 space-y-5 flex-1">
              {successMessage ? (
                <div className="p-4 bg-green-50 text-green-700 rounded-lg text-sm font-medium flex items-center">
                  {successMessage}
                </div>
              ) : (
                <>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Assigning to:</label>
                    <div className="p-3 bg-slate-50 rounded-lg text-sm font-semibold text-slate-900 border border-slate-200">
                      {selectedClient?.full_name || selectedClient?.name || selectedClient?.email}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Select Property</label>
                    <select 
                      required
                      className="w-full border border-slate-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                      value={selectedPropertyId}
                      onChange={(e) => setSelectedPropertyId(e.target.value)}
                    >
                      <option value="">-- Select a property --</option>
                      {properties.map(p => (
                        <option key={p.id} value={p.id} disabled={p.client_id === selectedClient.id}>
                          {p.name} {p.client_id ? "(Already Assigned)" : "(Unassigned)"}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="pt-4 flex gap-3 border-t border-slate-100">
                    <Button type="button" variant="outline" className="w-full" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isAssigning || !selectedPropertyId}>
                      {isAssigning ? "Assigning..." : "Confirm Assignment"}
                    </Button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}