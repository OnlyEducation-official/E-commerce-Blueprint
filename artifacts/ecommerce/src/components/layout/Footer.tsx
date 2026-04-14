import { useState } from 'react';
import { Link } from 'wouter';
import { Instagram, Twitter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="lg:col-span-1">
            <p className="text-xl font-bold tracking-[0.2em] mb-4">LUXE</p>
            <p className="text-sm text-background/60 leading-relaxed">
              Premium fashion and lifestyle essentials, thoughtfully curated. Committed to quality materials and timeless design.
            </p>
            <div className="flex gap-3 mt-6">
              <a href="#" className="text-background/60 hover:text-background transition-colors" data-testid="link-instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-background/60 hover:text-background transition-colors" data-testid="link-twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider mb-4 uppercase">Shop</h4>
            <ul className="space-y-3">
              {[
                { label: 'Women', href: '/products?category=Women' },
                { label: 'Men', href: '/products?category=Men' },
                { label: 'Accessories', href: '/products?category=Accessories' },
                { label: 'Shoes', href: '/products?category=Shoes' },
                { label: 'Home', href: '/products?category=Home' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-background/60 hover:text-background transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider mb-4 uppercase">Help</h4>
            <ul className="space-y-3">
              {[
                { label: 'About Us', href: '/about' },
                { label: 'Contact', href: '/contact' },
                { label: 'Returns & Exchanges', href: '/returns' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Privacy Policy', href: '/privacy' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <span className="text-sm text-background/60 hover:text-background transition-colors cursor-pointer">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-wider mb-4 uppercase">Newsletter</h4>
            <p className="text-sm text-background/60 mb-4 leading-relaxed">
              Thoughtful updates on new arrivals, exclusive offers, and the stories behind our pieces.
            </p>
            {subscribed ? (
              <p className="text-sm text-background/80 font-medium">Thank you for subscribing.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="bg-white/10 border-white/20 text-background placeholder:text-background/40 text-sm"
                  required
                  data-testid="input-newsletter-email"
                />
                <Button
                  type="submit"
                  size="sm"
                  className="bg-background text-foreground hover:bg-background/90 shrink-0"
                  data-testid="btn-newsletter-subscribe"
                >
                  Join
                </Button>
              </form>
            )}
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} Luxe. All rights reserved.
          </p>
          <p className="text-xs text-background/40">
            Free shipping on orders over $150. Easy returns within 30 days.
          </p>
        </div>
      </div>
    </footer>
  );
};
