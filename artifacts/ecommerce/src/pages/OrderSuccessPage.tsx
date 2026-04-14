import { useLocation, Link } from 'wouter';
import { CheckCircle2 } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '@/components/ui/button';

export default function OrderSuccessPage() {
  const [location] = useLocation();
  const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const orderNumber = params.get('order') || 'LX-XXXXXXXX';

  return (
    <MainLayout>
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="text-green-600 w-10 h-10" />
        </div>
        <h1 className="text-2xl font-bold mb-3" data-testid="text-order-success-title">Order Confirmed</h1>
        <p className="text-muted-foreground mb-2">Thank you for your purchase!</p>
        <p className="text-sm font-medium mb-8" data-testid="text-order-number">
          Order number: <span className="text-primary">{orderNumber}</span>
        </p>
        <p className="text-sm text-muted-foreground mb-10">
          We have sent a confirmation email to your address. Your order will be processed and shipped within 1-2 business days.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/orders">
            <Button data-testid="btn-view-orders">View My Orders</Button>
          </Link>
          <Link href="/products">
            <Button variant="outline" data-testid="btn-continue-shopping">Continue Shopping</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
