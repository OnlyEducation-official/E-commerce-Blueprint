import { MainLayout } from '../components/layout/MainLayout';
import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { RotateCcw, CheckCircle, Clock, Package } from 'lucide-react';

export default function ReturnPolicyPage() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-primary mb-3">Our Promise</p>
          <h1 className="text-3xl font-bold mb-4">Returns & Exchanges</h1>
          <p className="text-muted-foreground leading-relaxed">
            We stand behind the quality of everything we make. If you're not completely satisfied with your purchase, we'll make it right.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {[
            { icon: Clock, title: '30 Days', desc: 'Return window from delivery date' },
            { icon: RotateCcw, title: 'Free Returns', desc: 'Prepaid return label included' },
            { icon: CheckCircle, title: 'Easy Process', desc: 'Refund or exchange in 5-7 days' },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-border bg-card p-5 text-center">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <item.icon size={18} className="text-primary" />
              </div>
              <p className="font-semibold text-sm">{item.title}</p>
              <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="space-y-8 text-sm leading-relaxed text-muted-foreground">
          {[
            {
              title: 'Eligibility',
              body: 'Items must be returned within 30 days of the delivery date. All returned items must be unworn, unwashed, and in their original condition with all tags attached. Items marked as Final Sale are not eligible for return.',
            },
            {
              title: 'How to Start a Return',
              body: 'Log in to your account and navigate to your order history. Select the order containing the item(s) you wish to return and follow the prompts to generate a prepaid return label. Pack your items securely and drop off at any authorized shipping location.',
            },
            {
              title: 'Refunds',
              body: 'Refunds are processed to your original payment method within 5-7 business days of receiving your return. You will receive an email confirmation once your refund has been processed. Please allow additional time for your bank to post the credit.',
            },
            {
              title: 'Exchanges',
              body: 'We are happy to exchange items for a different size or color, subject to availability. To exchange, initiate a return for the original item and place a new order for your preferred option. We will process your refund once we receive the returned item.',
            },
            {
              title: 'Damaged or Defective Items',
              body: 'If you receive a damaged or defective item, please contact us at support@luxe.store within 7 days of delivery. Include your order number and photos of the damage. We will arrange a replacement or full refund at no additional cost.',
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-base font-semibold text-foreground mb-2">{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl bg-muted p-6 text-center">
          <p className="font-medium mb-2">Still have questions?</p>
          <p className="text-sm text-muted-foreground mb-4">Our customer care team is happy to help.</p>
          <Link href="/contact">
            <Button data-testid="btn-contact-us">Contact Us</Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
