import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { CheckCircle2, Mail, Phone, MapPin } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { FormInput } from '../components/forms/FormInput';
import { FormTextarea } from '../components/forms/FormTextarea';
import { FormSelect } from '../components/forms/FormSelect';
import { Button } from '@/components/ui/button';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().min(1, 'Please select a subject'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const subjectOptions = [
  { value: 'order', label: 'Order Inquiry' },
  { value: 'return', label: 'Return or Exchange' },
  { value: 'product', label: 'Product Question' },
  { value: 'sizing', label: 'Sizing Help' },
  { value: 'press', label: 'Press & Media' },
  { value: 'other', label: 'Other' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '' },
  });

  const onSubmit = () => setSubmitted(true);

  return (
    <MainLayout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-primary mb-3">Get in Touch</p>
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-lg">
            We'd love to hear from you. Our team responds to all messages within 24 hours on business days.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="rounded-2xl border border-border bg-card p-10 text-center">
                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-green-600 w-7 h-7" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Message sent</h3>
                <p className="text-sm text-muted-foreground">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <div className="rounded-2xl border border-border bg-card p-8">
                <FormProvider {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormInput name="name" label="Your Name" placeholder="Alex Chen" />
                      <FormInput name="email" label="Email Address" type="email" placeholder="alex@example.com" />
                    </div>
                    <FormSelect name="subject" label="Subject" placeholder="Select a subject" options={subjectOptions} />
                    <FormTextarea name="message" label="Message" placeholder="Tell us how we can help..." rows={5} />
                    <Button type="submit" className="w-full h-12 rounded-xl" data-testid="btn-send-message">
                      Send Message
                    </Button>
                  </form>
                </FormProvider>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Other ways to reach us</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Mail size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">support@luxe.store</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Phone size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Phone</p>
                    <p className="text-sm text-muted-foreground">+1 (800) 589-2834</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <MapPin size={16} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Mailing Address</p>
                    <p className="text-sm text-muted-foreground">123 Fashion Avenue<br />New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <h3 className="font-semibold text-sm mb-3">Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="text-muted-foreground">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
