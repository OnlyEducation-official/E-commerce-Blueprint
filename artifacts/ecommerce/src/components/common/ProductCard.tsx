import { Link } from 'wouter';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Product } from '../../types/product';
import { useWishlist } from '../../hooks/useWishlist';
import { StarRating } from './StarRating';
import { PriceDisplay } from './PriceDisplay';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export const ProductCard = ({ product, className }: ProductCardProps) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <Link href={`/products/${product.id}`}>
      <div
        data-testid={`card-product-${product.id}`}
        className={cn(
          'group rounded-2xl overflow-hidden border border-border bg-card hover:shadow-lg transition-all duration-300 cursor-pointer',
          className
        )}
      >
        <div className="relative overflow-hidden aspect-[3/4] bg-muted">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <button
            data-testid={`btn-wishlist-${product.id}`}
            onClick={handleWishlist}
            className={cn(
              'absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200',
              wishlisted
                ? 'bg-primary text-primary-foreground'
                : 'bg-white/90 text-foreground hover:bg-white'
            )}
          >
            <Heart size={16} className={wishlisted ? 'fill-current' : ''} />
          </button>
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="text-xs bg-primary text-primary-foreground">New</Badge>
            )}
            {product.discount && product.discount > 0 && (
              <Badge variant="destructive" className="text-xs">-{product.discount}%</Badge>
            )}
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{product.category}</p>
          <h3 className="font-medium text-foreground text-sm leading-tight mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} size="sm" className="mb-2" />
          <PriceDisplay
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            size="sm"
          />
        </div>
      </div>
    </Link>
  );
};
