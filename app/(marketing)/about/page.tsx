export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl text-center">
      <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-6">About WaterGuard Rwanda</h1>
      <p className="text-xl text-muted-foreground mb-8">
        WaterGuard Rwanda is an initiative built to address the critical need for intelligent water monitoring and leak prevention in modern infrastructure.
      </p>
      <div className="text-left space-y-6 text-lg text-muted-foreground bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border">
        <p>Our mission is to help households, businesses, and institutions in Rwanda reduce avoidable water waste, prevent costly property damage, and preserve our most vital natural resource.</p>
        <p>Designed and developed by Impact Tech Solutions Ltd, WaterGuard bridges the gap between physical plumbing and digital oversight through robust Internet of Things (IoT) hardware and a secure, cloud-based platform.</p>
      </div>
    </div>
  );
}