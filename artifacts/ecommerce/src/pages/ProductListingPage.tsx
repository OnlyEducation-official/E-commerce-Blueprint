import { MainLayout } from '../components/layout/MainLayout';
import { ProductGrid } from '../components/common/ProductGrid';
import { EmptyState } from '../components/common/EmptyState';
import { FilterSidebar } from '../components/product/FilterSidebar';
import { FilterDrawer } from '../components/product/FilterDrawer';
import { SortDropdown } from '../components/product/SortDropdown';
import { Button } from '@/components/ui/button';
import { useProductFilters } from '../hooks/useProductFilters';
import { Package } from 'lucide-react';
import { Link } from 'wouter';

export default function ProductListingPage() {
  const {
    filters,
    updateFilters,
    setPage,
    paginatedProducts,
    totalPages,
    totalCount,
  } = useProductFilters();

  const filterProps = {
    selectedCategory: filters.category,
    minPrice: filters.minPrice,
    maxPrice: filters.maxPrice,
    minRating: filters.minRating,
    onCategoryChange: (cat: string) => updateFilters({ category: cat }),
    onPriceChange: (min: number, max: number) => updateFilters({ minPrice: min, maxPrice: max }),
    onRatingChange: (rating: number) => updateFilters({ minRating: rating }),
    onReset: () => updateFilters({ category: '', minPrice: 0, maxPrice: 500, minRating: 0, sort: 'featured' }),
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">
            {filters.category ? `${filters.category}` : 'All Products'}
            {filters.search && <span className="font-normal text-muted-foreground"> — "{filters.search}"</span>}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">{totalCount} {totalCount === 1 ? 'product' : 'products'}</p>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 shrink-0">
            <div className="sticky top-24">
              <FilterSidebar {...filterProps} />
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6 gap-4">
              <div className="lg:hidden">
                <FilterDrawer {...filterProps} />
              </div>
              <div className="ml-auto">
                <SortDropdown
                  value={filters.sort}
                  onChange={(sort) => updateFilters({ sort })}
                />
              </div>
            </div>

            {paginatedProducts.length === 0 ? (
              <EmptyState
                icon={Package}
                title="No products found"
                description="Try adjusting your filters or search terms to find what you're looking for."
                action={
                  <Link href="/products">
                    <Button variant="outline" data-testid="btn-clear-filters">
                      Clear all filters
                    </Button>
                  </Link>
                }
              />
            ) : (
              <>
                <ProductGrid products={paginatedProducts} />
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={filters.page <= 1}
                      onClick={() => setPage(filters.page - 1)}
                      data-testid="btn-page-prev"
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                      <Button
                        key={p}
                        variant={filters.page === p ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setPage(p)}
                        data-testid={`btn-page-${p}`}
                      >
                        {p}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={filters.page >= totalPages}
                      onClick={() => setPage(filters.page + 1)}
                      data-testid="btn-page-next"
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
