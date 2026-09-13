import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, MessageCircle, Phone } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE, whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

const TITLE = "Informations légales — Servicek917officiel";
const DESC =
  "Informations légales, contact, confidentialité et règles de traitement de Servicek917officiel.";

export const Route = createFileRoute("/legal")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://servicek917officiel.com/legal" },
    ],
    links: [
      { rel: "canonical", href: "https://servicek917officiel.com/legal" },
    ],
  }),
  component: LegalPage,
});

function LegalPage() {
  const { t } = useI18n();
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <section className="container-x py-8 sm:py-10 md:py-16">
        <p className="eyebrow">{t("Informations légales")}</p>
        <h1 className="display-lg mt-2 max-w-[18ch] sm:mt-3">
          {t("Les informations essentielles avant toute demande.")}
        </h1>
        <p className="mt-3 max-w-[62ch] text-xs leading-relaxed text-muted-foreground sm:mt-5 sm:text-sm sm:text-base">
          {t(
            "Cette page rassemble les informations publiques nécessaires à la compréhension du service. Les champs marqués à compléter doivent être renseignés par l'entreprise avant publication.",
          )}
        </p>

        <div className="mt-6 grid gap-4 md:mt-12 md:gap-5 lg:grid-cols-2">
          <article className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6 md:p-7">
            <h2 className="text-base font-medium sm:text-lg md:text-xl">{t("Éditeur et contact")}</h2>
            <dl className="mt-3 space-y-2 text-xs sm:mt-5 sm:space-y-3 sm:text-sm">
              <div className="flex justify-between gap-3 sm:gap-4">
                <dt className="text-muted-foreground">{t("Nom commercial")}</dt>
                <dd className="text-right font-medium">{SITE.name}</dd>
              </div>
              <div className="flex justify-between gap-3 sm:gap-4">
                <dt className="text-muted-foreground">{t("Entité légale")}</dt>
                <dd className="text-right font-medium">{SITE.legal}</dd>
              </div>
              <div className="flex justify-between gap-3 sm:gap-4">
                <dt className="text-muted-foreground">{t("Téléphone")}</dt>
                <dd className="text-right font-medium">{SITE.phoneDisplay}</dd>
              </div>
              <div className="flex justify-between gap-3 sm:gap-4">
                <dt className="text-muted-foreground">{t("E-mail")}</dt>
                <dd className="text-right font-medium">{SITE.email}</dd>
              </div>
              <div className="flex justify-between gap-3 sm:gap-4">
                <dt className="text-muted-foreground">{t("Adresse")}</dt>
                <dd className="text-right font-medium">{t("À compléter avant publication")}</dd>
              </div>
              <div className="flex justify-between gap-3 sm:gap-4">
                <dt className="text-muted-foreground">{t("SIREN / responsable")}</dt>
                <dd className="text-right font-medium">{t("À compléter avant publication")}</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6 md:p-7">
            <h2 className="text-base font-medium sm:text-lg md:text-xl">{t("Traitement des demandes")}</h2>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              {t(
                "Les demandes de coupons sont transmises volontairement par le client via WhatsApp ou e-mail. La saisie sur le site prépare un message, mais ne constitue pas une validation automatique. Le contrôle et la confirmation sont effectués par la société.",
              )}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              {t(
                "Ne transmettez jamais de données bancaires complètes et ne réutilisez pas un coupon déjà envoyé.",
              )}
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6 md:p-7">
            <h2 className="text-base font-medium sm:text-lg md:text-xl">{t("Confidentialité")}</h2>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              {t(
                "Le panier et la langue sont conservés localement dans votre navigateur pour faciliter votre parcours. Les informations que vous choisissez d'envoyer par WhatsApp ou e-mail sont alors soumises aux politiques de ces services. Une politique de confidentialité complète et la durée de conservation doivent être ajoutées avant la mise en production.",
              )}
            </p>
          </article>

          <article className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6 md:p-7">
            <h2 className="text-base font-medium sm:text-lg md:text-xl">{t("Conditions et réclamations")}</h2>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              {t(
                "Les conditions de remboursement sont présentées sur la page dédiée. Toute réclamation doit préciser la référence de commande, le motif et les éléments utiles, sans transmettre de données sensibles inutiles.",
              )}
            </p>
            <Link
              to="/remboursement"
              className="mt-4 inline-flex text-xs font-medium underline underline-offset-4 sm:mt-5 sm:text-sm"
            >
              {t("Consulter les garanties")}
            </Link>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">
          <a
            href={`tel:${SITE.phone}`}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-secondary px-4 text-xs font-medium sm:h-11 sm:px-5 sm:text-sm"
          >
            <Phone className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {SITE.phoneDisplay}
          </a>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-flex h-10 items-center gap-2 rounded-full bg-secondary px-4 text-xs font-medium sm:h-11 sm:px-5 sm:text-sm"
          >
            <Mail className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {SITE.email}
          </a>
          <a
            href={whatsappLink("Bonjour, j'ai une question sur les informations légales.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-success px-4 text-xs font-medium text-success-foreground sm:h-11 sm:px-5 sm:text-sm"
          >
            <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> WhatsApp
          </a>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
