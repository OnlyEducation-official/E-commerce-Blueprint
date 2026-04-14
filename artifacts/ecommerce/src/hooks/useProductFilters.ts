import { useState, useMemo } from 'react';
import { useLocation } from 'wouter';
import { products } from '../data/products';
import { Product } from '../types/product';

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc' | 'rating';

interface Filters {
  category: string;
  minPrice: number;
  maxPrice: number;
  minRating: number;
  sort: SortOption;
  page: number;
  search: string;
}

const ITEMS_PER_PAGE = 12;

export const useProductFilters = () => {
  const [, setLocation] = useLocation();
  const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams();

  const [filters, setFilters] = useState<Filters>({
    category: searchParams.get('category') || '',
    minPrice: Number(searchParams.get('minPrice')) || 0,
    maxPrice: Number(searchParams.get('maxPrice')) || 500,
    minRating: Number(searchParams.get('rating')) || 0,
    sort: (searchParams.get('sort') as SortOption) || 'featured',
    page: Number(searchParams.get('page')) || 1,
    search: searchParams.get('search') || '',
  });

  const updateFilters = (updates: Partial<Filters>) => {
    const newFilters = { ...filters, ...updates, page: 1 };
    setFilters(newFilters);

    const params = new URLSearchParams();
    if (newFilters.category) params.set('category', newFilters.category);
    if (newFilters.minPrice > 0) params.set('minPrice', String(newFilters.minPrice));
    if (newFilters.maxPrice < 500) params.set('maxPrice', String(newFilters.maxPrice));
    if (newFilters.minRating > 0) params.set('rating', String(newFilters.minRating));
    if (newFilters.sort !== 'featured') params.set('sort', newFilters.sort);
    if (newFilters.search) params.set('search', newFilters.search);
    setLocation(`/products?${params.toString()}`, { replace: true });
  };

  const setPage = (page: number) => {
    setFilters((f) => ({ ...f, page }));
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.category) {
      result = result.filter((p) => p.category === filters.category);
    }

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q))
      );
    }

    result = result.filter(
      (p) => p.price >= filters.minPrice && p.price <= filters.maxPrice
    );

    if (filters.minRating > 0) {
      result = result.filter((p) => p.rating >= filters.minRating);
    }

    switch (filters.sort) {
      case 'newest':
        result = result.filter((p) => p.isNew).concat(result.filter((p) => !p.isNew));
        break;
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        result = result.filter((p) => p.featured).concat(result.filter((p) => !p.featured));
    }

    return result;
  }, [filters]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (filters.page - 1) * ITEMS_PER_PAGE,
    filters.page * ITEMS_PER_PAGE
  );

  return {
    filters,
    updateFilters,
    setPage,
    filteredProducts,
    paginatedProducts,
    totalPages,
    totalCount: filteredProducts.length,
    ITEMS_PER_PAGE,
  };
};
