import { Cpu, Wifi, Cloud, Smartphone } from 'lucide-react';

export default function HowItWorksPage() {
  const steps = [
    { icon: Cpu, title: "1. Hardware Installation", desc: "A licensed technician installs our ESP32-based monitoring unit and sensors directly onto your main water supply line." },
    { icon: Wifi, title: "2. Secure Connection", desc: "The device connects to your local Wi-Fi, establishing a secure, encrypted telemetry stream to our cloud infrastructure." },
    { icon: Cloud, title: "3. Cloud Analysis", desc: "Our backend continuously analyzes your flow data against configurable thresholds and debounce periods to filter out false alarms." },
    { icon: Smartphone, title: "4. Alerts & Control", desc: "If a leak is confirmed, you receive an alert. If authorized, the system can automatically command the valve to shut off the water." }
  ];

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-5xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-4">How It Works</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">From the pipe to your pocket. A seamless IoT monitoring process.</p>
      </div>
      <div className="space-y-12">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col md:flex-row items-center gap-6 md:gap-12">
            <div className="flex-shrink-0 h-24 w-24 rounded-full bg-blue-50 flex items-center justify-center border-2 border-secondary/20">
              <step.icon className="h-10 w-10 text-secondary" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
              <p className="text-lg text-muted-foreground">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}