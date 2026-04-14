import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '../types/cart';

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, selectedVariants: Record<string, string>) => void;
  updateQuantity: (productId: string, selectedVariants: Record<string, string>, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

const isSameVariants = (a: Record<string, string>, b: Record<string, string>) =>
  JSON.stringify(a) === JSON.stringify(b);

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (newItem) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.productId === newItem.productId && isSameVariants(i.selectedVariants, newItem.selectedVariants)
          );
          if (existingIndex >= 0) {
            const updated = [...state.items];
            updated[existingIndex] = {
              ...updated[existingIndex],
              quantity: updated[existingIndex].quantity + newItem.quantity,
            };
            return { items: updated };
          }
          return { items: [...state.items, newItem] };
        });
      },

      removeItem: (productId, selectedVariants) => {
        set((state) => ({
          items: state.items.filter(
            (i) => !(i.productId === productId && isSameVariants(i.selectedVariants, selectedVariants))
          ),
        }));
      },

      updateQuantity: (productId, selectedVariants, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, selectedVariants);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && isSameVariants(i.selectedVariants, selectedVariants)
              ? { ...i, quantity }
              : i
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getTotalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
    }),
    { name: 'luxe-cart' }
  )
);
