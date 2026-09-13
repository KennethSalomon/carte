export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  ceilingValue: number;
  category: CategoryId;
  ceiling: string;
  description: string;
  image: string;
  perks: string[];
};

export type CategoryId = "basique" | "classique" | "premium";

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  tagline: string;
  blurb: string;
}[] = [
  {
    id: "basique",
    label: "Carte Basique",
    tagline: "Premiers achats",
    blurb:
      "Idéale pour un premier achat en ligne ou un retrait rapide au guichet.",
  },
  {
    id: "classique",
    label: "Carte Classique",
    tagline: "La plus demandée",
    blurb: "Le meilleur équilibre entre montant chargé et plafond disponible.",
  },
  {
    id: "premium",
    label: "Carte Premium",
    tagline: "Hauts plafonds",
    blurb:
      "Pour les gros volumes, avec accompagnement prioritaire d'un conseiller.",
  },
];

const IMG = {
  coral:
    "https://images.unsplash.com/photo-1770975766702-3daf7664cd54?auto=format&fit=crop&fm=jpg&q=88&w=1200",
  green:
    "https://images.unsplash.com/photo-1770975765649-8cab4ed675b3?auto=format&fit=crop&fm=jpg&q=88&w=1200",
  dark: "https://images.unsplash.com/photo-1770975765334-a19d9cb83dcc?auto=format&fit=crop&fm=jpg&q=88&w=1200",
  orange:
    "https://images.unsplash.com/photo-1707324148764-99647364afa3?auto=format&fit=crop&fm=jpg&q=88&w=1200",
  silver:
    "https://images.unsplash.com/photo-1707581471193-183252f0d85b?auto=format&fit=crop&fm=jpg&q=88&w=1200",
  folded:
    "https://images.unsplash.com/photo-1770975765382-38dda265ae89?auto=format&fit=crop&fm=jpg&q=88&w=1200",
};

const PERKS: Record<CategoryId, string[]> = {
  basique: [
    "Code envoyé sous 10 min",
    "Achat en ligne & retrait",
    "Sans abonnement",
  ],
  classique: ["Activation immédiate", "Plafond renforcé", "Support 7j/7"],
  premium: ["Traitement prioritaire", "Plafond maximal", "Conseiller dédié"],
};

const nf = new Intl.NumberFormat("fr-FR");

const IMAGES: Record<CategoryId, string[]> = {
  basique: [IMG.coral, IMG.green],
  classique: [IMG.silver, IMG.folded],
  premium: [IMG.dark, IMG.orange],
};

/**
 * Grille tarifaire officielle (points d'ancrage fournis par le client) :
 * basique   100 € → 1 000 €   /  150 € → 2 000 €
 * classique 250 € → 3 000 €   /  300 € → 5 000 €
 * premium   500 € → 15 000 €  / 1 000 € → 25 000 €
 * Les autres formules sont interpolées linéairement entre ces ancres,
 * ce qui garantit une progression cohérente du plafond.
 */
const RANGES: Record<
  CategoryId,
  { start: number; step: number; count: number; a: number; b: number }
> = {
  // ratio = a + (price - start) * b
  basique: { start: 100, step: 5, count: 20, a: 10, b: 3.3333 / 50 },
  classique: { start: 250, step: 5, count: 20, a: 12, b: 4.6667 / 50 },
  premium: { start: 500, step: 25, count: 21, a: 30, b: -5 / 500 },
};

function buildOffers() {
  const offers: {
    category: CategoryId;
    price: number;
    ceilingValue: number;
    image: string;
  }[] = [];

  (Object.keys(RANGES) as CategoryId[]).forEach((category) => {
    const { start, step, count, a, b } = RANGES[category];
    for (let i = 0; i < count; i += 1) {
      const price = start + i * step;
      const ratio = a + (price - start) * b;
      const ceilingValue = Math.round((price * ratio) / 100) * 100;
      offers.push({
        category,
        price,
        ceilingValue,
        image: IMAGES[category][i % IMAGES[category].length] ?? IMG.silver,
      });
    }
  });

  return offers;
}

const OFFERS = buildOffers();

export const PRODUCTS: Product[] = OFFERS.map(
  ({ category, price, ceilingValue, image }) => ({
    id: `f${price}`,
    slug: `formule-${price}`,
    name: `Formule de ${nf.format(price)} €`,
    price,
    ceilingValue,
    category,
    ceiling: `${nf.format(ceilingValue)} € sur la carte`,
    description: `La carte de ${nf.format(price)} € vous offre ${nf.format(
      ceilingValue,
    )} € sur la carte. Achat en ligne ou retrait au guichet.`,
    image,
    perks: PERKS[category],
  }),
);

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}
