export type CartItem = {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariants: Record<string, string>;
};

export type Cart = {
  items: CartItem[];
  total: number;
  count: number;
};
