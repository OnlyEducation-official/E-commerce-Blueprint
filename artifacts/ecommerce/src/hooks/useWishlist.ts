import { useWishlistStore } from '../store/wishlistStore';

export const useWishlist = () => {
  const productIds = useWishlistStore((state) => state.productIds);
  const toggleWishlist = useWishlistStore((state) => state.toggleWishlist);
  const isWishlisted = useWishlistStore((state) => state.isWishlisted);
  const removeFromWishlist = useWishlistStore((state) => state.removeFromWishlist);

  return { productIds, toggleWishlist, isWishlisted, removeFromWishlist, count: productIds.length };
};
