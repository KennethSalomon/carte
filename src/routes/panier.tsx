import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { useCart } from "@/lib/cart";
import { useI18n, useProductText } from "@/lib/i18n";
import { ProductCardVisual } from "@/components/product-card-visual";

const TITLE = "Mon panier — Servicek917officiel";
const DESC =
  "Vérifiez vos cartes cadeaux, ajustez les quantités et finalisez votre commande en paiement sécurisé.";

export const Route = createFileRoute("/panier")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PanierPage,
});

function PanierPage() {
  const { items, total, count, setQty, remove, clear, hydrated } = useCart();
  const { t, money } = useI18n();
  const productText = useProductText();

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container-x py-8 sm:py-10">
        <p className="eyebrow">{t("Étape 1 sur 4")}</p>
        <h1 className="display-lg mt-2 sm:mt-3">{t("Votre panier")}</h1>

        {!hydrated ? (
          <p className="mt-8 text-xs text-muted-foreground sm:mt-10 sm:text-sm">{t("Chargement…")}</p>
        ) : items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center sm:mt-10 sm:p-10">
            <p className="text-base font-medium sm:text-lg">{t("Votre panier est vide.")}</p>
            <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
              {t("Parcourez nos formules de 100 € à 1 000 €.")}
            </p>
            <Link
              to="/cartes"
              className="mt-4 inline-flex h-10 items-center rounded-full bg-primary px-5 text-xs font-medium text-primary-foreground sm:mt-6 sm:h-12 sm:px-7 sm:text-sm"
            >
              {t("Voir les cartes")}
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:gap-8 lg:grid-cols-[1fr_380px]">
            <ul className="space-y-3 sm:space-y-4">
              {items.map(({ product, qty }) => (
                <li
                  key={product.id}
                  className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center sm:gap-4"
                >
                  <ProductCardVisual product={product} compact />
                  <div className="min-w-0 flex-1">
                    <h2 className="text-sm font-medium sm:text-base">{productText(product).name}</h2>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      {t("Plafond {ceiling}", { ceiling: productText(product).ceiling })}
                    </p>
                    <p className="mt-0.5 text-xs font-medium sm:mt-1 sm:text-sm">
                      {t("{price} l'unité", { price: money(product.price) })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex items-center gap-1 rounded-full border border-border p-1">
                      <button
                        type="button"
                        aria-label={t("Diminuer")}
                        onClick={() => setQty(product.id, qty - 1)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary sm:h-8 sm:w-8"
                      >
                        <Minus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                      <span className="w-6 text-center text-xs font-semibold tabular-nums sm:w-7 sm:text-sm">
                        {qty}
                      </span>
                      <button
                        type="button"
                        aria-label={t("Augmenter")}
                        onClick={() => setQty(product.id, qty + 1)}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full hover:bg-secondary sm:h-8 sm:w-8"
                      >
                        <Plus className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      </button>
                    </div>
                    <span className="w-20 text-right text-xs font-medium tabular-nums sm:w-24 sm:text-sm">
                      {money(product.price * qty)}
                    </span>
                    <button
                      type="button"
                      aria-label={t("Retirer {name}", { name: productText(product).name })}
                      onClick={() => remove(product.id)}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-destructive sm:h-9 sm:w-9"
                    >
                      <Trash2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    </button>
                  </div>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm(t("Voulez-vous vraiment vider le panier ?"))) {
                      clear();
                    }
                  }}
                  className="text-xs text-muted-foreground underline-offset-4 hover:underline sm:text-sm"
                >
                  {t("Vider le panier")}
                </button>
              </li>
            </ul>

            <aside className="h-fit rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-base font-medium sm:text-lg">{t("Récapitulatif")}</h2>
              <dl className="mt-3 space-y-2 text-xs sm:mt-5 sm:space-y-3 sm:text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t("Articles")}</dt>
                  <dd className="tabular-nums">{count}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">{t("Frais de service")}</dt>
                  <dd className="text-success">{t("Offerts")}</dd>
                </div>
                <div className="flex justify-between border-t border-border pt-2 text-sm font-medium sm:pt-3 sm:text-base">
                  <dt>{t("Total à régler")}</dt>
                  <dd className="tabular-nums">{money(total)}</dd>
                </div>
              </dl>

              <Link
                to="/paiement"
                className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-full bg-accent text-xs font-medium text-accent-foreground transition-transform hover:-translate-y-0.5 sm:mt-6 sm:h-12 sm:text-sm"
              >
                {t("Transmettre le coupon")}
              </Link>
              <p className="mt-3 flex items-start gap-2 text-[10px] leading-relaxed text-muted-foreground sm:mt-4 sm:text-xs">
                <ShieldCheck className="mt-0.5 h-3 w-3 shrink-0 text-success sm:h-4 sm:w-4" />
                {t(
                  "Le coupon est contrôlé par la société avant toute confirmation.",
                )}
              </p>
            </aside>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
