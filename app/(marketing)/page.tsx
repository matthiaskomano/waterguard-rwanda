"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Droplet,
  Shield,
  Leaf,
  LineChart,
  ArrowRight,
  Cpu,
  Database,
  MonitorSmartphone,
  Bell,
  Home,
  GraduationCap,
  Hotel,
  Building,
  CheckCircle,
} from "lucide-react";

const features = [
  {
    icon: Droplet,
    title: "Detect Leaks",
    description: "Early detection saves water and money.",
  },
  {
    icon: Shield,
    title: "Protect Property",
    description: "Prevent flooding and costly damage.",
  },
  {
    icon: Leaf,
    title: "Save Water",
    description: "Use water more responsibly.",
  },
  {
    icon: LineChart,
    title: "Track Usage",
    description: "Monitor consumption in real time.",
  },
];

const processSteps = [
  {
    icon: Droplet,
    title: "1. Sensors",
    description: "Detect water flow and unwanted moisture.",
  },
  {
    icon: Cpu,
    title: "2. ESP32 Device",
    description: "Reads sensor data and sends measurements over Wi-Fi.",
  },
  {
    icon: Database,
    title: "3. Supabase",
    description: "Stores data, manages users, and supports alert processing.",
  },
  {
    icon: MonitorSmartphone,
    title: "4. Dashboard",
    description: "Displays monitoring data, charts, and alerts.",
  },
  {
    icon: Bell,
    title: "5. Alerts & Valve",
    description: "Supports notifications and water shutoff integrations.",
  },
];

const audiences = [
  {
    icon: Home,
    title: "Homeowners",
    description: "Help keep your family and property safe.",
  },
  {
    icon: GraduationCap,
    title: "Schools",
    description: "Support safer and more efficient facilities.",
  },
  {
    icon: Hotel,
    title: "Hotels",
    description: "Monitor water systems and protect guest facilities.",
  },
  {
    icon: Building,
    title: "Businesses",
    description: "Help minimize disruption and reduce water waste.",
  },
];

const impactItems = [
  "Reduce avoidable water waste",
  "Help prevent costly property damage",
  "Promote responsible water management",
  "Support a more sustainable Rwanda",
];

export default function LandingPage() {
  const router = useRouter();
  
  useEffect(() => {
    const supabase = createClient();
    
    // Check if the URL contains an access token or type=invite right away
    // We pass the hash token ALONG to the update-password page so Supabase can read it
    if (window.location.hash.includes("access_token") || window.location.hash.includes("type=invite")) {
      router.push("/update-password" + window.location.hash);
      return;
    }

    // Also listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === "SIGNED_IN" || event === "INITIAL_SESSION") && session) {
        router.push("/update-password");
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="flex w-full min-w-0 flex-col items-center overflow-x-clip">
      {/* 1. HERO SECTION */}
      <section className="w-full overflow-hidden border-b bg-gradient-to-b from-blue-50 to-white py-12 dark:from-slate-950 dark:to-background sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-4 max-w-2xl text-xs font-bold uppercase leading-6 tracking-wider text-secondary sm:text-sm">
            Smart Water Monitoring for a Sustainable Rwanda
          </p>

          <div className="grid min-w-0 items-center gap-10 lg:grid-cols-2 lg:gap-12">
            {/* Hero Text */}
            <div className="min-w-0">
              <h1 className="mb-5 max-w-3xl break-words text-3xl font-extrabold leading-tight tracking-tight text-primary [overflow-wrap:anywhere] sm:text-4xl md:text-5xl lg:text-6xl">
                Detect Water Leaks Early. Protect Your Home, Property and Save
                Water.
              </h1>

              <p className="mb-7 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                WaterGuard Rwanda uses smart sensors and IoT technology to
                detect water leaks, monitor usage, and help prevent costly
                damage. Because every drop of water matters.
              </p>

              {/* Hero Buttons */}
              <div className="mb-10 flex w-full flex-col gap-3 sm:mb-12 sm:w-auto sm:flex-row sm:flex-wrap sm:gap-4">
                <Link href="/login" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    className="w-full rounded-full bg-secondary px-7 text-white hover:bg-secondary/90 sm:w-auto sm:px-8"
                  >
                    Sign In
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/how-it-works" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full rounded-full px-7 sm:w-auto sm:px-8"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>

              {/* Four Key Features */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-7 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 xl:grid-cols-4">
                {features.map((feature) => {
                  const Icon = feature.icon;

                  return (
                    <div
                      key={feature.title}
                      className="flex min-w-0 flex-col items-start gap-2"
                    >
                      <div className="rounded-xl bg-secondary/10 p-2.5">
                        <Icon className="h-6 w-6 text-secondary sm:h-7 sm:w-7" />
                      </div>

                      <h3 className="text-sm font-bold leading-5 sm:text-base">
                        {feature.title}
                      </h3>

                      <p className="text-xs leading-5 text-muted-foreground sm:text-sm">
                        {feature.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto w-full min-w-0 max-w-2xl">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border bg-slate-100 shadow-xl sm:aspect-[5/4] sm:rounded-3xl lg:aspect-[4/5] xl:aspect-[5/4]">
                <Image
                  src="/hero-mockup.png"
                  alt="WaterGuard Rwanda water monitoring device and mobile dashboard"
                  fill
                  priority
                  sizes="(max-width: 639px) 100vw, (max-width: 1023px) 90vw, (max-width: 1279px) 50vw, 600px"
                  className="object-cover"
                />
              </div>

              <div className="pointer-events-none absolute -bottom-4 -right-3 -z-10 h-24 w-24 rounded-full bg-cyan-200/50 blur-2xl sm:-right-5 sm:h-36 sm:w-36" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="w-full border-b bg-white py-14 dark:bg-background sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-w-0 items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
            {/* Section Introduction */}
            <div className="min-w-0 lg:col-span-4">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-secondary sm:text-sm">
                How It Works
              </p>

              <h2 className="mb-4 text-2xl font-extrabold leading-tight text-primary sm:text-3xl lg:text-4xl">
                Simple technology. Big impact.
              </h2>

              <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">
                WaterGuard Rwanda combines sensors, IoT devices, and a cloud
                platform to monitor your water system and help identify
                problems before they become costly.
              </p>

              <Link href="/how-it-works" className="inline-flex">
                <Button className="rounded-full bg-secondary text-white hover:bg-secondary/90">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Responsive Process Cards */}
            <div className="min-w-0 lg:col-span-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {processSteps.map((step) => {
                  const Icon = step.icon;

                  return (
                    <div
                      key={step.title}
                      className="flex min-w-0 items-start gap-4 rounded-2xl border border-border bg-background p-4 transition-shadow hover:shadow-md sm:flex-col sm:p-5"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 dark:border-slate-700 dark:bg-slate-800 sm:mb-1 sm:h-14 sm:w-14">
                        <Icon className="h-6 w-6 text-secondary sm:h-7 sm:w-7" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="mb-2 text-sm font-bold leading-5 sm:text-base">
                          {step.title}
                        </h3>

                        <p className="text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. WHO IS IT FOR? */}
      <section className="w-full border-b bg-slate-50 py-14 dark:bg-slate-900 sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid min-w-0 items-start gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* Audience Cards */}
            <div className="min-w-0">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-secondary sm:text-sm">
                Designed for You
              </p>

              <h2 className="mb-4 text-2xl font-extrabold leading-tight text-primary sm:text-3xl lg:text-4xl">
                Who Is It For?
              </h2>

              <p className="mb-8 max-w-xl text-sm leading-7 text-muted-foreground sm:mb-10 sm:text-base">
                From homes to large facilities, WaterGuard Rwanda helps people
                monitor water systems, identify leaks, and manage water more
                responsibly.
              </p>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                {audiences.map((audience) => {
                  const Icon = audience.icon;

                  return (
                    <div
                      key={audience.title}
                      className="flex min-w-0 items-start gap-4 rounded-2xl border border-border/70 bg-background p-4 sm:flex-col sm:p-5"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-slate-800 sm:mb-1 sm:h-12 sm:w-12">
                        <Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="mb-1 text-sm font-bold sm:text-base">
                          {audience.title}
                        </h3>

                        <p className="text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                          {audience.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Impact Card */}
            <div className="relative min-w-0 overflow-hidden rounded-2xl bg-secondary p-6 text-white shadow-xl sm:rounded-3xl sm:p-8 md:p-10 lg:p-12">
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

              <div className="relative z-10">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-blue-100 sm:text-sm">
                  Why WaterGuard
                </p>

                <h3 className="mb-6 text-2xl font-extrabold sm:text-3xl">
                  Our Impact
                </h3>

                <ul className="space-y-5">
                  {impactItems.map((item) => (
                    <li
                      key={item}
                      className="flex min-w-0 items-start gap-3 text-sm leading-6 sm:text-base"
                    >
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-200" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 border-t border-white/20 pt-6">
                  <p className="text-sm leading-6 text-blue-50">
                    Smarter monitoring can help households and organizations
                    make better-informed decisions about water use.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ABOUT US */}
      <section className="w-full bg-white py-14 dark:bg-background sm:py-16 lg:py-20">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto grid min-w-0 max-w-6xl items-center gap-8 sm:gap-10 md:grid-cols-2 lg:gap-14">
            {/* About Text */}
            <div className="min-w-0">
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-secondary sm:text-sm">
                About WaterGuard
              </p>

              <h2 className="mb-4 text-2xl font-extrabold leading-tight text-primary sm:text-3xl lg:text-4xl">
                Technology for a more sustainable Rwanda.
              </h2>

              <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">
                WaterGuard Rwanda is a Rwandan innovation built to address
                real-world water management challenges. We bring together
                sensors, software, and connected technology to help protect
                water, property, and communities.
              </p>

              <Link href="/about" className="inline-flex">
                <Button className="rounded-full bg-secondary text-white hover:bg-secondary/90">
                  Learn More
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>

            {/* Rwanda Image */}
            <div className="relative aspect-[4/3] w-full min-w-0 overflow-hidden rounded-2xl border bg-slate-100 shadow-md sm:rounded-3xl">
              <Image
                src="/rwanda-landscape.jpg"
                alt="Landscape of Rwanda"
                fill
                sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 560px"
                className="object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. FINAL CALL TO ACTION */}
      <section className="w-full border-t bg-blue-50 py-12 dark:bg-slate-950 sm:py-16">
        <div className="mx-auto w-full max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary/10">
            <Droplet className="h-7 w-7 text-secondary" />
          </div>

          <h2 className="mb-4 text-2xl font-extrabold leading-tight text-primary sm:text-3xl lg:text-4xl">
            Take a smarter approach to water monitoring.
          </h2>

          <p className="mx-auto mb-7 max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
            Explore the WaterGuard dashboard to monitor your properties,
            review alerts, and better understand water consumption.
          </p>

          <div className="flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link href="/login" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="w-full rounded-full bg-secondary px-8 text-white hover:bg-secondary/90 sm:w-auto"
              >
                Sign In to WaterGuard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="w-full rounded-full px-8 sm:w-auto"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}