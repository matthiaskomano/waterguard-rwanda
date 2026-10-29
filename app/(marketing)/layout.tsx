
"use client";

import { useState } from "react";
import Link from "next/link";
import { Droplet, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navigationLinks = [
  { label: "Features", href: "/features" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Solutions", href: "/solutions" },
  { label: "Company", href: "/about" },
];

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <div className="flex min-h-screen w-full flex-col overflow-x-clip">
      {/* Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          {/* Brand */}
          <Link
            href="/"
            onClick={closeMobileMenu}
            className="group flex min-w-0 shrink items-center gap-2"
            aria-label="WaterGuard Rwanda home"
          >
            <div className="shrink-0 rounded-lg bg-secondary/10 p-1.5 transition-colors group-hover:bg-secondary/20">
              <Droplet className="h-6 w-6 text-secondary" />
            </div>

            <span className="whitespace-nowrap text-base font-bold tracking-tight text-primary sm:text-xl">
              WaterGuard{" "}
              <span className="font-light text-slate-500">Rwanda</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-5 lg:flex xl:gap-7"
          >
            {navigationLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Sign In and Mobile Menu Toggle */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <Link href="/login" className="hidden sm:inline-flex">
              <Button className="rounded-full bg-secondary px-5 text-white shadow-sm hover:bg-secondary/90">
                Sign In
              </Button>
            </Link>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-10 w-10 shrink-0 lg:hidden"
              onClick={() => setMobileMenuOpen((open) => !open)}
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-border bg-background shadow-lg lg:hidden"
          >
            <nav
              aria-label="Mobile navigation"
              className="mx-auto flex w-full max-w-7xl flex-col px-4 py-3 sm:px-6"
            >
              {navigationLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}

              <div className="mt-2 border-t border-border pt-3 sm:hidden">
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="block"
                >
                  <Button className="w-full rounded-full bg-secondary text-white hover:bg-secondary/90">
                    Sign In
                  </Button>
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMobileMenu}
                  className="mt-2 block rounded-full border border-border px-4 py-2.5 text-center text-sm font-medium transition-colors hover:bg-muted"
                >
                  Create Account
                </Link>
              </div>

              <div className="hidden gap-3 border-t border-border pt-3 sm:flex">
                <Link
                  href="/login"
                  onClick={closeMobileMenu}
                  className="flex-1"
                >
                  <Button className="w-full rounded-full bg-secondary text-white hover:bg-secondary/90">
                    Sign In
                  </Button>
                </Link>

                <Link
                  href="/signup"
                  onClick={closeMobileMenu}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full rounded-full">
                    Sign Up
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Public Page Content */}
      <main className="min-w-0 w-full flex-1">{children}</main>

      {/* Footer */}
      <footer className="w-full border-t bg-muted/20 pb-8 pt-12 sm:pt-16">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid grid-cols-2 gap-x-5 gap-y-10 sm:gap-8 lg:mb-16 lg:grid-cols-5 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 min-w-0 lg:col-span-2">
              <Link
                href="/"
                className="mb-4 inline-flex items-center gap-2"
              >
                <Droplet className="h-6 w-6 shrink-0 text-secondary" />

                <span className="text-lg font-bold tracking-tight text-primary sm:text-xl">
                  WaterGuard{" "}
                  <span className="font-light">Rwanda</span>
                </span>
              </Link>

              <p className="mb-6 max-w-sm text-sm leading-6 text-muted-foreground">
                Pioneering smart IoT water monitoring in Kigali. We combine
                hardware and software to detect leaks, prevent damage, and
                build a sustainable future.
              </p>

              {/* Social Links */}
              <div className="flex items-center gap-4">
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  className="text-muted-foreground transition-colors hover:text-secondary"
                >
                  <svg
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 24.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>

                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground transition-colors hover:text-secondary"
                >
                  <svg
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>

                <a
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="text-muted-foreground transition-colors hover:text-secondary"
                >
                  <svg
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div className="min-w-0">
              <h4 className="mb-4 font-semibold text-primary">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/features"
                    className="break-words transition-colors hover:text-secondary"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="break-words transition-colors hover:text-secondary"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/solutions"
                    className="transition-colors hover:text-secondary"
                  >
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link
                    href="/hardware"
                    className="transition-colors hover:text-secondary"
                  >
                    ESP32 Hardware
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company Links */}
            <div className="min-w-0">
              <h4 className="mb-4 font-semibold text-primary">Company</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/about"
                    className="transition-colors hover:text-secondary"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="transition-colors hover:text-secondary"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="transition-colors hover:text-secondary"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="transition-colors hover:text-secondary"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div className="col-span-2 min-w-0 sm:col-span-1 lg:col-span-1">
              <h4 className="mb-4 font-semibold text-primary">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>
                  <Link
                    href="/privacy"
                    className="transition-colors hover:text-secondary"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="transition-colors hover:text-secondary"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="/cookies"
                    className="transition-colors hover:text-secondary"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Footer Bottom Bar */}
          <div className="flex flex-col items-start gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between sm:pt-8">
            <p className="text-xs leading-5 text-muted-foreground">
              © 2026 Impact Tech Solutions Ltd. All rights reserved.
            </p>

            <a
              href="mailto:hello@waterguard.rw"
              className="flex min-w-0 items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-secondary"
            >
              <Mail className="h-4 w-4 shrink-0" />
              <span className="break-all">hello@waterguard.rw</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
