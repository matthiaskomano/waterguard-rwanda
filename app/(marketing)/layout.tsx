import Link from 'next/link';
import { Droplet, Mail, Menu } from 'lucide-react'; // Removed the missing brand icons
import { Button } from '@/components/ui/button';

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="bg-secondary/10 p-1.5 rounded-lg group-hover:bg-secondary/20 transition-colors">
              <Droplet className="h-6 w-6 text-secondary" />
            </div>
            <span className="text-xl font-bold tracking-tight text-primary">
              WaterGuard <span className="font-light text-slate-500">Rwanda</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex gap-6">
            <Link href="/features" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Features</Link>
            <Link href="/how-it-works" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">How It Works</Link>
            <Link href="/solutions" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Solutions</Link>
            <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Company</Link>
          </nav>

          <div className="flex items-center space-x-4">
            <Link href="/login" className="hidden sm:block">
              <Button className="bg-secondary text-white hover:bg-secondary/90 shadow-sm rounded-full px-6">
                Sign In
              </Button>
            </Link>
            {/* Mobile Menu Toggle */}
            <Button variant="ghost" size="icon" className="md:hidden text-slate-600">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Enterprise Footer */}
      <footer className="border-t bg-muted/20 pt-16 pb-8">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="col-span-2 lg:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <Droplet className="h-6 w-6 text-secondary" />
                <span className="text-xl font-bold tracking-tight text-primary">
                  WaterGuard <span className="font-light">Rwanda</span>
                </span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
                Pioneering smart IoT water monitoring in Kigali. We combine hardware and software to detect leaks, prevent damage, and build a sustainable future.
              </p>
              <div className="flex space-x-4">
                {/* Custom SVG for Twitter/X */}
                <Link href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </Link>
                {/* Custom SVG for LinkedIn */}
                <Link href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </Link>
                {/* Custom SVG for GitHub */}
                <Link href="#" className="text-muted-foreground hover:text-secondary transition-colors">
                  <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </Link>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="font-semibold text-primary mb-4">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/features" className="hover:text-secondary transition-colors">Features</Link></li>
                <li><Link href="/how-it-works" className="hover:text-secondary transition-colors">How It Works</Link></li>
                <li><Link href="/solutions" className="hover:text-secondary transition-colors">Solutions</Link></li>
                <li><Link href="/hardware" className="hover:text-secondary transition-colors">ESP32 Hardware</Link></li>
              </ul>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="font-semibold text-primary mb-4">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-secondary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-secondary transition-colors">Contact</Link></li>
                <li><Link href="/careers" className="hover:text-secondary transition-colors">Careers</Link></li>
                <li><Link href="/blog" className="hover:text-secondary transition-colors">Blog</Link></li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold text-primary mb-4">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><Link href="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-secondary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-border">
            <p className="text-xs text-muted-foreground mb-4 md:mb-0">
              © 2026 Impact Tech Solutions Ltd. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Mail className="h-4 w-4" />
              <span>hello@waterguard.rw</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}