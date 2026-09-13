import { Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { BrandMark } from "./brand-mark";
import { LanguageSwitcher } from "./language-switcher";
import { SITE, whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();
  return (
    <footer className="border-t border-border bg-surface-muted">
      <div className="container-x grid gap-8 py-10 sm:gap-10 sm:py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10 lg:py-14">
        <div className="md:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-2 font-semibold sm:gap-2.5">
            <BrandMark />
            <span className="text-sm sm:text-base">{SITE.name}</span>
          </div>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
            {SITE.baseline} {t(
              "Envoyez votre recharge prépayée Transcash, PCS ou Neosurf. Un conseiller vous répond sur WhatsApp et par e-mail à chaque étape.",
            )}
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-xs sm:mt-5 sm:gap-3 sm:text-sm">
            <a
              href={`tel:${SITE.phone}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-secondary-foreground sm:gap-2 sm:px-4 sm:py-2"
            >
              <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {SITE.phoneDisplay}
            </a>
            <a
              href={whatsappLink(t("Bonjour, j'ai une question sur les cartes."))}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-success px-3 py-1.5 text-success-foreground sm:gap-2 sm:px-4 sm:py-2"
            >
              <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> WhatsApp
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-secondary-foreground sm:gap-2 sm:px-4 sm:py-2"
            >
              <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {SITE.email}
            </a>
            <LanguageSwitcher />
          </div>
        </div>

        <div className="text-xs sm:text-sm">
          <p className="eyebrow">{t("Boutique")}</p>
          <ul className="mt-3 space-y-2 text-muted-foreground sm:mt-4 sm:space-y-2.5">
            <li>
              <Link to="/cartes" className="hover:text-foreground">
                {t("Toutes les cartes")}
              </Link>
            </li>
            <li>
              <Link to="/panier" className="hover:text-foreground">
                {t("Mon panier")}
              </Link>
            </li>
            <li>
              <Link to="/paiement" className="hover:text-foreground">
                {t("Transmission du coupon")}
              </Link>
            </li>
            <li>
              <Link to="/fonctionnement" className="hover:text-foreground">
                {t("Comment ça marche")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-xs sm:text-sm">
          <p className="eyebrow">{t("Assistance")}</p>
          <ul className="mt-3 space-y-2 text-muted-foreground sm:mt-4 sm:space-y-2.5">
            <li>
              <Link to="/dossier" className="hover:text-foreground">
                {t("Traitement de dossier")}
              </Link>
            </li>
            <li>
              <Link to="/avis" className="hover:text-foreground">
                {t("Preuves & avis clients")}
              </Link>
            </li>
            <li>
              <Link to="/remboursement" className="hover:text-foreground">
                {t("Remboursement")}
              </Link>
            </li>
            <li>
              <Link to="/legal" className="hover:text-foreground">
                {t("Informations légales")}
              </Link>
            </li>
          </ul>
        </div>

        <div className="text-xs sm:text-sm md:col-span-2 lg:col-span-1">
          <p className="eyebrow">{t("Contact")}</p>
          <ul className="mt-3 space-y-2 text-muted-foreground sm:mt-4 sm:space-y-2.5">
            <li>
              <a
                href={`tel:${SITE.phone}`}
                className="hover:text-foreground"
              >
                {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-foreground"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
          <div className="mt-4">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-x flex flex-col items-start gap-2 py-4 text-[10px] text-muted-foreground sm:flex-row sm:items-center sm:gap-3 sm:py-6 sm:text-xs">
          <p>
            © {new Date().getFullYear()} {SITE.name} — {SITE.legal}
          </p>
          <p className="inline-flex items-center gap-1.5 sm:gap-2">
            <ShieldCheck className="h-3 w-3 text-success sm:h-4 sm:w-4" /> {t(
              "Transmission encadrée • Codes contrôlés avant traitement",
            )}
          </p>
        </div>
      </div>
    </footer>
  );
}
