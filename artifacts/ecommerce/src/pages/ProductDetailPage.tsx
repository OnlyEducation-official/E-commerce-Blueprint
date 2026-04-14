import { useState } from 'react';
import { useParams, Link, useLocation } from 'wouter';
import { Heart, ShoppingBag, Zap, ChevronDown } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { ImageGallery } from '../components/product/ImageGallery';
import { VariantSelector } from '../components/product/VariantSelector';
import { QuantitySelector } from '../components/product/QuantitySelector';
import { RelatedProducts } from '../components/product/RelatedProducts';
import { StarRating } from '../components/common/StarRating';
import { PriceDisplay } from '../components/common/PriceDisplay';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { useToast } from '@/hooks/use-toast';
import { getProductById, getRelatedProducts } from '../data/products';
import { cn } from '@/lib/utils';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { addItem } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { toast } = useToast();

  const product = getProductById(id);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link href="/products">
            <Button>Browse All Products</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const related = getRelatedProducts(product, 4);
  const wishlisted = isWishlisted(product.id);
  const hasSizes = product.variants.some((v) => v.type === 'size');
  const hasColors = product.variants.some((v) => v.type === 'color');

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      toast({ title: 'Please select a size', variant: 'destructive' });
      return;
    }
    if (hasColors && !selectedColor) {
      toast({ title: 'Please select a color', variant: 'destructive' });
      return;
    }

    const selectedVariants: Record<string, string> = {};
    if (selectedSize) selectedVariants['size'] = selectedSize;
    if (selectedColor) selectedVariants['color'] = selectedColor;

    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      selectedVariants,
    });

    toast({ title: 'Added to cart', description: `${product.name} has been added to your cart.` });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setLocation('/checkout');
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/">
            <span className="hover:text-foreground cursor-pointer">Home</span>
          </Link>
          <span>/</span>
          <Link href="/products">
            <span className="hover:text-foreground cursor-pointer">Products</span>
          </Link>
          <span>/</span>
          <Link href={`/products?category=${product.category}`}>
            <span className="hover:text-foreground cursor-pointer">{product.category}</span>
          </Link>
          <span>/</span>
          <span className="text-foreground font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div>
            <ImageGallery images={product.images} name={product.name} />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{product.category}</p>
                  <h1 className="text-2xl font-bold" data-testid="text-product-name">{product.name}</h1>
                </div>
                <button
                  data-testid="btn-wishlist-toggle"
                  onClick={() => toggleWishlist(product.id)}
                  className={cn(
                    'w-10 h-10 rounded-full border flex items-center justify-center shrink-0 transition-all duration-200',
                    wishlisted
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary text-muted-foreground hover:text-primary'
                  )}
                >
                  <Heart size={18} className={wishlisted ? 'fill-current' : ''} />
                </button>
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
                {product.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                {product.bestseller && <Badge variant="secondary">Bestseller</Badge>}
              </div>
            </div>

            <PriceDisplay
              price={product.price}
              originalPrice={product.originalPrice}
              discount={product.discount}
              size="lg"
            />

            <p className="text-sm text-muted-foreground leading-relaxed" data-testid="text-product-description">
              {product.description}
            </p>

            <Separator />

            <div className="space-y-4">
              {hasSizes && (
                <VariantSelector
                  variants={product.variants}
                  type="size"
                  selected={selectedSize}
                  onSelect={setSelectedSize}
                />
              )}
              {hasColors && (
                <VariantSelector
                  variants={product.variants}
                  type="color"
                  selected={selectedColor}
                  onSelect={setSelectedColor}
                />
              )}
            </div>

            <div className="flex items-center gap-4">
              <QuantitySelector
                quantity={quantity}
                onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
                onIncrease={() => setQuantity((q) => q + 1)}
              />
              <p className="text-xs text-muted-foreground">In stock</p>
            </div>

            <div className="flex gap-3">
              <Button
                className="flex-1 h-12 gap-2 rounded-xl"
                onClick={handleAddToCart}
                data-testid="btn-add-to-cart"
              >
                <ShoppingBag size={18} />
                Add to Cart
              </Button>
              <Button
                variant="secondary"
                className="flex-1 h-12 gap-2 rounded-xl"
                onClick={handleBuyNow}
                data-testid="btn-buy-now"
              >
                <Zap size={18} />
                Buy Now
              </Button>
            </div>

            <Accordion type="single" collapsible className="mt-4">
              <AccordionItem value="description">
                <AccordionTrigger className="text-sm font-medium">Product Details</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                  <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                    <li>Category: {product.category}</li>
                    {product.tags.map((tag) => (
                      <li key={tag} className="capitalize">{tag}</li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger className="text-sm font-medium">Shipping & Delivery</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Free standard shipping on orders over $150</li>
                    <li>Standard delivery: 3-5 business days</li>
                    <li>Express delivery: 1-2 business days ($12)</li>
                    <li>International shipping available to 40+ countries</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="returns">
                <AccordionTrigger className="text-sm font-medium">Returns & Exchanges</AccordionTrigger>
                <AccordionContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>30-day free returns on all orders</li>
                    <li>Items must be unworn and in original packaging</li>
                    <li>Exchanges can be processed for different sizes or colors</li>
                    <li>Refunds processed within 5-7 business days</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        {product.reviews.length > 0 && (
          <section className="mb-16">
            <h2 className="text-xl font-bold mb-6">Customer Reviews</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-medium text-sm">{review.author}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} size="sm" />
                  </div>
                  <p className="text-sm text-muted-foreground">{review.comment}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <RelatedProducts products={related} />
      </div>
    </MainLayout>
  );
}
