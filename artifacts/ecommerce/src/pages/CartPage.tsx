import { Link } from 'wouter';
import { ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { EmptyState } from '../components/common/EmptyState';
import { QuantitySelector } from '../components/product/QuantitySelector';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '../hooks/useCart';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  const shipping = totalPrice > 150 ? 0 : 12;
  const tax = totalPrice * 0.1;
  const orderTotal = totalPrice + shipping + tax;

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground text-sm mb-8">
          {totalItems} {totalItems === 1 ? 'item' : 'items'}
        </p>

        {items.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Add some items to your cart to get started."
            action={
              <Link href="/products">
                <Button data-testid="btn-continue-shopping">Continue Shopping</Button>
              </Link>
            }
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.productId}-${JSON.stringify(item.selectedVariants)}`}
                  data-testid={`row-cart-item-${index}`}
                  className="flex gap-4 p-4 rounded-2xl border border-border bg-card"
                >
                  <Link href={`/products/${item.productId}`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-32 object-cover rounded-xl shrink-0 cursor-pointer"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-2 mb-1">
                      <Link href={`/products/${item.productId}`}>
                        <h3 className="font-medium text-sm hover:text-primary cursor-pointer transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <button
                        data-testid={`btn-remove-cart-${index}`}
                        onClick={() => removeItem(item.productId, item.selectedVariants)}
                        className="text-muted-foreground hover:text-destructive transition-colors shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    {Object.entries(item.selectedVariants).map(([k, v]) => (
                      <p key={k} className="text-xs text-muted-foreground capitalize">{k}: {v}</p>
                    ))}
                    <div className="flex items-center justify-between mt-4">
                      <QuantitySelector
                        quantity={item.quantity}
                        onDecrease={() => updateQuantity(item.productId, item.selectedVariants, item.quantity - 1)}
                        onIncrease={() => updateQuantity(item.productId, item.selectedVariants, item.quantity + 1)}
                        min={1}
                        max={20}
                      />
                      <p className="font-semibold text-sm" data-testid={`text-item-total-${index}`}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-1">
              <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
                <h2 className="font-semibold mb-4">Order Summary</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-base">
                    <span>Total</span>
                    <span data-testid="text-cart-total">${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
                {totalPrice < 150 && (
                  <p className="text-xs text-muted-foreground mt-3">
                    Add ${(150 - totalPrice).toFixed(2)} more for free shipping
                  </p>
                )}
                <Link href="/checkout">
                  <Button className="w-full mt-6 gap-2 rounded-xl h-12" data-testid="btn-checkout">
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="ghost" className="w-full mt-2 text-sm" data-testid="btn-continue-shopping-2">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
}
