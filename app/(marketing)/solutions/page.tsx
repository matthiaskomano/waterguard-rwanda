export default function SolutionsPage() {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24 max-w-6xl">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-4">Solutions for Every Property</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Scalable architecture designed for residential and commercial needs across Rwanda.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="p-8 border rounded-2xl bg-card">
          <h2 className="text-2xl font-bold mb-4">Homes & Apartments</h2>
          <p className="text-muted-foreground mb-4">Protect your personal residence from unseen leaks while you are at work or on vacation. Monitor daily usage to lower your monthly utility bills.</p>
        </div>
        <div className="p-8 border rounded-2xl bg-card">
          <h2 className="text-2xl font-bold mb-4">Apartment Buildings & Real Estate</h2>
          <p className="text-muted-foreground mb-4">Manage multiple units from a single dashboard. Detect leaks in vacant apartments before they damage neighboring units.</p>
        </div>
        <div className="p-8 border rounded-2xl bg-card">
          <h2 className="text-2xl font-bold mb-4">Schools & Universities</h2>
          <p className="text-muted-foreground mb-4">Monitor expansive campus water networks. Identify fixtures left running in restrooms after hours, preserving critical water resources.</p>
        </div>
        <div className="p-8 border rounded-2xl bg-card">
          <h2 className="text-2xl font-bold mb-4">Hotels & Commercial Businesses</h2>
          <p className="text-muted-foreground mb-4">Ensure guest comfort while protecting your infrastructure. Our multi-property view allows your maintenance team to prioritize urgent repairs.</p>
        </div>
      </div>
    </div>
  );
}