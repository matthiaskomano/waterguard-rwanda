import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { 
  Droplet, Shield, Leaf, LineChart, ArrowRight, 
  Cpu, Database, MonitorSmartphone, Bell, 
  Home, GraduationCap, Hotel, Building, CheckCircle 
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center w-full">
      
      {/* 1. HERO SECTION */}
      <section className="w-full pt-12 pb-20 bg-gradient-to-b from-blue-50 to-white dark:from-slate-950 dark:to-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-sm font-semibold text-secondary mb-4 tracking-wider uppercase">
            Smart Water Monitoring for a Sustainable Rwanda
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column: Text & CTA */}
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-primary leading-tight mb-6">
                Detect Water Leaks Early. Protect Your Home, Property and Save Water.
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                WaterGuard Rwanda uses smart sensors and IoT technology to detect water leaks, monitor usage and prevent costly damage. Because every drop of water matters.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                {/* REMOVED GET STARTED (SIGNUP), REPLACED WITH SIGN IN ONLY */}
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto bg-secondary hover:bg-secondary/90 text-white rounded-full px-8">
                    Sign In <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/how-it-works">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto rounded-full px-8">
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* 4 Feature Icons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div className="flex flex-col space-y-2">
                  <Droplet className="h-8 w-8 text-secondary" />
                  <h3 className="font-bold text-sm">Detect Leaks</h3>
                  <p className="text-xs text-muted-foreground">Early detection saves water and money</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Shield className="h-8 w-8 text-secondary" />
                  <h3 className="font-bold text-sm">Protect Property</h3>
                  <p className="text-xs text-muted-foreground">Prevent flooding and costly damage</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <Leaf className="h-8 w-8 text-secondary" />
                  <h3 className="font-bold text-sm">Save Water</h3>
                  <p className="text-xs text-muted-foreground">Use water more responsibly</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <LineChart className="h-8 w-8 text-secondary" />
                  <h3 className="font-bold text-sm">Track Usage</h3>
                  <p className="text-xs text-muted-foreground">Monitor consumption in real time</p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Mockup */}
            <div className="relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl border">
              <Image 
                src="/hero-mockup.png" 
                alt="WaterGuard Rwanda App and Device Mockup" 
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS SECTION */}
      <section className="w-full py-20 bg-white dark:bg-background border-t">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">How It Works</h2>
              <h3 className="text-xl font-semibold mb-4">Simple technology. Big impact.</h3>
              <p className="text-muted-foreground mb-8">
                WaterGuard Rwanda combines sensors, IoT devices, and a cloud platform to monitor your water system and alert you before small issues become big problems.
              </p>
              <Link href="/how-it-works">
                <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full">
                  Learn More <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="lg:col-span-8 overflow-x-auto pb-4">
              <div className="flex items-start justify-between min-w-[600px] gap-4 text-center">
                {[
                  { icon: Droplet, title: "1. Sensors", desc: "Detect water flow and unwanted moisture." },
                  { icon: Cpu, title: "2. ESP32 Device", desc: "Reads sensors, checks for leaks and sends data via Wi-Fi." },
                  { icon: Database, title: "3. Supabase", desc: "Stores data, manages users and processes alerts." },
                  { icon: MonitorSmartphone, title: "4. Dashboard", desc: "Displays live data, charts and alerts in real time." },
                  { icon: Bell, title: "5. Notifications & Valve", desc: "Sends SMS/app alerts and can shut off the water supply." }
                ].map((step, idx) => (
                  <div key={idx} className="flex flex-col items-center flex-1">
                    <div className="h-16 w-16 rounded-full bg-blue-50 dark:bg-slate-800 flex items-center justify-center mb-4 border border-blue-100 dark:border-slate-700">
                      <step.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <h4 className="font-bold text-sm mb-2">{step.title}</h4>
                    <p className="text-xs text-muted-foreground">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHO IS IT FOR? SECTION */}
      <section className="w-full py-20 bg-slate-50 dark:bg-slate-900 border-t">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">Who Is It For?</h2>
              <p className="text-muted-foreground mb-10">
                From homes to large facilities, WaterGuard Rwanda is designed for everyone.
              </p>
              
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Home className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Homeowners</h4>
                  <p className="text-sm text-muted-foreground">Keep your family and property safe.</p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Schools</h4>
                  <p className="text-sm text-muted-foreground">Ensure a safe and healthy environment.</p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Hotel className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Hotels</h4>
                  <p className="text-sm text-muted-foreground">Protect your guests and facilities.</p>
                </div>
                <div>
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <Building className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="font-bold mb-2">Businesses</h4>
                  <p className="text-sm text-muted-foreground">Minimize downtime and reduce costs.</p>
                </div>
              </div>
            </div>

            {/* Our Impact Card */}
            <div className="bg-secondary rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Our Impact</h3>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-blue-200" /> Reduce avoidable water waste</li>
                  <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-blue-200" /> Prevent costly property damage</li>
                  <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-blue-200" /> Promote responsible water management</li>
                  <li className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-blue-200" /> Build a more sustainable Rwanda</li>
                </ul>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 4. ABOUT US SECTION */}
      <section className="w-full py-20 bg-white dark:bg-background border-t">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-extrabold text-primary mb-4">About Us</h2>
              <p className="text-muted-foreground mb-8">
                WaterGuard Rwanda is a Rwandan innovation built to solve real problems. We are a team of engineers, designers and problem-solvers, passionate about using technology to protect water, property and communities.
              </p>
              <Link href="/about">
                <Button className="bg-secondary hover:bg-secondary/90 text-white rounded-full">
                  Learn More
                </Button>
              </Link>
            </div>
            
            <div className="relative h-64 w-full rounded-2xl overflow-hidden border shadow-inner">
               <Image 
                 src="/rwanda-landscape.jpg" 
                 alt="Rwanda Landscape" 
                 fill
                 className="object-cover"
               />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}