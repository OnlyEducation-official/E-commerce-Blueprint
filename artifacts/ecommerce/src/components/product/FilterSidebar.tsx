import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { categories } from '../../data/products';
import { SortOption } from '../../hooks/useProductFilters';

interface FilterSidebarProps {
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  onCategoryChange: (cat: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onRatingChange: (rating: number) => void;
  onReset: () => void;
}

export const FilterSidebar = ({
  selectedCategory,
  minPrice,
  maxPrice,
  minRating,
  onCategoryChange,
  onPriceChange,
  onRatingChange,
  onReset,
}: FilterSidebarProps) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-sm uppercase tracking-wider">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onReset} data-testid="btn-filter-reset">
          Reset all
        </Button>
      </div>
      <Separator />

      <div>
        <h3 className="font-medium text-sm mb-3">Category</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Checkbox
              id="cat-all"
              checked={!selectedCategory}
              onCheckedChange={() => onCategoryChange('')}
              data-testid="checkbox-category-all"
            />
            <Label htmlFor="cat-all" className="text-sm cursor-pointer">All</Label>
          </div>
          {categories.map((cat) => (
            <div key={cat} className="flex items-center gap-2">
              <Checkbox
                id={`cat-${cat}`}
                checked={selectedCategory === cat}
                onCheckedChange={() => onCategoryChange(selectedCategory === cat ? '' : cat)}
                data-testid={`checkbox-category-${cat}`}
              />
              <Label htmlFor={`cat-${cat}`} className="text-sm cursor-pointer">{cat}</Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-sm mb-3">
          Price Range: ${minPrice} - ${maxPrice}
        </h3>
        <Slider
          min={0}
          max={500}
          step={10}
          value={[minPrice, maxPrice]}
          onValueChange={([min, max]) => onPriceChange(min, max)}
          className="mt-2"
          data-testid="slider-price"
        />
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>$0</span>
          <span>$500+</span>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="font-medium text-sm mb-3">Minimum Rating</h3>
        <div className="space-y-2">
          {[0, 3, 3.5, 4, 4.5].map((r) => (
            <div key={r} className="flex items-center gap-2">
              <Checkbox
                id={`rating-${r}`}
                checked={minRating === r}
                onCheckedChange={() => onRatingChange(r)}
                data-testid={`checkbox-rating-${r}`}
              />
              <Label htmlFor={`rating-${r}`} className="text-sm cursor-pointer">
                {r === 0 ? 'All ratings' : `${r}+ stars`}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
