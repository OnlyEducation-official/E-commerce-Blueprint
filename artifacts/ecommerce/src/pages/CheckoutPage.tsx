import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ArrowLeft } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { FormInput } from '../components/forms/FormInput';
import { FormSelect } from '../components/forms/FormSelect';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { useCart } from '../hooks/useCart';
import { addressSchema, paymentSchema, AddressFormData, PaymentFormData } from '../schemas/checkoutSchemas';

const US_STATES = [
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' }, { value: 'AZ', label: 'Arizona' },
  { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' }, { value: 'CT', label: 'Connecticut' },
  { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' }, { value: 'IL', label: 'Illinois' },
  { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' }, { value: 'MN', label: 'Minnesota' },
  { value: 'NY', label: 'New York' }, { value: 'NC', label: 'North Carolina' }, { value: 'OH', label: 'Ohio' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' }, { value: 'TX', label: 'Texas' },
  { value: 'WA', label: 'Washington' }, { value: 'WI', label: 'Wisconsin' },
];

const steps = [
  { id: 1, label: 'Shipping' },
  { id: 2, label: 'Review' },
  { id: 3, label: 'Payment' },
];

export default function CheckoutPage() {
  const [, setLocation] = useLocation();
  const { items, totalPrice, clearCart } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [addressData, setAddressData] = useState<AddressFormData | null>(null);

  const shipping = totalPrice > 150 ? 0 : 12;
  const tax = totalPrice * 0.1;
  const total = totalPrice + shipping + tax;

  const addressForm = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      firstName: '', lastName: '', email: '', phone: '',
      address1: '', address2: '', city: '', state: '', zip: '', country: 'United States',
    },
  });

  const paymentForm = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { cardholderName: '', cardNumber: '', expiry: '', cvv: '' },
  });

  const onAddressSubmit = (data: AddressFormData) => {
    setAddressData(data);
    setCurrentStep(2);
  };

  const onPlaceOrder = (data: PaymentFormData) => {
    clearCart();
    const orderNumber = `LX-${Date.now()}`;
    setLocation(`/checkout/success?order=${orderNumber}`);
  };

  if (items.length === 0 && currentStep !== 3) {
    return (
      <MainLayout>
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
          <Link href="/products">
            <Button>Continue Shopping</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/cart">
          <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6">
            <ArrowLeft size={16} /> Back to Cart
          </button>
        </Link>

        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="flex items-center mb-10">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              <div className="flex items-center gap-2">
                <div
                  data-testid={`step-indicator-${step.id}`}
                  className={cn(
                    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all',
                    currentStep > step.id
                      ? 'bg-primary text-primary-foreground'
                      : currentStep === step.id
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  )}
                >
                  {currentStep > step.id ? <Check size={14} /> : step.id}
                </div>
                <span
                  className={cn(
                    'text-sm hidden sm:block',
                    currentStep === step.id ? 'font-medium' : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'flex-1 h-0.5 mx-4',
                    currentStep > step.id ? 'bg-primary' : 'bg-border'
                  )}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <FormProvider {...addressForm}>
                <form onSubmit={addressForm.handleSubmit(onAddressSubmit)} className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput name="firstName" label="First Name" placeholder="Alex" />
                    <FormInput name="lastName" label="Last Name" placeholder="Chen" />
                  </div>
                  <FormInput name="email" label="Email" type="email" placeholder="alex@example.com" />
                  <FormInput name="phone" label="Phone" type="tel" placeholder="+1 555-0100" />
                  <FormInput name="address1" label="Street Address" placeholder="42 Example Street" />
                  <FormInput name="address2" label="Apartment, Suite, etc. (optional)" placeholder="Apt 2B" />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput name="city" label="City" placeholder="Portland" />
                    <FormSelect name="state" label="State" placeholder="Select state" options={US_STATES} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput name="zip" label="Zip Code" placeholder="97201" />
                    <FormInput name="country" label="Country" placeholder="United States" />
                  </div>
                  <Button type="submit" className="w-full h-12 mt-4 rounded-xl" data-testid="btn-continue-to-review">
                    Continue to Review
                  </Button>
                </form>
              </FormProvider>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-lg font-semibold">Review Your Order</h2>
                <div className="rounded-2xl border border-border bg-card p-4 space-y-4">
                  {items.map((item, index) => (
                    <div key={index} className="flex gap-3">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover rounded-lg" />
                      <div>
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        {Object.entries(item.selectedVariants).map(([k, v]) => (
                          <p key={k} className="text-xs text-muted-foreground capitalize">{k}: {v}</p>
                        ))}
                        <p className="text-sm font-semibold mt-1">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {addressData && (
                  <div className="rounded-2xl border border-border bg-card p-4">
                    <h3 className="text-sm font-medium mb-2">Shipping to:</h3>
                    <p className="text-sm text-muted-foreground">
                      {addressData.firstName} {addressData.lastName}<br />
                      {addressData.address1}{addressData.address2 ? `, ${addressData.address2}` : ''}<br />
                      {addressData.city}, {addressData.state} {addressData.zip}<br />
                      {addressData.country}
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button variant="outline" onClick={() => setCurrentStep(1)} data-testid="btn-back-to-address">
                    Back
                  </Button>
                  <Button className="flex-1 h-12 rounded-xl" onClick={() => setCurrentStep(3)} data-testid="btn-continue-to-payment">
                    Continue to Payment
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <FormProvider {...paymentForm}>
                <form onSubmit={paymentForm.handleSubmit(onPlaceOrder)} className="space-y-4">
                  <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
                  <FormInput name="cardholderName" label="Cardholder Name" placeholder="Alex Chen" />
                  <FormInput name="cardNumber" label="Card Number" placeholder="1234567890123456" maxLength={16} />
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput name="expiry" label="Expiry (MM/YY)" placeholder="12/27" />
                    <FormInput name="cvv" label="CVV" placeholder="123" maxLength={4} />
                  </div>
                  <div className="text-xs text-muted-foreground bg-muted rounded-lg p-3 mt-2">
                    This is a demo store. No real payment will be processed.
                    Use any card number like 1234567890123456, expiry 12/27, CVV 123.
                  </div>
                  <div className="flex gap-3 mt-4">
                    <Button type="button" variant="outline" onClick={() => setCurrentStep(2)} data-testid="btn-back-to-review">
                      Back
                    </Button>
                    <Button type="submit" className="flex-1 h-12 rounded-xl" data-testid="btn-place-order">
                      Place Order — ${total.toFixed(2)}
                    </Button>
                  </div>
                </form>
              </FormProvider>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-border bg-card p-6 sticky top-24">
              <h2 className="font-semibold mb-4">Order Summary</h2>
              <div className="space-y-3 text-sm">
                {items.map((item, i) => (
                  <div key={i} className="flex justify-between gap-2">
                    <span className="text-muted-foreground truncate">{item.name} ×{item.quantity}</span>
                    <span className="shrink-0">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span data-testid="text-checkout-total">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
