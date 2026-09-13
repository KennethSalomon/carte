import { memo, useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES, PRODUCTS, type Product } from "@/lib/catalog";
import { useCart } from "@/lib/cart";
import { useI18n, useProductText } from "@/lib/i18n";
import { ProductCardVisual } from "@/components/product-card-visual";

const RailCard = memo(function RailCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { t, money } = useI18n();
  const productText = useProductText();
  const [qty, setQty] = useState(1);

  return (
    <article className="group flex w-[220px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft transition-shadow hover:shadow-lift sm:w-[262px]">
      <ProductCardVisual product={product} />

      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <h3 className="truncate text-sm font-semibold tracking-tight sm:text-[15px]">
          {productText(product).name}
        </h3>
        <p className="mt-1 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
          {productText(product).description}
        </p>

        <div className="mt-3 flex items-center justify-between gap-2 sm:mt-4">
          <span className="text-base font-medium tracking-tight sm:text-lg">{money(product.price)}</span>
          <div className="flex shrink-0 items-center gap-0.5 rounded-full border border-border p-0.5">
            <button
              type="button"
              aria-label={t("Diminuer la quantité de {name}", { name: productText(product).name })}
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-secondary sm:h-7 sm:w-7"
            >
              <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
            <span className="w-5 text-center text-[11px] font-semibold tabular-nums sm:w-6 sm:text-xs">{qty}</span>
            <button
              type="button"
              aria-label={t("Augmenter la quantité de {name}", { name: productText(product).name })}
              onClick={() => setQty((q) => Math.min(99, q + 1))}
              className="inline-flex h-6 w-6 items-center justify-center rounded-full hover:bg-secondary sm:h-7 sm:w-7"
            >
              <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            add(product.id, qty);
            toast.success(t("{name} ajoutée au panier", { name: productText(product).name }), {
              description: t("Quantité : {qty}", { qty }),
            });
          }}
          className="mt-3 inline-flex h-9 items-center justify-center gap-2 rounded-full bg-primary text-xs font-medium text-primary-foreground transition-transform hover:-translate-y-0.5 sm:mt-4 sm:h-10"
        >
          <ShoppingBag className="h-3.5 w-3.5" /> {t("Ajouter au panier")}
        </button>
      </div>
    </article>
  );
});

export function ProductRail({
  id,
  label,
  tagline,
  blurb,
  products,
}: {
  id: string;
  label: string;
  tagline: string;
  blurb: string;
  products: Product[];
}) {
  const { t } = useI18n();
  const scroller = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const sync = useCallback(() => {
    const el = scroller.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, [sync]);

  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(260, el.clientWidth * 0.8), behavior: "smooth" });
  };

  const btn =
    "inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card transition-opacity disabled:opacity-30";

  return (
    <section id={id} className="scroll-mt-24 py-5 sm:py-7">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 border-b border-border pb-4">
        <div className="min-w-0">
          <span className="eyebrow">{t(tagline)}</span>
          <h3 className="mt-1 truncate text-xl font-medium tracking-tight sm:text-2xl">
            {t(label)}
          </h3>
          <p className="mt-1 hidden max-w-[60ch] text-sm text-muted-foreground sm:block">
            {t(blurb)}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            className={btn}
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            aria-label={t("Faire défiler {label} vers la gauche", { label })}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            className={btn}
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            aria-label={t("Faire défiler {label} vers la droite", { label })}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        onScroll={sync}
        className="k917-rail mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2"
      >
        {products.map((p) => (
          <RailCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export function ProductRails({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      {CATEGORIES.map((c) => (
        <ProductRail
          key={c.id}
          id={c.id}
          label={c.label}
          tagline={c.tagline}
          blurb={c.blurb}
          products={PRODUCTS.filter((p) => p.category === c.id)}
        />
      ))}
    </div>
  );
}
