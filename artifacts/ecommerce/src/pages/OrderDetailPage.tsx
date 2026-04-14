import { useParams, Link } from 'wouter';
import { ArrowLeft, FileText } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { OrderStatusBadge } from './OrderHistoryPage';
import { getOrderById } from '../data/orders';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const order = getOrderById(id);

  if (!order) {
    return (
      <MainLayout>
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-semibold mb-4">Order not found</h2>
          <Link href="/orders">
            <Button>Back to Orders</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/orders">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={16} /> Back to Orders
          </button>
        </Link>

        <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-bold" data-testid="text-order-number">{order.orderNumber}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                year: 'numeric', month: 'long', day: 'numeric'
              })}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <OrderStatusBadge status={order.status} />
            <Link href={`/orders/${order.id}/invoice`}>
              <Button variant="outline" size="sm" className="gap-2" data-testid="btn-view-invoice">
                <FileText size={14} />
                Invoice
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold mb-4">Items Ordered</h2>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img src={item.image} alt={item.name} className="w-20 h-24 object-cover rounded-xl shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-muted-foreground">Quantity: {item.quantity}</p>
                      {item.selectedVariants && Object.entries(item.selectedVariants).map(([k, v]) => (
                        <p key={k} className="text-xs text-muted-foreground capitalize">{k}: {v}</p>
                      ))}
                      <p className="font-semibold text-sm mt-2">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold mb-4">Shipping Address</h2>
              <address className="not-italic text-sm text-muted-foreground leading-relaxed">
                {order.address.firstName} {order.address.lastName}<br />
                {order.address.address1}
                {order.address.address2 && <>, {order.address.address2}</>}<br />
                {order.address.city}, {order.address.state} {order.address.zip}<br />
                {order.address.country}
              </address>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${order.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${order.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>${order.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold mb-3 text-sm">Payment</h2>
              <p className="text-sm text-muted-foreground">{order.paymentMethod}</p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold mb-3 text-sm">Estimated Delivery</h2>
              <p className="text-sm text-muted-foreground">
                {new Date(order.estimatedDelivery).toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
