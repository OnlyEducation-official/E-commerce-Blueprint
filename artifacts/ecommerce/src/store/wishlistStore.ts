import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WishlistStore {
  productIds: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      productIds: [],

      toggleWishlist: (productId) => {
        set((state) => {
          if (state.productIds.includes(productId)) {
            return { productIds: state.productIds.filter((id) => id !== productId) };
          }
          return { productIds: [...state.productIds, productId] };
        });
      },

      isWishlisted: (productId) => get().productIds.includes(productId),

      removeFromWishlist: (productId) => {
        set((state) => ({ productIds: state.productIds.filter((id) => id !== productId) }));
      },
    }),
    { name: 'luxe-wishlist' }
  )
);
