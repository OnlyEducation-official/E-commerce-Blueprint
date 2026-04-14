import { useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Package, Settings, Calendar } from 'lucide-react';
import { MainLayout } from '../components/layout/MainLayout';
import { FormInput } from '../components/forms/FormInput';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '../hooks/useAuth';
import { profileSchema, ProfileFormData } from '../schemas/profileSchemas';
import { mockOrders } from '../data/orders';
import { OrderStatusBadge } from './OrderHistoryPage';

export default function ProfilePage() {
  const [, setLocation] = useLocation();
  const { user, isLoggedIn, updateUser } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) setLocation('/auth/login');
  }, [isLoggedIn, setLocation]);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      email: user?.email || '',
      phone: '',
    },
  });

  const onProfileSubmit = (data: ProfileFormData) => {
    updateUser({ firstName: data.firstName, lastName: data.lastName, email: data.email });
  };

  if (!user) return null;

  const initials = `${user.firstName?.[0] || ''}${user.lastName?.[0] || ''}`;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-xl font-bold text-primary-foreground">
            {initials}
          </div>
          <div>
            <h1 className="text-2xl font-bold" data-testid="text-profile-name">
              {user.firstName} {user.lastName}
            </h1>
            <p className="text-muted-foreground text-sm" data-testid="text-profile-email">{user.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Orders', value: mockOrders.length, icon: Package },
            { label: 'Delivered', value: mockOrders.filter((o) => o.status === 'delivered').length, icon: Package },
            { label: 'Pending', value: mockOrders.filter((o) => o.status === 'pending').length, icon: Package },
            { label: 'Member Since', value: '2026', icon: Calendar },
          ].map((stat) => (
            <div key={stat.label} className="rounded-2xl border border-border bg-card p-4">
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        <Tabs defaultValue="overview">
          <TabsList className="mb-6">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="edit" data-testid="tab-edit">Edit Profile</TabsTrigger>
            <TabsTrigger value="orders" data-testid="tab-orders">Recent Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex gap-4">
                  <span className="text-muted-foreground w-32">Name</span>
                  <span>{user.firstName} {user.lastName}</span>
                </div>
                <Separator />
                <div className="flex gap-4">
                  <span className="text-muted-foreground w-32">Email</span>
                  <span>{user.email}</span>
                </div>
                <Separator />
                <div className="flex gap-4">
                  <span className="text-muted-foreground w-32">Member Since</span>
                  <span>{new Date(user.joinedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="edit">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="font-semibold mb-6">Edit Profile</h2>
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onProfileSubmit)} className="space-y-4 max-w-md">
                  <div className="grid grid-cols-2 gap-4">
                    <FormInput name="firstName" label="First Name" />
                    <FormInput name="lastName" label="Last Name" />
                  </div>
                  <FormInput name="email" label="Email" type="email" />
                  <FormInput name="phone" label="Phone (optional)" type="tel" />
                  <Button type="submit" className="mt-2" data-testid="btn-save-profile">
                    Save Changes
                  </Button>
                </form>
              </FormProvider>
            </div>
          </TabsContent>

          <TabsContent value="orders">
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="p-4 border-b border-border flex justify-between items-center">
                <h2 className="font-semibold">Recent Orders</h2>
                <Link href="/orders">
                  <Button variant="ghost" size="sm" data-testid="link-all-orders">View All</Button>
                </Link>
              </div>
              <div className="divide-y divide-border">
                {mockOrders.slice(0, 3).map((order) => (
                  <div key={order.id} className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{order.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-medium">${order.total.toFixed(2)}</span>
                      <OrderStatusBadge status={order.status} />
                      <Link href={`/orders/${order.id}`}>
                        <Button variant="ghost" size="sm" data-testid={`link-order-detail-${order.id}`}>View</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
}
