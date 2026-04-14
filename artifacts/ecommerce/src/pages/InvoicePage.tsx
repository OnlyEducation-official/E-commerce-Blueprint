import { useParams, Link } from 'wouter';
import { ArrowLeft, Printer, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getOrderById } from '../data/orders';

export default function InvoicePage() {
  const { id } = useParams<{ id: string }>();
  const order = getOrderById(id);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Invoice not found</h2>
          <Link href="/orders">
            <Button>Back to Orders</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 print:bg-white">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 print:hidden">
          <Link href={`/orders/${order.id}`}>
            <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft size={16} /> Back to Order
            </button>
          </Link>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="gap-2"
              data-testid="btn-print-invoice"
            >
              <Printer size={14} />
              Print
            </Button>
            <Button
              size="sm"
              onClick={() => window.print()}
              className="gap-2"
              data-testid="btn-download-invoice"
            >
              <Download size={14} />
              Download PDF
            </Button>
          </div>
        </div>

        <div data-invoice className="bg-white rounded-2xl border border-border p-8 print:rounded-none print:border-0 print:p-0 print:shadow-none">
          <div className="flex items-start justify-between mb-8">
            <div>
              <p className="text-2xl font-bold tracking-[0.2em]">LUXE</p>
              <p className="text-sm text-muted-foreground mt-1">Premium Fashion & Lifestyle</p>
              <p className="text-sm text-muted-foreground">support@luxe.store</p>
              <p className="text-sm text-muted-foreground">123 Fashion Avenue, New York, NY 10001</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-foreground">INVOICE</p>
              <p className="text-sm text-muted-foreground mt-2">Invoice #: {order.orderNumber}</p>
              <p className="text-sm text-muted-foreground">
                Date: {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
              <p className="text-sm text-muted-foreground">
                Due: Upon receipt
              </p>
            </div>
          </div>

          <Separator className="mb-8" />

          <div className="grid grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Bill To</p>
              <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
              <p className="text-sm text-muted-foreground">{order.address.email}</p>
              <p className="text-sm text-muted-foreground">{order.address.address1}</p>
              {order.address.address2 && <p className="text-sm text-muted-foreground">{order.address.address2}</p>}
              <p className="text-sm text-muted-foreground">{order.address.city}, {order.address.state} {order.address.zip}</p>
              <p className="text-sm text-muted-foreground">{order.address.country}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Order Details</p>
              <p className="text-sm text-muted-foreground">Order Number: {order.orderNumber}</p>
              <p className="text-sm text-muted-foreground">
                Order Date: {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p className="text-sm text-muted-foreground">Payment: {order.paymentMethod}</p>
            </div>
          </div>

          <table className="w-full mb-8">
            <thead>
              <tr className="border-y border-border">
                <th className="text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground py-3 pr-4">Item</th>
                <th className="text-center text-xs font-semibold uppercase tracking-wider text-muted-foreground py-3 px-4 w-16">Qty</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground py-3 px-4 w-24">Unit Price</th>
                <th className="text-right text-xs font-semibold uppercase tracking-wider text-muted-foreground py-3 pl-4 w-24">Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index} className="border-b border-border/50">
                  <td className="py-4 pr-4">
                    <p className="text-sm font-medium">{item.name}</p>
                    {item.selectedVariants && Object.entries(item.selectedVariants).map(([k, v]) => (
                      <p key={k} className="text-xs text-muted-foreground capitalize">{k}: {v}</p>
                    ))}
                  </td>
                  <td className="py-4 px-4 text-center text-sm">{item.quantity}</td>
                  <td className="py-4 px-4 text-right text-sm">${item.price.toFixed(2)}</td>
                  <td className="py-4 pl-4 text-right text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end">
            <div className="w-64 space-y-3 text-sm">
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
              <div className="flex justify-between font-bold text-base">
                <span>Total</span>
                <span>${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-6 border-t border-border text-center">
            <p className="text-sm font-medium">Thank you for your order!</p>
            <p className="text-xs text-muted-foreground mt-1">
              Questions? Contact us at support@luxe.store or visit luxe.store/contact
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              30-day return policy — luxe.store/returns
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          [data-invoice], [data-invoice] * { visibility: visible; }
          [data-invoice] { position: absolute; left: 0; top: 0; width: 100%; }
          .print\\:hidden { display: none !important; }
        }
      `}</style>
    </div>
  );
}
