import PolicyPage from "@/components/ui/PolicyPage";

export const metadata = { title: "Contact — KESTREL" };

export default function ContactPage() {
  return (
    <PolicyPage
      eyebrow="Contact"
      title="Write to us."
      intro="A small customer team based in New York — replies within one business day."
    >
      <section>
        <h2 className="display text-2xl text-paper mb-3">Email</h2>
        <p>
          <a className="text-brass" href="mailto:hello@kestrel.co">hello@kestrel.co</a>{" "}
          — orders, ritual advice, ingredient questions, anything.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-paper mb-3">Press & retail</h2>
        <p>
          <a className="text-brass" href="mailto:press@kestrel.co">press@kestrel.co</a>{" "}
          for press enquiries; <a className="text-brass" href="mailto:wholesale@kestrel.co">wholesale@kestrel.co</a>{" "}
          for retail or hospitality partnerships.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-paper mb-3">Office</h2>
        <p>
          KESTREL HQ, New York, NY, USA. Mail-only — no walk-in. We ship from a
          US fulfilment center within one business day of every order.
        </p>
      </section>
    </PolicyPage>
  );
}
