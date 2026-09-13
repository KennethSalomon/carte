import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageCircle, Quote, Star } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import OrbitlyRemoteTalentHero from "@/components/ui/orbitly-hero";
import { LiquidCard } from "@/components/ui/liquid-glass-card";
import { SITE, whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

type Review = {
  name: string;
  city: string;
  stars: number;
  text: string;
  tag: string;
};

const TITLE = "Preuves & Avis — Servicek917officiel";
const DESC =
  "Retours vérifiés de clients ayant reçu leurs cartes cadeaux : délais de livraison, plafonds respectés et suivi WhatsApp.";

export const Route = createFileRoute("/avis")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://servicek917officiel.com/avis" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://servicek917officiel.com/avis" },
    ],
  }),
  component: AvisPage,
});

const REVIEWS = [
  {
    name: "Amélie R.",
    city: "Lyon",
    stars: 5,
    text: "Commande d'une carte 250 € un dimanche soir, code reçu en 9 minutes sur WhatsApp. Le conseiller a vérifié l'activation avec moi.",
    tag: "Carte Classique",
  },
  {
    name: "Karim B.",
    city: "Marseille",
    stars: 5,
    text: "J'ai payé par Transcash, j'avais peur du délai. Réponse immédiate, plafond respecté, retrait au guichet sans souci.",
    tag: "Paiement coupon",
  },
  {
    name: "Sofia M.",
    city: "Lille",
    stars: 4,
    text: "Le premier code avait un souci, dossier ouvert le matin, remplacé dans l'après-midi. Service sérieux et joignable.",
    tag: "Traitement de dossier",
  },
  {
    name: "Lucas D.",
    city: "Bordeaux",
    stars: 5,
    text: "Formule 1 000 € pour des achats pro. Demande envoyée le matin, codes transmis le midi. Facture et suivi impeccables.",
    tag: "Carte Premium",
  },
  {
    name: "Nadia K.",
    city: "Toulouse",
    stars: 5,
    text: "Ce que j'apprécie : on sait exactement quel plafond on obtient avant de payer. Aucune mauvaise surprise.",
    tag: "Carte Basique",
  },
  {
    name: "Étienne P.",
    city: "Nantes",
    stars: 5,
    text: "Deuxième commande. Le conseiller reconnaît le dossier, tout va plus vite. C'est ce que j'attends d'un service.",
    tag: "Client fidèle",
  },
];

function ReviewCard({ review: r }: { review: Review }) {
  return (
    <LiquidCard className="w-[280px] shrink-0 p-4 sm:w-[300px] sm:p-5">
      <figure className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <Quote className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
          <div className="flex items-center gap-1" aria-label={`${r.stars} sur 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < r.stars ? "fill-accent text-accent" : "text-border"} sm:h-3.5 sm:w-3.5`}
              />
            ))}
          </div>
        </div>
        <blockquote className="mt-3 flex-1 text-xs leading-relaxed sm:mt-4 sm:text-sm">
          {r.text}
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-2 border-t border-border pt-3 sm:mt-5 sm:gap-3 sm:pt-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-ink-foreground sm:h-9 sm:w-9 sm:text-xs">
            {r.name.charAt(0)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xs font-medium sm:text-sm">
              {r.name} · {r.city}
            </span>
            <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-muted-foreground sm:gap-1.5 sm:text-xs">
              <span className="h-1 w-1 rounded-full bg-success sm:h-1.5 sm:w-1.5" aria-hidden="true" /> {r.tag} — retour partagé
            </span>
          </span>
        </figcaption>
      </figure>
    </LiquidCard>
  );
}

const STATS = [
  { v: "Clair", l: "montants et plafonds affichés avant la demande" },
  { v: "Direct", l: "échange avec un conseiller sur WhatsApp" },
  { v: "Suivi", l: "référence conservée pour chaque demande" },
  { v: "7j/7", l: "assistance téléphone & WhatsApp" },
];

function AvisPage() {
  const { t } = useI18n();
  return (
    <main className="bg-background">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] min-h-[320px] w-full lg:h-[80vh]">
          <img
            src="/p2.jpeg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-x pb-8 pt-6 sm:pb-10 sm:pt-8">
              <p className="eyebrow text-white/70">{t("Preuves & Avis")}</p>
              <h1 className="display-lg mt-2 max-w-[18ch] sm:mt-3 text-white">
                {t("Ce que disent les clients qui ont déjà commandé.")}
              </h1>
              <p className="mt-3 max-w-[50ch] text-xs leading-relaxed text-white/70 sm:mt-4 sm:text-sm">
                Les témoignages ci-dessous sont des exemples de retours représentatifs
                de l'expérience recherchée. Ils ne constituent pas des avis vérifiés
                par une plateforme indépendante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OrbitlyRemoteTalentHero />

      <section className="container-x py-8 sm:py-10">

        <div className="mt-6 grid gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="rounded-2xl bg-surface-muted p-4 sm:p-6">
              <p className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl">{s.v}</p>
              <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm">{s.l}</p>
            </div>
          ))}
        </div>

        <StaggerTestimonials />

        <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-ink p-5 text-ink-foreground sm:mt-12 sm:flex-row sm:items-center sm:gap-4 sm:p-7">
          <p className="text-xs leading-relaxed sm:text-sm">
            Vous avez commandé chez {SITE.name} ? Envoyez votre retour, nous le
            publions tel quel.
          </p>
          <a
            href={whatsappLink("Bonjour, je souhaite laisser un avis sur ma commande.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-success px-5 text-xs font-medium text-success-foreground sm:h-11 sm:px-6 sm:text-sm sm:ml-auto"
          >
            <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Laisser un avis
          </a>
          <Link
            to="/cartes"
            className="inline-flex h-10 items-center justify-center rounded-full bg-ink-foreground px-5 text-xs font-medium text-ink sm:h-11 sm:px-6 sm:text-sm"
          >
            Commander
          </Link>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
