const API_VERSION = "2024-10";

export const SHOPIFY_CONFIGURED = !!(
  process.env.SHOPIFY_STORE_DOMAIN && process.env.SHOPIFY_STOREFRONT_TOKEN
);

export class ShopifyError extends Error {
  constructor(
    message: string,
    readonly status?: number,
    readonly query?: string,
    readonly errors?: unknown
  ) {
    super(message);
    this.name = "ShopifyError";
  }
}

type FetchOpts = {
  variables?: Record<string, unknown>;
  cache?: RequestCache;
  tags?: string[];
  revalidate?: number | false;
};

export async function shopifyFetch<T>(
  query: string,
  { variables, cache = "force-cache", tags, revalidate }: FetchOpts = {}
): Promise<T> {
  if (!SHOPIFY_CONFIGURED) {
    throw new ShopifyError(
      "Shopify is not configured. Set SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN in .env.local."
    );
  }

  const domain = process.env.SHOPIFY_STORE_DOMAIN!.replace(/^https?:\/\//, "").replace(
    /\/$/,
    ""
  );
  const endpoint = `https://${domain}/api/${API_VERSION}/graphql.json`;

  const next: { tags?: string[]; revalidate?: number | false } = {};
  if (tags?.length) next.tags = tags;
  if (revalidate !== undefined) next.revalidate = revalidate;

  let res: Response;
  try {
    res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": process.env.SHOPIFY_STOREFRONT_TOKEN!,
        Accept: "application/json"
      },
      body: JSON.stringify({ query, variables }),
      cache: Object.keys(next).length ? undefined : cache,
      next: Object.keys(next).length ? next : undefined
    });
  } catch (err) {
    throw new ShopifyError(
      `Network error contacting Shopify: ${(err as Error).message}`,
      undefined,
      query
    );
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ShopifyError(
      `Shopify HTTP ${res.status}: ${text.slice(0, 300)}`,
      res.status,
      query
    );
  }

  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) {
    throw new ShopifyError("Shopify GraphQL error", undefined, query, json.errors);
  }
  return json.data as T;
}
