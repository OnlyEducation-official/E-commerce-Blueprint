import { Link } from 'wouter';
import { ArrowRight, Truck, RotateCcw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MainLayout } from '../components/layout/MainLayout';
import { ProductCard } from '../components/common/ProductCard';
import { getFeaturedProducts, getBestsellers, getNewArrivals, categories } from '../data/products';

const categoryImages: Record<string, string> = {
  Women: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=600&q=80',
  Men: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  Accessories: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80',
  Shoes: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?w=600&q=80',
  Home: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80',
};

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 4);
  const bestsellers = getBestsellers().slice(0, 4);
  const newArrivals = getNewArrivals().slice(0, 4);

  return (
    <MainLayout>
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-stone-100 to-stone-200 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
          <div className="max-w-xl">
            <p className="text-sm font-medium tracking-[0.3em] uppercase text-primary mb-4">
              New Season Collection
            </p>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
              Designed for the
              <br />
              <span className="text-primary">considered life.</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md">
              Premium essentials crafted with intention. Quality materials, timeless silhouettes, and pieces that earn their place in your wardrobe for years.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link href="/products">
                <Button size="lg" className="rounded-full px-8" data-testid="btn-shop-now">
                  Shop Now
                  <ArrowRight size={16} className="ml-2" />
                </Button>
              </Link>
              <Link href="/products?sort=newest">
                <Button size="lg" variant="outline" className="rounded-full px-8" data-testid="btn-new-arrivals">
                  New Arrivals
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((cat) => (
              <Link key={cat} href={`/products?category=${cat}`}>
                <div
                  data-testid={`link-category-${cat}`}
                  className="group relative rounded-2xl overflow-hidden aspect-square cursor-pointer"
                >
                  <img
                    src={categoryImages[cat]}
                    alt={cat}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-foreground/30 group-hover:bg-foreground/40 transition-colors" />
                  <div className="absolute inset-0 flex items-end p-4">
                    <span className="text-background font-semibold text-sm tracking-wide">{cat}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold">Featured Pieces</h2>
            <Link href="/products?sort=featured">
              <Button variant="ghost" size="sm" className="gap-1" data-testid="link-all-featured">
                View All <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">New Arrivals</h2>
              <p className="text-muted-foreground text-sm mt-1">Just landed this season</p>
            </div>
            <Link href="/products?sort=newest">
              <Button variant="ghost" size="sm" className="gap-1" data-testid="link-all-new">
                View All <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Bestsellers</h2>
              <p className="text-muted-foreground text-sm mt-1">Our most-loved pieces</p>
            </div>
            <Link href="/products?sort=rating">
              <Button variant="ghost" size="sm" className="gap-1" data-testid="link-all-bestsellers">
                View All <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {bestsellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Truck size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Free Shipping</h3>
                <p className="text-xs text-muted-foreground">On all orders over $150. Free returns on every order.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <RotateCcw size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Easy Returns</h3>
                <p className="text-xs text-muted-foreground">30-day hassle-free returns. No questions asked.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                <Shield size={18} className="text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm mb-1">Secure Checkout</h3>
                <p className="text-xs text-muted-foreground">SSL encrypted. Your information is always protected.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">Join the Luxe Community</h2>
          <p className="text-primary-foreground/80 mb-8">
            Be the first to know about new arrivals, exclusive offers, and the stories behind our pieces.
          </p>
          <form
            className="flex gap-3 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-sm border-0 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/50 outline-none focus:ring-2 ring-white/30"
              data-testid="input-footer-email"
            />
            <Button
              type="submit"
              variant="secondary"
              className="rounded-xl px-6 bg-background text-foreground hover:bg-background/90"
              data-testid="btn-footer-subscribe"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
}
