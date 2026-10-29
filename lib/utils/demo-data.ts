// src/lib/utils/demo-data.ts
export const DEMO_PROPERTIES = [
  { id: 'p1', name: 'Kigali Heights Office', type: 'Commercial', location: 'Gasabo, Kigali', devices: 3, status: 'Healthy' },
  { id: 'p2', name: 'Vision City Apartment A4', type: 'Residential', location: 'Gacuriro, Kigali', devices: 1, status: 'Warning' },
  { id: 'p3', name: 'Green Hills Academy', type: 'School', location: 'Nyarutarama, Kigali', devices: 5, status: 'Healthy' },
];

export const DEMO_DEVICES = [
  { id: 'd1', name: 'Main Inlet Valve', propertyId: 'p1', status: 'Online', battery: '100%', lastSeen: 'Just now' },
  { id: 'd2', name: 'Kitchen Sink Monitor', propertyId: 'p2', status: 'Online', battery: '85%', lastSeen: '2 mins ago' },
  { id: 'd3', name: 'Restroom Block B', propertyId: 'p3', status: 'Offline', battery: '0%', lastSeen: '4 hours ago' },
];

export const DEMO_ALERTS = [
  { id: 'a1', property: 'Vision City Apartment A4', device: 'Kitchen Sink Monitor', type: 'Micro-Leak Detected', severity: 'Medium', time: '10 mins ago', status: 'Investigating' },
  { id: 'a2', property: 'Green Hills Academy', device: 'Restroom Block B', type: 'Device Offline', severity: 'Low', time: '4 hours ago', status: 'Open' },
];

// Mock data for Recharts
export const DEMO_CONSUMPTION_DATA = [
  { time: '00:00', liters: 120 },
  { time: '04:00', liters: 80 },
  { time: '08:00', liters: 450 },
  { time: '12:00', liters: 520 },
  { time: '16:00', liters: 480 },
  { time: '20:00', liters: 310 },
  { time: '24:00', liters: 150 },
];