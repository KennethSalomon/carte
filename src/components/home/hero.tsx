import { Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { FlippableCreditCard } from "@/components/ui/credit-debit-card";
import { CATEGORIES, type CategoryId } from "@/lib/catalog";

const CARD_THEMES: { category: CategoryId; rot: number; delay: number; dur: number }[] = [
  { category: "basique", rot: 5.5, delay: 0.02, dur: 1.06 },
  { category: "classique", rot: 8, delay: 0.25, dur: 1.12 },
  { category: "premium", rot: 9, delay: 0.48, dur: 1.18 },
];

const THEME_BY_CATEGORY: Record<CategoryId, "black" | "silver" | "gold"> = {
  basique: "black",
  classique: "silver",
  premium: "gold",
};



const PARTNERS = [
  "▣ Transcash",
  "◈ PCS",
  "⌁ Neosurf",
  "✦ Visa",
  "◉ Mastercard",
];

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative flex min-h-[100svh] w-full flex-col overflow-hidden"
    >
      {/* background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/p10.jpg"
          alt=""
          aria-hidden
          className="h-full w-full object-cover"
        />
      </div>

      {/* soft aurora backdrop */}
      <div
        aria-hidden
        className="k917-aurora pointer-events-none absolute -right-1/4 -top-1/3 h-[90vh] w-[90vw] rounded-full opacity-40 blur-3xl z-[1]"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in oklab, var(--accent) 30%, transparent), transparent)",
        }}
      />


      <div className="relative z-10 flex flex-1 flex-col-reverse items-stretch xl:block">
        {/* card stack */}
        <div className="pointer-events-none relative mx-auto mt-4 h-[42vh] w-full max-w-[560px] px-5 sm:h-[46vh] xl:absolute xl:right-0 xl:top-[-6vh] xl:mx-0 xl:h-[56vh] xl:w-[62vw] xl:max-w-none xl:px-0">
          {CARD_THEMES.map((c, i) => {
            const cat = CATEGORIES.find((ct) => ct.id === c.category)!;
            return (
              <div
                key={c.category}
                className="k917-hero-card absolute overflow-hidden rounded-xl"
                style={
                  {
                    "--rot": `${c.rot}deg`,
                    "--card-index": i,
                    aspectRatio: "16 / 10",
                    opacity: 0,
                    animation: `k917-card-in ${c.dur}s cubic-bezier(0.16,1,0.3,1) ${c.delay}s forwards`,
                    zIndex: i,
                  } as React.CSSProperties
                }
              >
                <FlippableCreditCard
                  theme={THEME_BY_CATEGORY[c.category]}
                  label={cat.label}
                  cardholderName="SERVICEK917"
                  cardNumber="4917 0000 0000"
                  expiryDate="12/29"
                  cvv="917"
                />
              </div>
            );
          })}
        </div>

        {/* copy */}
        <div className="container-x relative z-10 pb-10 pt-8 xl:pb-[10vh] xl:pt-[22vh]">
          <div className="max-w-[640px] xl:max-w-[52vw]">
            <h1 className="display-xl">
              <span
                className="k917-fade-in-up block text-white"
                style={{ animationDelay: "0.5s" }}
              >
                {t("Cartes cadeaux prépayées")}
              </span>
            </h1>
            <p
              className="k917-fade-in-up mt-6 max-w-[46ch] text-[15px] leading-[1.6] sm:text-[17px]"
              style={{ animationDelay: "0.9s", color: "#D9D9D9" }}
            >
              {t(
                "Choisissez votre formule et envoyez votre recharge Transcash, PCS ou Neosurf. Votre code est contrôlé puis traité par WhatsApp ou e-mail — un conseiller reste joignable à chaque étape.",
              )}
            </p>
            <div
              className="k917-fade-in-up mt-8 flex flex-wrap items-center gap-4"
              style={{ animationDelay: "1.1s" }}
            >
              <Link
                to="/cartes"
                className="inline-flex h-12 items-center rounded-full bg-primary px-7 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                {t("Voir les formules")}
              </Link>
              <Link
                to="/dossier"
                className="inline-flex items-center gap-1 text-sm font-medium underline-offset-4 hover:underline"
              >
                {t("Ouvrir un dossier")} <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* ticker */}
          <div
            aria-hidden
            className="relative mt-10 hidden overflow-hidden sm:block xl:absolute xl:bottom-[7.5vh] xl:left-[clamp(300px,19.6vw,390px)] xl:right-8 xl:mt-0"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 8%, black 92%, transparent)",
            }}
          >
            <div
              className="flex w-max gap-10 whitespace-nowrap text-[13px] font-semibold text-muted-foreground"
              style={{ animation: "k917-ticker 6.2s linear infinite" }}
            >
              {[...PARTNERS, ...PARTNERS].map((p, i) => (
                <span key={`${p}-${i}`}>{p}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
