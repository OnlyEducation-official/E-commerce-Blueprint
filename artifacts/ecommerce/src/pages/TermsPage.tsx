import { MainLayout } from '../components/layout/MainLayout';

export default function TermsPage() {
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: January 1, 2026</p>

        <div className="prose prose-neutral max-w-none space-y-8 text-sm leading-relaxed text-muted-foreground">
          {[
            {
              title: '1. Agreement to Terms',
              body: 'By accessing or using the Luxe website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, users, and customers.',
            },
            {
              title: '2. Use of Service',
              body: 'You may use our website for lawful purposes only. You must not use our website in any way that causes, or may cause, damage to the website or impairment of the availability or accessibility of the website, or in any way which is unlawful, illegal, fraudulent, or harmful.',
            },
            {
              title: '3. Products and Pricing',
              body: 'We reserve the right to modify or discontinue any product at any time. Prices are subject to change without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuance of service. All prices are shown in USD and include applicable taxes where required.',
            },
            {
              title: '4. Orders and Payment',
              body: 'When you place an order, you represent that you are authorized to use the payment method provided. We reserve the right to refuse or cancel any order for any reason. Payment must be received in full before shipment.',
            },
            {
              title: '5. Intellectual Property',
              body: 'All content on this website, including but not limited to text, images, graphics, logos, and product descriptions, is the property of Luxe and is protected by copyright and trademark laws. You may not reproduce, distribute, or create derivative works from any content on this site without our explicit written permission.',
            },
            {
              title: '6. Limitation of Liability',
              body: 'To the fullest extent permitted by law, Luxe shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services or products, even if we have been advised of the possibility of such damages.',
            },
            {
              title: '7. Contact',
              body: 'For questions about these Terms of Service, please contact us at legal@luxe.store.',
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
