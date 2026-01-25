export const metadata = {
  title: "Privacy Policy – ViseVerse",
  description: "Read the Privacy Policy of ViseVerse to understand how we collect, use, and protect your data.",
  robots: { index: false, follow: true },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        At ViseVerse, we respect your privacy and are committed to protecting your personal information.
        This Privacy Policy explains how we collect, use, and safeguard your data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p>
        We may collect basic information such as email address, usage data, and uploaded files for
        processing purposes.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Your Information</h2>
      <ul className="list-disc ml-6">
        <li>To provide and improve our services</li>
        <li>To maintain security and prevent abuse</li>
        <li>To communicate important updates</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Security</h2>
      <p>
        We take reasonable measures to protect your data, but no method of transmission over the internet is 100% secure.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Changes</h2>
      <p>
        We may update this policy from time to time. Continued use of ViseVerse means you accept the changes.
      </p>

      <p className="mt-6">Last updated: January 2026</p>
    </div>
  );
}
