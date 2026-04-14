export type Variant = {
  id: string;
  type: 'size' | 'color';
  value: string;
  stock: number;
};

export type Review = {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviewCount: number;
  category: string;
  tags: string[];
  images: string[];
  variants: Variant[];
  reviews: Review[];
  featured: boolean;
  bestseller: boolean;
  isNew: boolean;
};
