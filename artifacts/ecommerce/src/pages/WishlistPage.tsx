import { Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Link } from 'wouter';
import { MainLayout } from '../components/layout/MainLayout';
import { EmptyState } from '../components/common/EmptyState';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { StarRating } from '../components/common/StarRating';
import { Button } from '@/components/ui/button';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { useToast } from '@/hooks/use-toast';
import { products } from '../data/products';

export default function WishlistPage() {
  const { productIds, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();
  const { toast } = useToast();

  const wishlistProducts = products.filter((p) => productIds.includes(p.id));

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity: 1,
      selectedVariants: {},
    });
    toast({ title: 'Added to cart', description: `${product.name} added to your cart.` });
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-2">My Wishlist</h1>
        <p className="text-muted-foreground text-sm mb-8">{wishlistProducts.length} saved {wishlistProducts.length === 1 ? 'item' : 'items'}</p>

        {wishlistProducts.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="Your wishlist is empty"
            description="Save products you love by clicking the heart icon on any product."
            action={
              <Link href="/products">
                <Button data-testid="btn-browse-products">Browse Products</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                data-testid={`card-wishlist-${product.id}`}
                className="rounded-2xl border border-border bg-card overflow-hidden group"
              >
                <Link href={`/products/${product.id}`}>
                  <div className="relative overflow-hidden aspect-[3/4] bg-muted">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-4">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
                  <Link href={`/products/${product.id}`}>
                    <h3 className="font-medium text-sm mb-2 hover:text-primary cursor-pointer transition-colors">{product.name}</h3>
                  </Link>
                  <StarRating rating={product.rating} size="sm" className="mb-2" />
                  <PriceDisplay price={product.price} originalPrice={product.originalPrice} size="sm" className="mb-4" />
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 gap-1.5"
                      onClick={() => handleAddToCart(product.id)}
                      data-testid={`btn-cart-from-wishlist-${product.id}`}
                    >
                      <ShoppingBag size={14} />
                      Add to Cart
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeFromWishlist(product.id)}
                      data-testid={`btn-remove-wishlist-${product.id}`}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
