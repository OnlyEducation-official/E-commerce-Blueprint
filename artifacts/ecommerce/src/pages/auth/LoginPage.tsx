import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation } from 'wouter';
import { MainLayout } from '../../components/layout/MainLayout';
import { FormInput } from '../../components/forms/FormInput';
import { FormPassword } from '../../components/forms/FormPassword';
import { Button } from '@/components/ui/button';
import { useAuth } from '../../hooks/useAuth';
import { loginSchema, LoginFormData } from '../../schemas/authSchemas';

export default function LoginPage() {
  const [, setLocation] = useLocation();
  const { signIn } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormData) => {
    signIn(data.email);
    setLocation('/profile');
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <p className="text-2xl font-bold tracking-[0.2em]">LUXE</p>
            <h1 className="text-xl font-semibold mt-4">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Sign in to your account</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8">
            <FormProvider {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormInput name="email" label="Email Address" type="email" placeholder="alex@example.com" />
                <FormPassword name="password" label="Password" placeholder="Enter your password" />
                <div className="flex justify-end">
                  <Link href="/auth/forgot-password">
                    <span className="text-xs text-primary hover:underline cursor-pointer" data-testid="link-forgot-password">
                      Forgot password?
                    </span>
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl mt-2"
                  disabled={form.formState.isSubmitting}
                  data-testid="btn-login"
                >
                  Sign In
                </Button>
              </form>
            </FormProvider>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <Link href="/auth/signup">
                  <span className="text-primary hover:underline cursor-pointer font-medium" data-testid="link-signup">
                    Create one
                  </span>
                </Link>
              </p>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Demo: use any email and a password of 8+ characters.
          </p>
        </div>
      </div>
    </MainLayout>
  );
}
