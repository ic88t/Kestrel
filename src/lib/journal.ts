export type JournalEntry = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readMin: number;
  date: string;
  image: string;
};

export const JOURNAL: JournalEntry[] = [
  {
    slug: "the-science-of-density",
    title: "The science of density.",
    excerpt:
      "Why the conversation around hair loss has been wrong for decades — and what the follicle actually needs.",
    category: "Science",
    readMin: 8,
    date: "2026.04",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=1600&auto=format&fit=crop"
  },
  {
    slug: "rituals-not-routines",
    title: "Rituals, not routines.",
    excerpt:
      "On the difference between performing a habit and inhabiting one. A short manifesto.",
    category: "Philosophy",
    readMin: 4,
    date: "2026.03",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1600&auto=format&fit=crop"
  },
  {
    slug: "what-aging-asks-of-hair",
    title: "What aging asks of hair.",
    excerpt:
      "Sebum changes. Diameter narrows. Cycle shortens. Three quiet shifts after 35 — and the corrections.",
    category: "Longevity",
    readMin: 11,
    date: "2026.02",
    image:
      "https://images.unsplash.com/photo-1503443207922-dff7d543fd0e?q=80&w=1600&auto=format&fit=crop"
  }
];
