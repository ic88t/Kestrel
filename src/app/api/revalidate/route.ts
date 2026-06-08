import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-revalidate-secret");
  if (!process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json(
      { ok: false, error: "Server missing SHOPIFY_REVALIDATION_SECRET" },
      { status: 500 }
    );
  }
  if (secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    return NextResponse.json({ ok: false, error: "Unauthorised" }, { status: 401 });
  }

  const topic = req.headers.get("x-shopify-topic") ?? "manual";
  const body = await req.json().catch(() => ({}));

  const tags = new Set<string>();
  tags.add("shopify:products");

  if (typeof body?.handle === "string") tags.add(`shopify:product:${body.handle}`);
  if (typeof body?.collectionHandle === "string") {
    tags.add(`shopify:collection:${body.collectionHandle}`);
  }
  if (topic.startsWith("products/")) tags.add("shopify:products");
  if (topic.startsWith("collections/")) {
    tags.add("shopify:products");
    if (body?.handle) tags.add(`shopify:collection:${body.handle}`);
  }

  tags.forEach((t) => revalidateTag(t));
  return NextResponse.json({ ok: true, revalidated: [...tags], topic });
}

export async function GET() {
  return NextResponse.json({
    ok: true,
    hint: "POST with x-revalidate-secret header and { handle?, collectionHandle? } body."
  });
}
