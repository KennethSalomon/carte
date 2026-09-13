import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Clock,
  Clock3,
  FileCheck2,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BankInfoSection } from "@/components/bank-info-section";
import { SITE } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

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

const REFUND_FAQ = [
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
];


const TITLE = "Traitement de dossier — Servicek917officiel";
const DESC =
  "Ouvrez un dossier : réclamation, code non reçu, demande de remboursement ou question. Votre message part directement sur le WhatsApp de la société.";

export const Route = createFileRoute("/dossier")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://servicek917officiel.com/dossier" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://servicek917officiel.com/dossier" },
    ],
  }),
  component: DossierPage,
});

function useLondonTime() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () =>
      setTime(
        new Intl.DateTimeFormat("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Europe/Paris",
        }).format(new Date()),
      );
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

function DossierPage() {
  const { t } = useI18n();
  const time = useLondonTime();

  return (
    <main className="bg-background">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] min-h-[320px] w-full lg:h-[110vh]">
          <img
            src="/p9.jpeg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-x pb-8 pt-6 sm:pb-10 sm:pt-8">
              <p className="eyebrow text-white/70">{t("Service client {name}", { name: SITE.name })}</p>
              <h1 className="display-xl mt-4 max-w-[16ch] sm:mt-6 text-white">
                {t("Un dossier ouvert, une réponse humaine.")}
              </h1>
              <p className="mt-4 max-w-[52ch] text-xs leading-relaxed text-white/70 sm:mt-6 sm:text-sm sm:text-base">
                {t("Décrivez votre situation : code non reçu, activation, remboursement ou simple question. Votre demande est envoyée directement sur le WhatsApp de la société et suivie sous un numéro de dossier.")}
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-9 sm:gap-4">
                <a
                  href="#formulaire"
                  className="group inline-flex items-center gap-2 rounded-full bg-accent py-1.5 pl-5 pr-2 text-xs font-medium text-accent-foreground sm:gap-3 sm:py-2 sm:pl-6 sm:text-sm"
                >
                  {t("Ouvrir un dossier")}
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background text-accent transition-transform duration-500 group-hover:-rotate-45 sm:h-8 sm:w-8">
                    <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                  </span>
                </a>
                <span className="inline-flex items-center gap-1.5 rounded-[6px] bg-white/15 px-3 py-2 text-xs text-white backdrop-blur-sm sm:gap-2 sm:px-4 sm:py-2.5 sm:text-sm">
                  <Clock className="h-3.5 w-3.5 text-white/70 sm:h-4 sm:w-4" />
                  {t("{time} à Paris • réponse moyenne 8 min", { time })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-card py-12 sm:py-16 md:py-20">
        <div className="container-x">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground sm:h-7 sm:w-7 sm:text-xs">
              1
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-[10px] font-medium sm:px-4 sm:py-1.5 sm:text-xs">
              {t("Mise en attente & suivi")}
            </span>
          </div>
          <h2 className="display-lg mt-5 max-w-[26ch] sm:mt-7">
            {t("Chaque demande est numérotée, tracée et traitée dans l'ordre d'arrivée.")}
          </h2>
          <div className="mt-8 grid gap-4 md:mt-12 md:gap-5 md:grid-cols-3">
            {[
              {
                t: "Ouverture",
                d: "Vous remplissez le formulaire, un numéro de dossier est généré instantanément.",
              },
              {
                t: "Mise en attente",
                d: "Un conseiller reprend le dossier sur WhatsApp et vous indique le délai réel.",
              },
              {
                t: "Résolution",
                d: "Renvoi du code, activation ou remboursement selon nos conditions publiées.",
              },
            ].map((s, i) => (
              <div
                key={s.t}
                className="rounded-2xl border border-border bg-background p-5 sm:p-6 md:p-7"
              >
                <span className="eyebrow">0{i + 1}</span>
                <h3 className="mt-3 text-base font-medium tracking-tight sm:text-lg md:text-xl">{t(s.t)}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{t(s.d)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REMBOURSEMENT */}
      <section className="bg-background py-12 sm:py-16 md:py-20">
        <div className="container-x">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground sm:h-7 sm:w-7 sm:text-xs">
              2
            </span>
            <span className="rounded-full border border-border px-3 py-1 text-[10px] font-medium sm:px-4 sm:py-1.5 sm:text-xs">
              {t("Remboursement")}
            </span>
          </div>
          <h2 className="display-lg mt-5 max-w-[24ch] sm:mt-7">
            {t("Avant d'écrire, vérifiez ce qui est couvert.")}
          </h2>
          <p className="mt-4 max-w-[62ch] text-xs leading-relaxed text-muted-foreground sm:mt-5 sm:text-sm">
            {t("Un dossier de remboursement va plus vite lorsqu'il entre dans l'un des cas ci-dessous. Indiquez le cas concerné dans votre message.")}
          </p>

          <div className="mt-8 grid gap-4 md:mt-10 md:gap-5 md:grid-cols-3">
            {COVERED.map((c) => (
              <div
                key={c.title}
                className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6 md:p-7"
              >
                <c.icon className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
                <h3 className="mt-3 text-base font-medium tracking-tight sm:mt-4 sm:text-lg">{t(c.title)}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">{t(c.text)}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-8 lg:mt-12 lg:gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h3 className="text-xl font-medium tracking-tight sm:text-2xl">
                {t("Questions fréquentes")}
              </h3>
              <p className="mt-2 max-w-[42ch] text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">
                {t("Si votre situation ne figure pas ici, décrivez-la dans le formulaire ci-dessous : la réponse vous est donnée par écrit.")}
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              {REFUND_FAQ.map((f, i) => (
                <AccordionItem key={f.q} value={`r-${i}`}>
                  <AccordionTrigger className="text-left text-base">
                    {f.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <BankInfoSection />

      <SiteFooter />
    </main>
  );
}
