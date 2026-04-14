import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  min?: number;
  max?: number;
  className?: string;
}

export const QuantitySelector = ({
  quantity,
  onDecrease,
  onIncrease,
  min = 1,
  max = 99,
  className,
}: QuantitySelectorProps) => {
  return (
    <div className={cn('flex items-center border border-border rounded-xl overflow-hidden w-fit', className)}>
      <button
        data-testid="btn-quantity-decrease"
        onClick={onDecrease}
        disabled={quantity <= min}
        className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Minus size={14} />
      </button>
      <span
        data-testid="text-quantity"
        className="w-12 text-center text-sm font-medium border-x border-border py-2"
      >
        {quantity}
      </span>
      <button
        data-testid="btn-quantity-increase"
        onClick={onIncrease}
        disabled={quantity >= max}
        className="w-10 h-10 flex items-center justify-center hover:bg-muted transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
      >
        <Plus size={14} />
      </button>
    </div>
  );
};
