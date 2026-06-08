import PolicyPage from "@/components/ui/PolicyPage";

export const metadata = { title: "Shipping — KESTREL" };

export default function ShippingPage() {
  return (
    <PolicyPage
      eyebrow="Shipping"
      title="How your order moves."
      intro="Shipped from a US fulfilment center — within a week, almost everywhere."
    >
      <section>
        <h2 className="display text-2xl text-paper mb-3">United States & Canada</h2>
        <p>
          Standard shipping (5–7 business days): free on orders over $150, $9
          otherwise. Express (2–3 business days): $18 flat. Orders ship within
          24 hours, Monday through Friday.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-paper mb-3">United Kingdom & EU</h2>
        <p>
          Tracked airmail (4–7 business days): free over £120 / €140. Express
          DHL (2–3 days): £15 / €17. Duties prepaid on all EU orders.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-paper mb-3">Rest of world</h2>
        <p>
          DHL Express (5–9 business days): $32 flat. Duties due on arrival in
          some markets — we mark all shipments accurately for customs.
        </p>
      </section>
      <section>
        <h2 className="display text-2xl text-paper mb-3">Tracking</h2>
        <p>
          A tracking link is emailed within four hours of dispatch. If a
          shipment goes quiet for more than 48 hours, write us — we'll chase
          the carrier.
        </p>
      </section>
    </PolicyPage>
  );
}
