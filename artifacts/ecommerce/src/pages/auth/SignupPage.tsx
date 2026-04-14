import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'wouter';
import { MainLayout } from '../../components/layout/MainLayout';
import { FormInput } from '../../components/forms/FormInput';
import { FormPassword } from '../../components/forms/FormPassword';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../hooks/useAuth';
import { signupSchema, SignupFormData } from '../../schemas/authSchemas';

export default function SignupPage() {
  const [, setLocation] = useLocation();
  const { signIn } = useAuth();

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' },
  });

  const onSubmit = (data: SignupFormData) => {
    signIn(data.email, data.firstName, data.lastName);
    setLocation('/profile');
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-2xl font-bold tracking-[0.2em]">LUXE</p>
            <h1 className="text-xl font-semibold mt-4">Create your account</h1>
            <p className="text-sm text-muted-foreground mt-1">Join the Luxe community</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <FormInput name="firstName" label="First Name" placeholder="Alex" />
                  <FormInput name="lastName" label="Last Name" placeholder="Chen" />
                </div>
                <FormInput name="email" label="Email Address" type="email" placeholder="alex@example.com" />
                <FormPassword name="password" label="Password" placeholder="Min 8 characters" />
                <FormPassword name="confirmPassword" label="Confirm Password" placeholder="Repeat password" />
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl mt-2"
                  disabled={form.formState.isSubmitting}
                  data-testid="btn-signup"
                >
                  Create Account
                </Button>
              </form>
            </FormProvider>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Already have an account?{' '}
                <Link href="/auth/login">
                  <span className="text-primary hover:underline cursor-pointer font-medium" data-testid="link-login">
                    Sign in
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
