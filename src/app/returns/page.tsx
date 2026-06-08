import PolicyPage from "@/components/ui/PolicyPage";

export const metadata = { title: "Returns — KESTREL" };

export default function ReturnsPage() {
  return (
    <PolicyPage
      eyebrow="Returns"
      title="Try it. Decide later."
      intro="60 days. Used or unused. No restock fees."
    >
      <section>
        <h2 className="display text-2xl text-paper mb-3">The 60-day promise</h2>
        <p>
          We've sold haircare long enough to know that whether a formula works
          isn't always obvious in week one. Use a Kestrel product daily for up
          to 60 days. If it isn't earning its place, write us — we refund the
          full purchase price.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-paper mb-3">How to start a return</h2>
        <p>
          Email <a className="text-brass" href="mailto:hello@kestrel.co">hello@kestrel.co</a>{" "}
          with your order number and a sentence on what didn't work. We'll send
          a prepaid label within one business day. No questions, no forms.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-paper mb-3">Refunds</h2>
        <p>
          Issued to the original payment method within 5 business days of the
          package landing back at the US fulfilment center. We absorb the
          return shipping inside the US and Canada.
        </p>
      </section>
    </PolicyPage>
  );
}
