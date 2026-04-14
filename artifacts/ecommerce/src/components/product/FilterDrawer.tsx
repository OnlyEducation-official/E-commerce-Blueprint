import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { FilterSidebar } from './FilterSidebar';

interface FilterDrawerProps {
  selectedCategory: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  onCategoryChange: (cat: string) => void;
  onPriceChange: (min: number, max: number) => void;
  onRatingChange: (rating: number) => void;
  onReset: () => void;
}

export const FilterDrawer = (props: FilterDrawerProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" data-testid="btn-filter-open">
          <SlidersHorizontal size={16} className="mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="mt-6">
          <FilterSidebar {...props} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
