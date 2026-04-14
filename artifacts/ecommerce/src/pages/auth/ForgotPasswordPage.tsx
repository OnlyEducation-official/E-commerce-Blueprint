import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'wouter';
import { CheckCircle2 } from 'lucide-react';
import { MainLayout } from '../../components/layout/MainLayout';
import { FormInput } from '../../components/forms/FormInput';
import { Button } from '@/components/ui/button';
import { forgotPasswordSchema, ForgotPasswordFormData } from '../../schemas/authSchemas';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  const onSubmit = () => {
    setSubmitted(true);
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-2xl font-bold tracking-[0.2em]">LUXE</p>
            <h1 className="text-xl font-semibold mt-4">Reset your password</h1>
            <p className="text-sm text-muted-foreground mt-1">
              We'll send a reset link to your email
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            {submitted ? (
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="text-green-600 w-6 h-6" />
                </div>
                <h3 className="font-semibold mb-2">Check your email</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  If an account exists for that email, we'll send password reset instructions.
                </p>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full" data-testid="btn-back-to-login">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            ) : (
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormInput name="email" label="Email Address" type="email" placeholder="alex@example.com" />
                  <Button
                    type="submit"
                    className="w-full h-12 rounded-xl"
                    disabled={form.formState.isSubmitting}
                    data-testid="btn-reset-password"
                  >
                    Send Reset Link
                  </Button>
                </form>
              </FormProvider>
            )}

            {!submitted && (
              <div className="mt-4 text-center">
                <Link href="/auth/login">
                  <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors" data-testid="link-back-login">
                    Back to sign in
                  </span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
