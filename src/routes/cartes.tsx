import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck, ShoppingBag, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TrustSection } from "@/components/trust-section";
import { ProductRails } from "@/components/product-rails";
import { useCart } from "@/lib/cart";
import { useI18n } from "@/lib/i18n";


const TITLE = "Nos cartes cadeaux — Servicek917officiel";
const DESC =
  "Formules de 100 €, 150 €, 250 €, 300 €, 500 € et 1 000 € avec plafonds jusqu'à 25 000 €. Ajoutez au panier et envoyez votre coupon.";

export const Route = createFileRoute("/cartes")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://servicek917officiel.com/cartes" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://servicek917officiel.com/cartes" },
    ],
  }),
  component: CartesPage,
});

function CartesPage() {
  const { count, total, clear } = useCart();
  const { t, money } = useI18n();

  return (
    <main className="bg-background">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] min-h-[320px] w-full lg:h-[110vh]">
          <img
            src="/p7.jpeg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-x pb-8 pt-6 sm:pb-10 sm:pt-8">
              <p className="eyebrow text-white/70">{t("Catalogue officiel")}</p>
              <h1 className="display-lg mt-2 max-w-[18ch] sm:mt-3 text-white">
                {t("Choisissez la carte qui vous correspond.")}
              </h1>
              <p className="mt-3 max-w-[50ch] text-xs leading-relaxed text-white/70 sm:mt-4 sm:text-sm sm:text-base">
                {t(
                  "Chaque formule indique le montant chargé et le plafond d'utilisation. Achat en ligne ou retrait au guichet, sans abonnement ni frais cachés.",
                )}
              </p>
              <p className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs text-white backdrop-blur-sm sm:mt-5 sm:gap-2 sm:px-4 sm:py-2 sm:text-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-success sm:h-4 sm:w-4" /> {t(
                  "Codes testés avant envoi • Remboursement sous conditions",
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <TrustSection />

      <div className="container-x">
        <ProductRails />
      </div>

      {count > 0 && (
        <div className="fixed inset-x-2 bottom-3 z-30 sm:inset-x-4 sm:bottom-4 lg:inset-x-auto lg:right-6 lg:w-[min(420px,calc(100vw-3rem))]">
          <div className="flex items-center justify-between gap-2 rounded-2xl bg-ink px-3 py-2.5 text-ink-foreground shadow-lift sm:gap-3 sm:px-4 sm:py-3">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <ShoppingBag className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" aria-hidden="true" />
              <span className="truncate text-xs tabular-nums sm:text-sm">
              {count > 1
                ? t("{count} articles • {total}", {
                    count,
                    total: money(total),
                  })
                : t("{count} article • {total}", {
                    count,
                    total: money(total),
                  })}
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

      <SiteFooter />
    </main>
  );
}
