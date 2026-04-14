import { cn } from '@/lib/utils';
import { Variant } from '../../types/product';

interface VariantSelectorProps {
  variants: Variant[];
  type: 'size' | 'color';
  selected: string | null;
  onSelect: (value: string) => void;
}

const COLOR_MAP: Record<string, string> = {
  'Black': 'bg-gray-900',
  'White': 'bg-white border-gray-300',
  'Navy': 'bg-blue-900',
  'Camel': 'bg-amber-600',
  'Ivory': 'bg-amber-50 border-gray-300',
  'Cognac': 'bg-amber-800',
  'Blush': 'bg-pink-200',
  'Sage': 'bg-green-600',
  'Oatmeal': 'bg-stone-300',
  'Charcoal': 'bg-gray-600',
  'Rust': 'bg-orange-700',
  'Ecru': 'bg-stone-100 border-gray-300',
  'Cream': 'bg-amber-50 border-gray-200',
  'Forest Green': 'bg-green-800',
  'Champagne': 'bg-yellow-100 border-gray-300',
  'Burgundy': 'bg-red-900',
  'Cobalt': 'bg-blue-700',
  'Stone': 'bg-stone-400',
  'Light Blue': 'bg-blue-300',
  'Pink': 'bg-pink-400',
  'Clay': 'bg-orange-400',
  'Olive': 'bg-olive-600',
  'Chocolate': 'bg-amber-900',
  'Dusty Rose': 'bg-rose-300',
  'Tan': 'bg-yellow-700',
  'Dark Brown': 'bg-yellow-900',
  'Terracotta': 'bg-orange-600',
  'Speckled White': 'bg-stone-100 border-gray-300',
  'Sage Green': 'bg-green-500',
};

export const VariantSelector = ({ variants, type, selected, onSelect }: VariantSelectorProps) => {
  const filteredVariants = variants.filter((v) => v.type === type);

  if (filteredVariants.length === 0) return null;

  return (
    <div>
      <p className="text-sm font-medium mb-2 text-foreground capitalize">{type}</p>
      <div className="flex flex-wrap gap-2">
        {filteredVariants.map((variant) => {
          const isOutOfStock = variant.stock === 0;
          const isSelected = selected === variant.value;

          if (type === 'color') {
            const colorClass = COLOR_MAP[variant.value] || 'bg-gray-400';
            return (
              <button
                key={variant.id}
                data-testid={`btn-variant-color-${variant.value}`}
                onClick={() => !isOutOfStock && onSelect(variant.value)}
                disabled={isOutOfStock}
                title={variant.value}
                className={cn(
                  'w-8 h-8 rounded-full border-2 transition-all duration-200',
                  colorClass,
                  isSelected ? 'border-primary ring-2 ring-primary ring-offset-2' : 'border-border',
                  isOutOfStock ? 'opacity-30 cursor-not-allowed' : 'cursor-pointer hover:scale-110'
                )}
              />
            );
          }

          return (
            <button
              key={variant.id}
              data-testid={`btn-variant-size-${variant.value}`}
              onClick={() => !isOutOfStock && onSelect(variant.value)}
              disabled={isOutOfStock}
              className={cn(
                'px-3 py-1.5 text-sm rounded-lg border transition-all duration-200',
                isSelected
                  ? 'border-primary bg-primary text-primary-foreground font-medium'
                  : 'border-border hover:border-primary/60 bg-card',
                isOutOfStock ? 'opacity-30 cursor-not-allowed line-through' : 'cursor-pointer'
              )}
            >
              {variant.value}
            </button>
          );
        })}
      </div>
    </div>
  );
};
