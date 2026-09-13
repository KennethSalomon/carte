import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, Clock3, FileCheck2, MessageCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE, whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

const TITLE = "Remboursement & garanties — Servicek917officiel";
const DESC =
  "Conditions de remboursement des cartes cadeaux : délais, cas couverts, pièces à fournir et procédure de dossier.";

export const Route = createFileRoute("/remboursement")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://servicek917officiel.com/remboursement" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://servicek917officiel.com/remboursement" },
    ],
  }),
  component: RemboursementPage,
});

const COVERED = [
  {
    icon: FileCheck2,
    title: "Code non fonctionnel",
    text: "Si le code livré n'est pas activable, il est remplacé ou remboursé intégralement.",
  },
  {
    icon: Clock3,
    title: "Livraison hors délai",
    text: "Au-delà de 2 heures sans livraison ni explication, le remboursement est de droit.",
  },
  {
    icon: AlertTriangle,
    title: "Double débit",
    text: "Tout paiement encaissé deux fois est restitué sous 72 heures ouvrées.",
  },
];

const FAQ = [
  {
    q: "Quel est le délai de remboursement ?",
    a: "Après validation du dossier, le remboursement est émis sous 72 heures ouvrées. Le crédit apparaît ensuite sur votre compte selon les délais de votre banque (1 à 5 jours).",
  },
  {
    q: "Quelles pièces dois-je fournir ?",
    a: "Le numéro de dossier, la référence de commande, et une capture du message d'erreur ou du refus d'activation. Aucune donnée bancaire complète ne doit nous être transmise.",
  },
  {
    q: "Une carte déjà utilisée est-elle remboursable ?",
    a: "Non. Dès qu'un code a été consommé, totalement ou partiellement, la commande est considérée comme exécutée. Un geste commercial reste possible au cas par cas.",
  },
  {
    q: "Comment est remboursé un paiement Transcash ou PCS ?",
    a: "Après validation du dossier, le remboursement est traité avec le conseiller et confirmé par écrit. Une solution équivalente peut être proposée selon le cas.",
  },
  {
    q: "Puis-je annuler une commande avant livraison ?",
    a: "Oui, tant que le code n'a pas été généré. Contactez immédiatement un conseiller sur WhatsApp au " +
      SITE.phoneDisplay +
      " pour bloquer la préparation.",
  },
];

function RemboursementPage() {
  const { t } = useI18n();
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="container-x py-8 sm:py-10">
        <p className="eyebrow">{t("Garanties")}</p>
        <h1 className="display-lg mt-2 max-w-[18ch] sm:mt-3">
          {t("Remboursement : nos règles, écrites noir sur blanc.")}
        </h1>
        <p className="mt-3 max-w-[62ch] text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
          {t(
            "Nous préférons afficher des conditions claires plutôt que de promettre l'impossible. Voici exactement ce qui est couvert, dans quels délais, et comment ouvrir une demande.",
          )}
        </p>

        <div className="mt-6 grid gap-4 md:mt-10 md:gap-5 md:grid-cols-3">
          {COVERED.map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6 md:p-7"
            >
              <c.icon className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
              <h2 className="mt-3 text-base font-medium tracking-tight sm:mt-4 sm:text-lg">
                {t(c.title)}
              </h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                {t(c.text)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:mt-14 lg:gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div>
            <h2 className="display-lg max-w-[14ch]">{t("Questions fréquentes")}</h2>
            <p className="mt-3 max-w-[40ch] text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
              {t(
                "Une question qui ne figure pas ici ? Ouvrez un dossier, la réponse vous est donnée par écrit.",
              )}
            </p>
            <Link
              to="/dossier"
              className="mt-4 inline-flex h-10 items-center rounded-full bg-primary px-5 text-xs font-medium text-primary-foreground sm:mt-6 sm:h-12 sm:px-7 sm:text-sm"
            >
              {t("Ouvrir un dossier")}
            </Link>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((f, i) => (
              <AccordionItem key={f.q} value={`item-${i}`}>
                <AccordionTrigger className="text-left text-base">
                  {t(f.q)}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {t(f.a)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-ink p-5 text-ink-foreground sm:mt-14 sm:flex-row sm:items-center sm:gap-4 sm:p-7">
          <MessageCircle className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
          <p className="text-xs leading-relaxed sm:text-sm">
            {t(
              "Un remboursement urgent ? Appelez le {phone} ou écrivez directement sur WhatsApp, dossier en main.",
              { phone: SITE.phoneDisplay },
            )}
          </p>
          <a
            href={whatsappLink(
              "Bonjour, je souhaite demander un remboursement. Voici ma référence de commande : ",
            )}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-full bg-success px-5 text-xs font-medium text-success-foreground sm:h-11 sm:px-6 sm:text-sm sm:ml-auto"
          >
            {t("Contacter un conseiller")}
          </a>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
