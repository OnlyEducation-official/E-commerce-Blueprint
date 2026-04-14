import { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { ShoppingBag, Heart, User, Search, Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

const navLinks = [
  { label: 'Shop', href: '/products' },
  { label: 'Women', href: '/products?category=Women' },
  { label: 'Men', href: '/products?category=Men' },
  { label: 'Accessories', href: '/products?category=Accessories' },
  { label: 'Sale', href: '/products?sort=price-asc' },
];

export const Navbar = () => {
  const { totalItems } = useCart();
  const { count: wishlistCount } = useWishlist();
  const { user, isLoggedIn, signOut } = useAuth();
  const [, setLocation] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <button
              className="md:hidden p-1"
              onClick={() => setMenuOpen(!menuOpen)}
              data-testid="btn-menu-toggle"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <Link href="/">
              <span
                data-testid="link-logo"
                className="text-xl font-bold tracking-[0.2em] text-foreground cursor-pointer hover:text-primary transition-colors"
              >
                LUXE
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    data-testid={`link-nav-${link.label.toLowerCase()}`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {searchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center gap-2">
                <Input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-52 h-8 text-sm"
                  data-testid="input-search"
                />
                <Button type="submit" variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Search size={16} />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={() => setSearchOpen(false)}
                  data-testid="btn-search-close"
                >
                  <X size={16} />
                </Button>
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="btn-search-open"
              >
                <Search size={20} />
              </button>
            )}

            <Link href="/wishlist">
              <button
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span
                    data-testid="badge-wishlist-count"
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                  >
                    {wishlistCount > 9 ? '9+' : wishlistCount}
                  </span>
                )}
              </button>
            </Link>

            <Link href="/cart">
              <button
                className="relative p-2 text-muted-foreground hover:text-foreground transition-colors"
                data-testid="link-cart"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span
                    data-testid="badge-cart-count"
                    className="absolute -top-0.5 -right-0.5 w-4 h-4 text-[10px] font-bold rounded-full bg-primary text-primary-foreground flex items-center justify-center"
                  >
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </button>
            </Link>

            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-1.5 px-2" data-testid="btn-profile-dropdown">
                    <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-xs font-semibold text-primary-foreground">
                      {user?.firstName?.[0]}{user?.lastName?.[0]}
                    </div>
                    <ChevronDown size={14} className="text-muted-foreground hidden sm:block" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user?.firstName} {user?.lastName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <span className="w-full cursor-pointer" data-testid="link-profile">Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">
                      <span className="w-full cursor-pointer" data-testid="link-orders">My Orders</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="text-destructive" data-testid="btn-signout">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="gap-1.5" data-testid="link-signin">
                  <User size={18} />
                  <span className="hidden sm:block text-sm">Sign In</span>
                </Button>
              </Link>
            )}
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden border-t border-border py-4">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="text-sm py-1 text-foreground hover:text-primary transition-colors cursor-pointer block"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};
