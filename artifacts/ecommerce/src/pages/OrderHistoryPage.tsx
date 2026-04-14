import { Link } from 'wouter';
import { Package } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { EmptyState } from '../components/common/EmptyState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OrderStatus } from '../types/order';
import { mockOrders } from '../data/orders';

const statusConfig: Record<OrderStatus, { label: string; className: string }> = {
  pending: { label: 'Pending', className: 'bg-yellow-100 text-yellow-800 border-yellow-200' },
  confirmed: { label: 'Confirmed', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  shipped: { label: 'Shipped', className: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
  delivered: { label: 'Delivered', className: 'bg-green-100 text-green-800 border-green-200' },
  cancelled: { label: 'Cancelled', className: 'bg-red-100 text-red-800 border-red-200' },
};

export const OrderStatusBadge = ({ status }: { status: OrderStatus }) => {
  const config = statusConfig[status];
  return (
    <span
      data-testid={`badge-status-${status}`}
      className={`inline-flex items-center text-xs font-medium px-2.5 py-0.5 rounded-full border ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default function OrderHistoryPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold mb-2">My Orders</h1>
        <p className="text-muted-foreground text-sm mb-8">{mockOrders.length} orders</p>

        {mockOrders.length === 0 ? (
          <EmptyState
            icon={Package}
            title="No orders yet"
            description="When you place an order, it will appear here."
            action={
              <Link href="/products">
                <Button>Start Shopping</Button>
              </Link>
            }
          />
        ) : (
          <div className="space-y-4">
            {mockOrders.map((order) => (
              <div
                key={order.id}
                data-testid={`card-order-${order.id}`}
                className="rounded-2xl border border-border bg-card p-6"
              >
                <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
                  <div>
                    <p className="font-semibold text-sm" data-testid={`text-order-number-${order.id}`}>
                      {order.orderNumber}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <OrderStatusBadge status={order.status} />
                    <Link href={`/orders/${order.id}`}>
                      <Button variant="outline" size="sm" data-testid={`btn-order-detail-${order.id}`}>
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-1">
                  {order.items.map((item, index) => (
                    <div key={index} className="shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-20 object-cover rounded-xl"
                      />
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border text-sm">
                  <span className="text-muted-foreground">
                    {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                  </span>
                  <span className="font-semibold" data-testid={`text-order-total-${order.id}`}>
                    ${order.total.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
