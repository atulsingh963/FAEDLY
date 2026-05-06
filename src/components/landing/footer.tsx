import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Container } from "@/components/layout/container";

export function Footer() {
  return (
    <footer className="border-t border-border/40 bg-background pt-16 pb-8">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="col-span-1 md:col-span-1">
            <Link href="/" className="flex items-center space-x-2 mb-4 group inline-flex">
              <div className="bg-gradient-to-br from-violet-500 to-cyan-500 p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/70">
                FAEDLY
              </span>
            </Link>
            <p className="text-muted-foreground text-sm mb-6 max-w-xs">
              Your personalized AI tutor and smart practice engine. Elevate your learning experience.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </Link>
              <Link href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                LinkedIn
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Product</h3>
            <ul className="space-y-3">
              <li><Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">AI Models</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Changelog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Resources</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Community</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-foreground">Company</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FAEDLY Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            Built with <span className="text-rose-500">♥</span> for students everywhere.
          </div>
        </div>
      </Container>
    </footer>
  );
}
