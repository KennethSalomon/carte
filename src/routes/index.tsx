import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShoppingBag, ShieldCheck, Truck, Zap, Trash2 } from "lucide-react";
import { Hero } from "@/components/home/hero";
import { ProductRails } from "@/components/product-rails";
import { SiteHeader } from "@/components/site-header";

import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import { useI18n } from "@/lib/i18n";
import { useCart } from "@/lib/cart";

const TITLE = "Servicek917officiel — Cartes cadeaux prépayées en ligne";
const DESC =
  "Achetez vos cartes cadeaux prépayées de 100 € à 1 000 €. Envoyez votre recharge Transcash, PCS ou Neosurf. Confirmation par WhatsApp et e-mail.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://servicek917officiel.com/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
    links: [
      { rel: "canonical", href: "https://servicek917officiel.com/" },
    ],
  }),
  component: Index,
});

function Index() {
  const { t, money } = useI18n();
  const { count, total, hydrated, clear } = useCart();

  const features = [
    {
      id: "feature-1",
      title: t("Contrôle manuel et sécurisé"),
      summary: t(
        "Chaque demande de coupon est vérifiée manuellement par notre équipe avant validation. Aucun traitement automatique, une sécurité maximale pour vos transactions.",
      ),
      icon: ShieldCheck,
    },
    {
      id: "feature-2",
      title: t("Traitement rapide"),
      summary: t(
        "Une fois votre coupon transmis, notre équipe vous confirme la suite par WhatsApp ou e-mail dans les plus brefs délais. Pas d'attente inutile.",
      ),
      icon: Zap,
    },
    {
      id: "feature-3",
      title: t("Garantie de remboursement"),
      summary: t(
        "En cas de problème ou de non-conformité, notre politique de remboursement claire vous protège. Conditions transparentes, sans surprise.",
      ),
      icon: CheckCircle2,
    },
    {
      id: "feature-4",
      title: t("Livraison instantanée"),
      summary: t(
        "Après confirmation, votre carte cadeau est activée immédiatement. Recevez vos codes et références sans délai de livraison physique.",
      ),
      icon: Truck,
    },
  ];

  return (
    <main>
      <SiteHeader />
      <Hero />

      {/* Features Section */}
      <section className="bg-background py-10 sm:py-12 md:py-16">
        <div className="container-x">
          <div className="mb-8 text-center sm:mb-10 md:mb-12">
            <div className="mb-4 inline-flex items-center rounded-full border border-border bg-secondary px-3 py-1 text-[10px] font-medium text-secondary-foreground sm:px-4 sm:py-1.5 sm:text-xs">
              {t("Pourquoi nous choisir")}
            </div>
            <h2 className="display-lg max-w-[25ch] sm:max-w-[30ch]">
              {t("La confiance avant tout")}
            </h2>
            <p className="mt-3 max-w-[60ch] text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              {t(
                "Nous mettons en place des processus rigoureux pour garantir la sécurité de vos transactions et la qualité de notre service.",
              )}
            </p>
          </div>
          <div className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.id}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft transition-transform hover:-translate-y-1 sm:p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 sm:mb-5 sm:h-14 sm:w-14">
                  <feature.icon className="h-6 w-6 text-primary sm:h-7 sm:w-7" />
                </div>
                <h3 className="mb-2 text-sm font-semibold sm:mb-3 sm:text-base">
                  {feature.title}
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {feature.summary}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center sm:mt-10 md:mt-12">
            <Link
              to="/remboursement"
              className="inline-flex items-center gap-2 text-xs font-medium text-primary underline-offset-4 hover:underline sm:text-sm"
            >
              {t("Découvrir nos garanties")}
              <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-background py-10 sm:py-12 md:py-16">
        <div className="container-x">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground sm:h-7 sm:w-7 sm:text-xs">
              3
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-[10px] font-medium sm:px-4 sm:py-1.5 sm:text-xs">
              {t("Nos cartes")}
            </span>
          </div>
          <h2 className="display-lg mt-5 max-w-[20ch] sm:mt-7">
            {t("Parcourez chaque gamme, ajoutez au panier.")}
          </h2>
          <ProductRails className="mt-5 sm:mt-6" />
        </div>
      </section>
      {hydrated && count > 0 && (
        <div className="fixed inset-x-2 bottom-3 z-30 sm:inset-x-4 sm:bottom-4 lg:inset-x-auto lg:right-6 lg:w-[min(420px,calc(100vw-3rem))]">
          <div className="flex items-center justify-between gap-2 rounded-2xl bg-ink px-3 py-2.5 text-ink-foreground shadow-lift sm:gap-3 sm:px-4 sm:py-3">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <ShoppingBag className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden="true" />
              <span className="truncate text-xs tabular-nums sm:text-sm">
                {t("{count} articles • {total}", { count, total: money(total) })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={clear}
                aria-label={t("Vider le panier")}
                className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-ink-foreground/10 px-2.5 text-xs font-medium text-ink-foreground transition-colors hover:bg-ink-foreground/20 sm:h-10 sm:px-3"
              >
                <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </button>
              <Link
                to="/panier"
                className="inline-flex h-9 shrink-0 items-center rounded-full bg-accent px-3 text-xs font-medium text-accent-foreground sm:h-10 sm:px-4 sm:text-sm"
              >
                {t("Voir le panier")}
              </Link>
            </div>
          </div>
        </div>
      )}
      <section className="bg-background py-10 sm:py-12 md:py-16">
        <div className="container-x">
          <ContactSection />
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
