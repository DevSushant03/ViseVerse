export const metadata = {
  title: "Privacy Policy – ViseVerse",
  description:
    "Read the Privacy Policy of ViseVerse to understand how we collect, use, and protect your data.",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p>
        At <strong>ViseVerse</strong>, we respect your privacy and are committed
        to protecting your personal information. This Privacy Policy explains
        how we collect, use, store, and safeguard your information when you use
        our website and services.
      </p>

      <h2 className="text-xl font-semibold">1. Information We Collect</h2>
      <p>We may collect the following types of information:</p>
      <ul className="list-disc ml-6">
        <li>Email address and basic account information</li>
        <li>Usage data such as pages visited and features used</li>
        <li>Text or files you upload for processing</li>
        <li>Payment-related information (processed securely by Razorpay)</li>
      </ul>

      <h2 className="text-xl font-semibold">2. How We Use Your Information</h2>
      <ul className="list-disc ml-6">
        <li>To provide, operate, and improve our services</li>
        <li>To process payments and manage token purchases</li>
        <li>To maintain security and prevent fraud or misuse</li>
        <li>To communicate important service-related updates</li>
      </ul>

      <h2 className="text-xl font-semibold">
        3. Payments & Third-Party Services
      </h2>
      <p>
        All payments on ViseVerse are processed securely through{" "}
        <strong>Razorpay</strong>. We do not store your card, UPI, or banking
        details on our servers. We may also use third-party AI service providers
        to process the content you submit.
      </p>

      <h2 className="text-xl font-semibold">4. Data Storage & Security</h2>
      <p>
        We take reasonable technical and organizational measures to protect your
        data. However, no method of transmission over the Internet or electronic
        storage is 100% secure, and we cannot guarantee absolute security.
      </p>

      <h2 className="text-xl font-semibold">5. Cookies</h2>
      <p>
        We may use cookies or similar technologies to improve user experience,
        analyze usage, and maintain login sessions.
      </p>

      <h2 className="text-xl font-semibold">6. Data Sharing</h2>
      <p>
        We do not sell or rent your personal data. Your information may only be
        shared with trusted third-party services (such as payment gateways or AI
        providers) strictly for providing the service.
      </p>

      <h2 className="text-xl font-semibold">7. Your Rights</h2>
      <p>
        You may contact us to request access, correction, or deletion of your
        personal data, subject to legal and operational requirements.
      </p>

      <h2 className="text-xl font-semibold">8. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Continued use of
        ViseVerse after changes means you accept the updated policy.
      </p>

      <h2 className="text-xl font-semibold">9. Governing Law</h2>
      <p>
        This Privacy Policy shall be governed by and construed in accordance
        with the laws of India.
      </p>

      <h2 className="text-xl font-semibold">10. Contact Information</h2>
      <p>
        If you have any questions about this Privacy Policy, you can contact us
        at:
        <br />
        <strong>Email:</strong> mrsushant2005@gmail.com
      </p>

      <p className="text-sm text-gray-500 pt-4">Last updated: January 2026</p>
    </div>
  );
}
