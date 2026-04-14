import { cn } from '@/lib/utils';

interface PriceDisplayProps {
  price: number;
  originalPrice?: number;
  discount?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const PriceDisplay = ({ price, originalPrice, discount, size = 'md', className }: PriceDisplayProps) => {
  const priceClass = size === 'sm' ? 'text-sm' : size === 'md' ? 'text-base' : 'text-xl';

  return (
    <div className={cn('flex items-baseline gap-2 flex-wrap', className)}>
      <span className={cn('font-semibold text-foreground', priceClass)}>
        ${price.toFixed(2)}
      </span>
      {originalPrice && originalPrice > price && (
        <span className={cn('text-muted-foreground line-through', size === 'sm' ? 'text-xs' : 'text-sm')}>
          ${originalPrice.toFixed(2)}
        </span>
      )}
      {discount && discount > 0 && (
        <span className="text-xs font-medium bg-red-50 text-red-600 px-1.5 py-0.5 rounded">
          -{discount}%
        </span>
      )}
    </div>
  );
};
