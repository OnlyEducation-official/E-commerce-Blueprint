import { MainLayout } from '../components/layout/MainLayout';

export default function PrivacyPage() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: January 1, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-sm leading-relaxed text-muted-foreground">
          {[
            {
              title: 'Information We Collect',
              body: 'We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support. This includes your name, email address, shipping address, payment information, and order history.',
            },
            {
              title: 'How We Use Your Information',
              body: 'We use the information we collect to process and fulfill your orders, communicate with you about your orders and account, send you marketing communications (with your consent), improve our products and services, and comply with legal obligations.',
            },
            {
              title: 'Information Sharing',
              body: 'We do not sell, trade, or rent your personal information to third parties. We may share your information with trusted service providers who help us operate our website and process orders — such as payment processors and shipping carriers — under strict confidentiality agreements.',
            },
            {
              title: 'Cookies',
              body: 'We use cookies and similar tracking technologies to track activity on our website and hold certain information. You can instruct your browser to refuse all cookies or indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our service may not function properly.',
            },
            {
              title: 'Data Security',
              body: 'We implement commercially reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. All payment transactions are processed through our secure payment provider using SSL encryption.',
            },
            {
              title: 'Your Rights',
              body: 'You have the right to access, update, or delete your personal information at any time. To exercise these rights, please contact us at privacy@luxe.store. We will respond to your request within 30 days.',
            },
            {
              title: 'Contact',
              body: 'For questions about this Privacy Policy, please contact us at privacy@luxe.store or write to us at 123 Fashion Avenue, New York, NY 10001.',
            },
          ].map((section) => (
            <div key={section.title}>
              <h2 className="text-base font-semibold text-foreground mb-2">{section.title}</h2>
              <p>{section.body}</p>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
