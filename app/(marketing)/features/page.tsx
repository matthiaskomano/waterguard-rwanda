import { ShieldCheck, Activity, Droplets, BellRing, BarChart3, Settings2 } from 'lucide-react';

export default function FeaturesPage() {
  const features = [
    { icon: Activity, title: "Real-Time Telemetry", desc: "Monitor water flow rates and pressure instantly from your ESP32-connected hardware." },
    { icon: Droplets, title: "Micro-Leak Detection", desc: "Identify continuous low-flow events that indicate running toilets or dripping faucets." },
    { icon: ShieldCheck, title: "Catastrophic Leak Protection", desc: "Detect burst pipes based on sudden, massive flow spikes outside of normal usage patterns." },
    { icon: Settings2, title: "Remote Shutoff", desc: "Manually or automatically close motorized valves to stop water damage before you arrive." },
    { icon: BellRing, title: "Instant Alerts", desc: "Receive immediate notifications via the dashboard, SMS, or email when anomalies occur." },
    { icon: BarChart3, title: "Usage Analytics", desc: "Track historical consumption data to identify trends and reduce overall water waste." }
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-4">Platform Features</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Everything you need to monitor, manage, and protect your water infrastructure.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, idx) => (
          <div key={idx} className="p-6 border rounded-xl bg-card shadow-sm hover:shadow-md transition-shadow">
            <feature.icon className="h-10 w-10 text-secondary mb-4" />
            <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
            <p className="text-muted-foreground">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}