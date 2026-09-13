import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";
import { BrandMark } from "./brand-mark";
import { LanguageSwitcher } from "./language-switcher";
import { useCart } from "@/lib/cart";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

const NAV = [
  { to: "/", label: "Accueil" },
  { to: "/cartes", label: "Cartes" },
  { to: "/fonctionnement", label: "Comment ça marche" },
  { to: "/dossier", label: "Traitement de dossier" },
  { to: "/avis", label: "Preuves & Avis" },
] as const;

export function SiteHeader({ tone = "light" }: { tone?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const firstMobileLink = useRef<HTMLAnchorElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const { count, hydrated } = useCart();
  const { t } = useI18n();
  const dark = tone === "dark";

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("keydown", trapFocus);
    document.body.style.overflow = "hidden";
    firstMobileLink.current?.focus();
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("keydown", trapFocus);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b border-transparent backdrop-blur-md ${dark ? "bg-ink/85 text-ink-foreground" : "bg-background/90 text-foreground"}`}
    >
      <div className="container-x grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 py-3 sm:gap-4 sm:py-4 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-6 lg:py-6">
        <Link to="/" className="flex min-w-0 items-center gap-1.5 font-semibold sm:gap-2.5">
          <span className="shrink-0">
            <BrandMark />
          </span>
          <span className="truncate text-xs tracking-tight sm:text-sm lg:text-base">{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-4 text-sm lg:flex lg:justify-self-center lg:gap-5 2xl:gap-7">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`whitespace-nowrap transition-colors ${dark ? "text-ink-foreground/70 hover:text-ink-foreground" : "text-muted-foreground hover:text-foreground"}`}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{
                className: dark ? "text-ink-foreground" : "text-foreground",
              }}
            >
              {t(n.label)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2 lg:justify-self-end">
          <LanguageSwitcher tone={dark ? "dark" : "light"} />
          <Link
            to="/panier"
            aria-label={t("Voir le panier")}
            className={`relative inline-flex h-9 items-center gap-1.5 rounded-full px-3 text-xs font-medium transition-colors sm:h-10 sm:gap-2 sm:px-4 sm:text-sm ${
              dark
                ? "bg-ink-foreground/10 text-ink-foreground hover:bg-ink-foreground/20"
                : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            <ShoppingBag className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span className="tabular-nums">{hydrated ? count : 0}</span>
          </Link>
          <Link
            to="/cartes"
            className={`hidden h-9 items-center rounded-full px-4 text-xs font-medium transition-opacity hover:opacity-90 sm:h-10 sm:px-5 sm:text-sm lg:inline-flex ${
              dark ? "bg-ink-foreground text-ink" : "bg-primary text-primary-foreground"
            }`}
          >
            {t("Commander")}
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? t("Fermer le menu") : t("Ouvrir le menu")}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full sm:h-10 sm:w-10 lg:hidden ${
              dark ? "bg-ink-foreground text-ink" : "bg-primary text-primary-foreground"
            }`}
          >
            {open ? <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> : <Menu className="h-3.5 w-3.5 sm:h-4 sm:w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label={t("Fermer")}
            className="absolute inset-0 bg-black/60"
            onClick={() => setOpen(false)}
          />
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-label={t("Menu")}
            className="absolute inset-x-0 top-0 max-h-[min(85svh,620px)] overflow-y-auto rounded-b-3xl bg-card p-4 pt-3 text-card-foreground shadow-lift sm:p-6 sm:pt-4"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="eyebrow">{t("Menu")}</p>
              <div className="flex items-center gap-2">
                <LanguageSwitcher tone="light" />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label={t("Fermer le menu")}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground sm:h-10 sm:w-10"
                >
                  <X className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:mt-5">
              {NAV.map((n, index) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  ref={index === 0 ? firstMobileLink : undefined}
                  className="text-xl font-medium tracking-tight sm:text-2xl"
                >
                  {t(n.label)}
                </Link>
              ))}
            </div>
            <Link
              to="/cartes"
              onClick={() => setOpen(false)}
              className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-accent text-sm font-medium text-accent-foreground sm:mt-6 sm:h-12"
            >
              {t("Commander une carte")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
