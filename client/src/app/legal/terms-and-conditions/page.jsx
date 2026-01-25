export default function TermsAndConditions() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Terms and Conditions</h1>

      <p>
        Welcome to ViseVerse ! By using our services, you agree to these
        terms.
      </p>

      <h2 className="text-2xl font-semibold">1. Tokens</h2>
      <ul className="list-disc list-inside space-y-2">
        <li>Tokens are purchased by users to access AI generation features.</li>
        <li>
          Tokens <strong>never expire</strong> and remain in your account until
          used.
        </li>
        <li>
          Tokens are <strong>non-refundable</strong>.
        </li>
        <li>
          Tokens are deducted{" "}
          <strong>only when AI successfully generates content</strong>.
        </li>
      </ul>

      <h2 className="text-2xl font-semibold">2. Usage Rules</h2>
      <p>
        Tokens are for personal use only. Misuse of tokens, including but not
        limited to automated or fraudulent generation, may result in account
        suspension.
      </p>

      <h2 className="text-2xl font-semibold">3. Refund Policy</h2>
      <p>
        All token purchases are final. No refunds are provided for unused
        tokens.
      </p>

      <h2 className="text-2xl font-semibold">4. Fair Use & AI Results</h2>
      <p>
        Tokens are deducted only when AI successfully generates content. We
        strive to ensure fairness and transparency in all token deductions.
      </p>
    </div>
  );
}
