import { useCartStore } from '../store/cartStore';
import { CartItem } from '../types/cart';

export const useCart = () => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);
  const getTotalPrice = useCartStore((state) => state.getTotalPrice);

  const totalItems = getTotalItems();
  const totalPrice = getTotalPrice();

  return { items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice };
};
