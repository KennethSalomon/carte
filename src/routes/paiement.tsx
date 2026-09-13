import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CheckCircle2, Lock, Mail, MessageCircle, Ticket } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCart } from "@/lib/cart";
import { useI18n, useProductText } from "@/lib/i18n";
import { ProductCardVisual } from "@/components/product-card-visual";
import { SITE, formatEUR, mailtoLink, orderReference, whatsappLink } from "@/lib/site";

const TITLE = "Paiement sécurisé — Servicek917officiel";
const DESC =
  "Envoyez votre code Transcash, PCS ou Neosurf pour traiter votre commande. Confirmation par e-mail et WhatsApp.";

export const Route = createFileRoute("/paiement")({
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
  component: PaiementPage,
});

type Status = "idle" | "submitted";

function ProcessingModal({
  status,
  total,
  orderRef,
  message,
  onClose,
  onSend,
  onCopy,
  copied,
  t,
}: {
  status: Status;
  total: number;
  orderRef: string;
  message: string;
  onClose: () => void;
  onSend: () => void;
  onCopy: () => void;
  copied: boolean;
  t: (value: string, vars?: Record<string, string | number>) => string;
}) {
  const firstAction = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status === "idle") return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", closeOnEscape);
    firstAction.current?.focus();
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [status, onClose]);

  if (status === "idle") return null;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("Message préparé")}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative w-full max-w-sm rounded-3xl bg-card p-8 text-center shadow-lift"
        style={{
          animation: "k917-pill-in 0.55s cubic-bezier(0.16,1,0.3,1) forwards",
        }}
      >
        <CheckCircle2 className="mx-auto h-10 w-10 text-success" />
        <h2 className="mt-5 text-lg font-medium">{t("Message préparé")}</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La demande <strong>{orderRef}</strong> de {formatEUR(total)} est prête à être transmise.
          Le coupon sera contrôlé par la société avant toute confirmation.
        </p>
        <div className="mt-5 grid gap-3">
          <button
            type="button"
            onClick={onCopy}
            ref={firstAction}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-medium"
          >
            {copied ? t("Message copié") : t("Copier le message")}
          </button>
          <a
            href={whatsappLink(message)}
            target="_blank"
            rel="noreferrer"
            onClick={onSend}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-success text-sm font-medium text-success-foreground"
          >
            <MessageCircle className="h-4 w-4" /> {t("Envoyer sur WhatsApp")}
          </a>
          <a
            href={mailtoLink(`Commande ${orderRef}`, message)}
            onClick={onSend}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-full border border-border text-sm font-medium"
          >
            <Mail className="h-4 w-4" /> {t("Envoyer par e-mail")}
          </a>
        </div>
        <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
          Ces boutons ouvrent les canaux officiels avec le récapitulatif déjà préparé.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-3 text-sm text-muted-foreground underline-offset-4 hover:underline"
        >
          {t("Retour à l'accueil")}
        </button>
      </div>
    </div>
  );
}

function PaiementPage() {
  const { items, total, count, clear, hydrated } = useCart();
  const { t, money } = useI18n();
  const productText = useProductText();
  const [status, setStatus] = useState<Status>("idle");
  const [coupon, setCoupon] = useState("");
  const [couponType, setCouponType] = useState("TRANSCASH");
  const [confirmed, setConfirmed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2200);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const couponValid = /^[0-9]{10,20}$/.test(coupon);

  const [reference] = useState(() => orderReference(0));
  const orderRef = `${reference}-${String(Math.round(total)).padStart(5, "0")}`;

  const summaryText = items.map((i) => `${i.qty} × ${productText(i.product).name}`).join(", ");
  const orderMessage = `Bonjour,\n\nCommande ${orderRef}\nArticles : ${summaryText}\nMontant : ${formatEUR(total)}\nType de coupon : ${couponType}\nCode coupon : ${coupon}\n\nMerci de confirmer la réception et le traitement de cette commande.`;

  const submitCoupon = () => {
    if (!couponValid || count === 0 || !confirmed) return;
    setStatus("submitted");
  };

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(orderMessage);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container-x py-8 sm:py-10">
        <p className="eyebrow">{t("Étape 2 sur 4")}</p>
        <h1 className="display-lg mt-2 sm:mt-3">{t("Transmission de votre coupon")}</h1>
        <p className="mt-3 max-w-[60ch] text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
          {t(
            "Envoyez votre code Transcash, PCS ou Neosurf. La demande est transmise à la société par WhatsApp ou e-mail pour contrôle avant confirmation.",
          )}
        </p>

        <ol className="mt-6 grid gap-2 text-[10px] sm:mt-8 sm:text-xs sm:grid-cols-4">
          {["Panier", "Coupon", "Envoi", "Vérification"].map((step, index) => (
            <li
              key={step}
              className={`flex items-center gap-2 rounded-full border px-3 py-2 ${index === 1 ? "border-accent bg-accent/10 font-semibold" : "border-border text-muted-foreground"}`}
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                {index + 1}
              </span>
              {t(step)}
            </li>
          ))}
        </ol>

        {hydrated && count === 0 && status === "idle" ? (
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 text-center sm:mt-10 sm:p-10">
            <p className="text-base font-medium sm:text-lg">{t("Aucun article à régler.")}</p>
            <Link
              to="/cartes"
              className="mt-4 inline-flex h-10 items-center rounded-full bg-primary px-5 text-xs font-medium text-primary-foreground sm:mt-6 sm:h-12 sm:px-7 sm:text-sm"
            >
              {t("Choisir une carte")}
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:gap-8 lg:grid-cols-[1fr_360px]">
            <div>
              <div className="mt-6 sm:mt-8">
                <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
                  <h2 className="text-base font-medium sm:text-lg">
                    {t("Recharge prépayée Transcash / PCS / Neosurf")}
                  </h2>
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">
                    Saisissez le code à 10–20 chiffres figurant sur votre ticket. Le montant du
                    coupon doit couvrir {formatEUR(total)}.
                  </p>
                  <div className="mt-3 rounded-xl border border-destructive/30 bg-destructive/5 p-3 text-xs leading-relaxed text-foreground sm:mt-4 sm:p-4 sm:text-sm">
                    {t(
                      "N'envoyez jamais un code déjà utilisé, incomplet ou transmis à plusieurs destinataires. Vérifiez le type et le montant avant de continuer.",
                    )}
                  </div>
                  <div className="mt-4 grid gap-3 sm:mt-5 sm:gap-4 sm:grid-cols-[160px_1fr]">
                    <label className="grid gap-1 text-xs font-medium sm:gap-1.5 sm:text-sm">
                      {t("Type de coupon")}
                      <Select value={couponType} onValueChange={setCouponType}>
                        <SelectTrigger className="h-11 rounded-full border border-input bg-background px-3 text-xs font-normal sm:h-12 sm:px-4 sm:text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="TRANSCASH">Transcash</SelectItem>
                          <SelectItem value="PCS">PCS</SelectItem>
                          <SelectItem value="NEOSURF">Neosurf</SelectItem>
                        </SelectContent>
                      </Select>
                    </label>
                    <label className="grid gap-1 text-xs font-medium sm:gap-1.5 sm:text-sm">
                      {t("Code du coupon")}
                      <input
                        inputMode="numeric"
                        placeholder="10 à 20 chiffres"
                        value={coupon}
                        onChange={(e) => setCoupon(e.target.value.replace(/\D/g, "").slice(0, 20))}
                        className={`h-11 rounded-xl border bg-background px-3 text-xs font-normal outline-none focus:ring-4 focus:ring-ring/15 sm:h-12 sm:px-4 sm:text-sm ${
                          coupon && !couponValid ? "border-destructive" : "border-input"
                        }`}
                      />
                    </label>
                  </div>
                  {coupon && !couponValid && (
                    <p className="mt-2 text-[10px] text-destructive sm:text-xs">
                      Le code doit contenir uniquement 10 à 20 chiffres.
                    </p>
                  )}
                  <label className="mt-4 flex items-start gap-2 text-xs leading-relaxed sm:mt-5 sm:gap-3 sm:text-sm">
                    <input
                      type="checkbox"
                      checked={confirmed}
                      onChange={(event) => setConfirmed(event.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 accent-[var(--accent)] sm:mt-1 sm:h-4 sm:w-4"
                    />
                    <span>
                      {t("Je confirme avoir vérifié le type et le montant de mon coupon.")}
                    </span>
                  </label>
                  <button
                    type="button"
                    disabled={!couponValid || !confirmed || status === "submitted"}
                    onClick={submitCoupon}
                    className="mt-4 inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-xs font-semibold text-primary-foreground disabled:opacity-50 sm:mt-6 sm:h-12 sm:px-7 sm:text-sm"
                  >
                    {t("Valider le coupon {type}", { type: couponType })}
                  </button>
                </div>
              </div>

              {/* Alternative WhatsApp */}
              <div className="mt-6 flex flex-col gap-3 rounded-2xl bg-ink p-4 text-ink-foreground sm:mt-8 sm:flex-row sm:items-center sm:gap-4 sm:p-6">
                <MessageCircle className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
                <p className="text-xs leading-relaxed sm:text-sm">
                  <strong>Besoin d'aide ?</strong> Envoyez votre demande à un conseiller sur
                  WhatsApp au {SITE.phoneDisplay}. Il vérifie le coupon et vous confirme la suite.
                </p>
                <a
                  href={whatsappLink(
                    `Bonjour, je souhaite finaliser cette commande : ${summaryText || "une carte cadeau"} (${formatEUR(total)}).`,
                  )}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-success px-5 text-xs font-medium text-success-foreground sm:h-11 sm:px-6 sm:text-sm"
                >
                  Discuter sur WhatsApp
                </a>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-border bg-card p-4 shadow-soft sm:p-6 lg:sticky lg:top-6">
              <h2 className="text-base font-medium sm:text-lg">Votre commande</h2>
              <ul className="mt-3 space-y-2 text-xs sm:mt-4 sm:space-y-2.5 sm:text-sm">
                {items.map(({ product, qty }) => (
                  <li key={product.id} className="flex items-center gap-2 sm:gap-3">
                    <ProductCardVisual product={product} compact />
                    <div className="min-w-0 flex-1">
                      <span className="block text-xs text-muted-foreground sm:text-sm">
                        {qty} × {productText(product).name}
                      </span>
                      <span className="mt-0.5 block text-xs font-medium tabular-nums sm:mt-1 sm:text-sm">
                        {money(product.price * qty)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex justify-between border-t border-border pt-3 text-sm font-medium sm:mt-4 sm:pt-4 sm:text-base">
                <span>Total</span>
                <span className="tabular-nums">{formatEUR(total)}</span>
              </div>
              <p className="mt-4 flex items-start gap-2 text-[10px] leading-relaxed text-muted-foreground sm:mt-5 sm:text-xs">
                <Lock className="mt-0.5 h-3 w-3 shrink-0 text-success sm:h-4 sm:w-4" />
                Le coupon est contrôlé par la société avant toute confirmation.
              </p>
              <Link
                to="/panier"
                className="mt-3 inline-block text-xs text-muted-foreground underline-offset-4 hover:underline sm:mt-4 sm:text-sm"
              >
                Modifier mon panier
              </Link>
            </aside>
          </div>
        )}
      </section>

      <ProcessingModal
        status={status}
        total={total}
        orderRef={orderRef}
        message={orderMessage}
        onSend={clear}
        onCopy={copyMessage}
        copied={copied}
        t={t}
        onClose={() => {
          setStatus("idle");
        }}
      />

      <SiteFooter />
    </main>
  );
}
