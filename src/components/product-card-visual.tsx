import { CATEGORIES, type CategoryId, type Product } from "@/lib/catalog";
import { useI18n, useProductText } from "@/lib/i18n";
import { FlippableCreditCard, type CardTheme } from "@/components/ui/credit-debit-card";

const THEME_BY_CATEGORY: Record<CategoryId, CardTheme> = {
  basique: "black",
  classique: "silver",
  premium: "gold",
};

function cardNumber(price: number) {
  const base = String(4917_0000_0000 + price * 137)
    .padStart(12, "0")
    .slice(-12);
  return `4917 ${base.slice(0, 4)} ${base.slice(4, 8)} ${base.slice(8, 12)}`;
}

export function ProductCardVisual({
  product,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const productText = useProductText();
  const { t } = useI18n();
  const category = CATEGORIES.find((item) => item.id === product.category);

  return (
    <div className={compact ? "w-full max-w-[180px]" : "w-full"}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl p-3">
        <FlippableCreditCard
          theme={THEME_BY_CATEGORY[product.category]}
          label={category ? t(category.label) : product.category}
          cardholderName="SERVICEK917"
          cardNumber={cardNumber(product.price)}
          expiryDate="12/29"
          cvv="917"
        />
        <span className="absolute left-4 top-4 z-10 max-w-[calc(100%-2rem)] truncate rounded-full bg-background/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest">
          {productText(product).ceiling}
        </span>
      </div>
    </div>
  );
}
