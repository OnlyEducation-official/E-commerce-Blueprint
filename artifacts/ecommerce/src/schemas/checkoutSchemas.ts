import { z } from 'zod';

export const addressSchema = z.object({
  firstName: z.string().min(2, 'First name is required'),
  lastName: z.string().min(2, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(7, 'Phone number is required'),
  address1: z.string().min(5, 'Street address is required'),
  address2: z.string().optional(),
  city: z.string().min(2, 'City is required'),
  state: z.string().min(2, 'State is required'),
  zip: z.string().min(4, 'Zip code is required'),
  country: z.string().min(2, 'Country is required'),
});

export const paymentSchema = z.object({
  cardholderName: z.string().min(3, 'Cardholder name is required'),
  cardNumber: z.string()
    .regex(/^\d{16}$/, 'Card number must be 16 digits'),
  expiry: z.string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, 'Expiry must be in MM/YY format'),
  cvv: z.string()
    .regex(/^\d{3,4}$/, 'CVV must be 3 or 4 digits'),
});

export type AddressFormData = z.infer<typeof addressSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
