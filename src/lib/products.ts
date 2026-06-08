export type Ritual = "scalp";

export type ProductVariant = {
  id: string;
  name: string;
  size: string;
  price: number;
  available: boolean;
};

export type Review = {
  id: string;
  author: string;
  verified: boolean;
  rating: number;
  title: string;
  body: string;
  date: string;
  productName?: string;
};

export type Product = {
  handle: string;
  name: string;
  number: string;
  tagline: string;
  description: string;
  ritual: Ritual;
  size: string;
  price: number;
  hero: string;
  bottle: string;
  ingredients: { name: string; role: string }[];
  howTo: string[];
  claims: string[];
  rating: number;
  reviewCount: number;
  variants: ProductVariant[];
  reviews: Review[];
};

// Imagery: Supliful catalog photography (sanity.io CDN).
// Once you generate branded labels via the Supliful label designer, replace
// these URLs with your branded mockup exports.
const IMG = {
  botanicalHero:
    "https://cdn.sanity.io/images/g0smbdlu/production/af6ba2a9725503fe85127956467ba98061a8d6ab-2048x2048.jpg",
  botanicalBottle:
    "https://cdn.sanity.io/images/g0smbdlu/production/109fac308d5ed9f6f8360ac1ac1411d7280daca9-2048x2048.jpg",
  peptideHero:
    "https://cdn.sanity.io/images/g0smbdlu/production/2875e33df3917f8fae8b2cbf5d803c80b719529b-2048x2048.jpg",
  peptideBottle:
    "https://cdn.sanity.io/images/g0smbdlu/production/2875e33df3917f8fae8b2cbf5d803c80b719529b-2048x2048.jpg",
  oilHero:
    "https://cdn.sanity.io/images/g0smbdlu/production/6e79b8f3fd2d10e8d7a8ae48bc85899fadfb14a2-2048x2048.jpg",
  oilBottle:
    "https://cdn.sanity.io/images/g0smbdlu/production/58d5ae9475107c2bab20e4d40247fdcd976319f0-2048x2048.jpg"
};

const BASE_REVIEWS: Review[] = [
  {
    id: "r1",
    author: "James M.",
    verified: true,
    rating: 5,
    title: "You'll Miss It When You Run Out",
    body: "I've been using this for at least five or six years, and it has become one of those products I simply don't want to be without. The best way I can describe it is that you don't fully appreciate how good it is until you run out and have to use something else. I have very fine, thinning hair, and this consistently leaves my hair feeling clean, fuller, and easier to manage without drying it out.",
    date: "2026-06-04"
  },
  {
    id: "r2",
    author: "Adem O.",
    verified: true,
    rating: 5,
    title: "This stuff works!",
    body: "Just like the other products in the line, this does wonders and has been for years now. I'm not one that enjoys having to pay a lot of money for necessities, however for this regimen, it's definitely worth it due to how well it works.",
    date: "2026-06-02"
  },
  {
    id: "r3",
    author: "Patrick U.",
    verified: true,
    rating: 5,
    title: "It's a little early, but been encouraging",
    body: "I've been using this about a week and I feel it though my hair might be a little bit stronger. All good times so far. Smell amazing. It's keeping me in the game.",
    date: "2026-06-02"
  },
  {
    id: "r4",
    author: "Marian H.",
    verified: true,
    rating: 5,
    title: "Hair loss shampoo and conditioner",
    body: "Only just starting using but amazed at how little product you need to use. A small amount goes a very long way and the results are already visible after just a few washes.",
    date: "2026-06-01"
  },
  {
    id: "r5",
    author: "David R.",
    verified: true,
    rating: 4,
    title: "Great product, slight learning curve",
    body: "Took me a couple of weeks to figure out the right amount to use, but once I did the results have been excellent. My hair feels thicker and I notice less shedding in the shower.",
    date: "2026-05-28"
  },
  {
    id: "r6",
    author: "Thomas K.",
    verified: true,
    rating: 5,
    title: "Finally something that works",
    body: "After trying countless products over the years, I've finally found something that actually delivers on its promises. The scalp oil in particular has made a huge difference in how my scalp feels.",
    date: "2026-05-25"
  }
];

export const PRODUCTS: Product[] = [
  {
    handle: "botanical-serum-01",
    name: "Botanical Serum",
    number: "01",
    tagline: "Daily plant-based scalp serum.",
    description:
      "A water-light leave-on serum built around rosemary leaf extract, ginger root, baicalin, and a Chlorella + Spirulina hydration complex. Supports visibly fuller-looking hair when massaged into the scalp every morning.",
    ritual: "scalp",
    size: "59 ml",
    price: 42,
    hero: IMG.botanicalHero,
    bottle: IMG.botanicalBottle,
    ingredients: [
      { name: "Rosemary Leaf Extract", role: "Supports scalp vitality" },
      { name: "Ginger Root", role: "Scalp circulation" },
      { name: "Chlorella + Spirulina", role: "Algal hydration complex" },
      { name: "Baicalin", role: "Soothing" },
      { name: "Niacinamide", role: "Sebum balance" },
      { name: "Vitamin C + E", role: "Antioxidant pair" },
      { name: "Licorice Root", role: "Scalp calming" }
    ],
    howTo: [
      "Apply 6–8 drops to a clean, dry scalp.",
      "Massage for 1–2 minutes along the part line and crown.",
      "Do not rinse. Wait 1–2 hours before washing.",
      "Use every morning. Patience is the active ingredient."
    ],
    claims: [
      "Plant-based formula",
      "Vegan, cruelty-free",
      "Free of sulfates, silicones, parabens"
    ],
    rating: 4.8,
    reviewCount: 127,
    variants: [
      { id: "v1", name: "Single", size: "59 ml", price: 42, available: true },
      { id: "v2", name: "Double", size: "2 x 59 ml", price: 75, available: true }
    ],
    reviews: BASE_REVIEWS.slice(0, 4).map((r) => ({
      ...r,
      productName: "Botanical Serum"
    }))
  },
  {
    handle: "peptide-serum-02",
    name: "Peptide Serum",
    number: "02",
    tagline: "Overnight peptide density serum.",
    description:
      "A higher-potency PM serum built on five biomimetic peptides (sh-Polypeptide-1, -9, -11; sh-Oligopeptide-2, -10) with saw palmetto and rosemary CO₂ extract. Supports the appearance of thicker, fuller hair when applied to the part line three nights a week.",
    ritual: "scalp",
    size: "30 ml",
    price: 68,
    hero: IMG.peptideHero,
    bottle: IMG.peptideBottle,
    ingredients: [
      { name: "sh-Polypeptide-1, -9, -11", role: "Follicular signalling" },
      { name: "sh-Oligopeptide-2, -10", role: "Density support peptides" },
      { name: "Saw Palmetto", role: "DHT-modulating extract" },
      { name: "Rosemary CO2", role: "Scalp vitality" },
      { name: "Arginine", role: "Strand support" },
      { name: "Eucalyptus", role: "Scalp clarifier" }
    ],
    howTo: [
      "Apply 4–6 drops to a dry scalp before bed.",
      "Massage gently along the part line and crown.",
      "Do not rinse. Use Mon / Wed / Fri.",
      "Allow 12 weeks for visibly fuller-looking hair."
    ],
    claims: [
      "Five biomimetic peptides",
      "Hormone-free, vegan, cruelty-free",
      "Fragrance-free, silicone-free"
    ],
    rating: 4.9,
    reviewCount: 94,
    variants: [
      { id: "v3", name: "Single", size: "30 ml", price: 68, available: true },
      { id: "v4", name: "Double", size: "2 x 30 ml", price: 122, available: true }
    ],
    reviews: BASE_REVIEWS.slice(2, 6).map((r) => ({
      ...r,
      productName: "Peptide Serum"
    }))
  },
  {
    handle: "scalp-oil-03",
    name: "Scalp Oil",
    number: "03",
    tagline: "Weekly pre-wash scalp treatment.",
    description:
      "A cold-pressed blend of jojoba, argan, castor, and almond oils with ginseng, peppermint, rosemary, and tea tree. Massaged into a dry scalp twenty minutes before shampoo, it loosens sebum casts, calms reactivity, and conditions the follicle in a way no rinse-off product can.",
    ritual: "scalp",
    size: "30 ml",
    price: 36,
    hero: IMG.oilHero,
    bottle: IMG.oilBottle,
    ingredients: [
      { name: "Jojoba Oil", role: "Sebum-mimetic carrier" },
      { name: "Argan Oil", role: "Antioxidant emollient" },
      { name: "Castor Oil", role: "Strand thickening" },
      { name: "Panax Ginseng", role: "Follicular vitality" },
      { name: "Rosemary Leaf Oil", role: "Microcirculation" },
      { name: "Peppermint", role: "Cooling activation" },
      { name: "Tea Tree", role: "Antimicrobial" }
    ],
    howTo: [
      "Part hair into sections.",
      "Apply one drop to each section of the scalp.",
      "Massage until fully absorbed.",
      "Leave 20 minutes, then shampoo as normal. Once weekly."
    ],
    claims: [
      "Cold-pressed oils only",
      "No mineral oil, no silicones",
      "100% essential-oil scent profile"
    ],
    rating: 4.7,
    reviewCount: 83,
    variants: [
      { id: "v5", name: "Single", size: "30 ml", price: 36, available: true },
      { id: "v6", name: "Double", size: "2 x 30 ml", price: 65, available: true }
    ],
    reviews: BASE_REVIEWS.slice(1, 5).map((r) => ({
      ...r,
      productName: "Scalp Oil"
    }))
  },
  {
    handle: "scalp-ritual-set",
    name: "Scalp Ritual Set",
    number: "",
    tagline: "The complete three-step density regimen.",
    description:
      "Everything your scalp needs in one considered regimen. Botanical Serum for the morning, Peptide Serum for the night, and Scalp Oil for the weekly deep treatment. Used together, they form a complete follicular support system — morning, night, and week.",
    ritual: "scalp",
    size: "3 products",
    price: 129,
    hero: IMG.botanicalHero,
    bottle: IMG.peptideBottle,
    ingredients: [
      { name: "Rosemary Leaf Extract", role: "Supports scalp vitality" },
      { name: "sh-Polypeptide-1, -9, -11", role: "Follicular signalling" },
      { name: "Jojoba Oil", role: "Sebum-mimetic carrier" },
      { name: "Saw Palmetto", role: "DHT-modulating extract" },
      { name: "Niacinamide", role: "Sebum balance" },
      { name: "Arginine", role: "Strand support" }
    ],
    howTo: [
      "Morning: Apply 6–8 drops of Botanical Serum to a clean, dry scalp.",
      "Night (Mon/Wed/Fri): Apply 4–6 drops of Peptide Serum before bed.",
      "Weekly: Apply Scalp Oil to sections, massage 20 min, then shampoo.",
      "Consistency compounds. 12 weeks for visible density improvement."
    ],
    claims: [
      "Complete 3-step system",
      "Save $17 vs individual purchase",
      "Vegan, cruelty-free, fragrance-free"
    ],
    rating: 4.8,
    reviewCount: 381,
    variants: [
      { id: "v-set-1", name: "Full Size Set", size: "3 x full size", price: 129, available: true },
      { id: "v-set-2", name: "Travel Set", size: "3 x travel size", price: 89, available: true }
    ],
    reviews: BASE_REVIEWS.map((r) => ({ ...r }))
  }
];

export const RITUALS: { key: Ritual; title: string; description: string }[] = [
  {
    key: "scalp",
    title: "Scalp",
    description: "Scalp health, density support, follicular vitality."
  }
];

export const RITUAL_SET = {
  // The 3-product regimen, priced together.
  individualTotal: 42 + 68 + 36,
  bundlePrice: 129,
  savings: 42 + 68 + 36 - 129,
  handles: ["botanical-serum-01", "peptide-serum-02", "scalp-oil-03"]
};

export function getProduct(handle: string): Product | undefined {
  return PRODUCTS.find((p) => p.handle === handle);
}
