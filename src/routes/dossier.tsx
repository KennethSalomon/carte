import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Clock3,
  FileCheck2,
  MessageCircle,
} from "lucide-react";
import { z } from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE, whatsappLink } from "@/lib/site";
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

const schema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Indiquez votre nom (2 caractères minimum).")
    .max(60, "Nom trop long.")
    .regex(/^[A-Za-zÀ-ÿ' -]+$/, "Le nom ne doit contenir que des lettres."),
  phone: z
    .string()
    .trim()
    .regex(
      /^\+?[0-9 .-]{8,18}$/,
      "Numéro invalide (chiffres, espaces, + autorisés).",
    ),
  subject: z.string().min(1, "Choisissez un motif."),
  reference: z
    .string()
    .trim()
    .max(24, "Référence trop longue.")
    .regex(/^[A-Za-z0-9-]*$/, "Référence : lettres, chiffres et tirets.")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Détaillez votre demande (10 caractères minimum).")
    .max(800, "Message limité à 800 caractères."),
});

const SUBJECTS = [
  "Code non reçu",
  "Carte non activée",
  "Demande de remboursement",
  "Question avant achat",
  "Autre demande",
];

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
  const [values, setValues] = useState({
    name: "",
    phone: "",
    subject: SUBJECTS[0]!,
    reference: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [ticket, setTicket] = useState("");

  const set = (k: keyof typeof values, v: string) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        next[String(issue.path[0])] = issue.message;
      }
      setErrors(next);
      return;
    }
    setErrors({});
    const id = `K917-${Date.now().toString().slice(-6)}`;
    setTicket(id);
    const body = [
      `Dossier ${id}`,
      `Nom : ${parsed.data.name}`,
      `Téléphone : ${parsed.data.phone}`,
      `Motif : ${parsed.data.subject}`,
      parsed.data.reference ? `Référence : ${parsed.data.reference}` : null,
      `Message : ${parsed.data.message}`,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(whatsappLink(body), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const field =
    "h-11 w-full rounded-full border border-input bg-background px-3 text-xs outline-none transition-shadow focus:ring-4 focus:ring-ring/15 sm:h-12 sm:px-4 sm:text-sm";

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

      {/* FORM */}
      <section id="formulaire" className="scroll-mt-16 bg-surface-muted py-12 sm:py-16 md:py-20">

        <div className="container-x grid gap-8 lg:gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground sm:h-7 sm:w-7 sm:text-xs">
                3
              </span>
              <span className="rounded-full border border-border px-3 py-1 text-[10px] font-medium sm:px-4 sm:py-1.5 sm:text-xs">
                {t("Votre demande")}
              </span>
            </div>
            <h2 className="display-lg mt-5 max-w-[16ch] sm:mt-7">
              {t("Écrivez-nous votre petit mot.")}
            </h2>
            <p className="mt-4 max-w-[46ch] text-xs leading-relaxed text-muted-foreground sm:mt-5 sm:text-sm">
              {t("Le message part sur le WhatsApp officiel {phone}. Vous recevez une confirmation à l'écran avec votre numéro de dossier.", { phone: SITE.phoneDisplay })}
            </p>
          </div>

          {sent ? (
            <div className="rounded-2xl border border-success/30 bg-card p-6 shadow-soft sm:p-8">
              <CheckCircle2 className="h-8 w-8 text-success sm:h-9 sm:w-9" />
              <h3 className="mt-4 text-lg font-medium sm:mt-5 sm:text-xl">{t("Message envoyé")}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">
                {t("Votre dossier {ticket} est enregistré et une conversation WhatsApp a été ouverte. Si la fenêtre ne s'est pas ouverte, utilisez le bouton ci-dessous.", { ticket })}
              </p>
              <div className="mt-4 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
                <a
                  href={whatsappLink(`Dossier ${ticket} — ${values.subject}`)}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full bg-success px-5 text-xs font-medium text-success-foreground sm:h-11 sm:px-6 sm:text-sm"
                >
                  <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> {t("Ouvrir WhatsApp")}
                </a>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="inline-flex h-10 items-center rounded-full border border-border px-5 text-xs font-medium sm:h-11 sm:px-6 sm:text-sm"
                >
                  {t("Envoyer une autre demande")}
                </button>
              </div>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit}
              className="grid gap-3 rounded-2xl border border-border bg-card p-4 shadow-soft sm:gap-4 sm:p-6 md:p-8"
            >
              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <div>
                  <label htmlFor="d-name" className="mb-1 block text-xs font-medium sm:mb-1.5 sm:text-sm">
                    {t("Nom complet")}
                  </label>
                  <input
                    id="d-name"
                    className={field}
                    value={values.name}
                    maxLength={60}
                    onChange={(e) => set("name", e.target.value)}
                    aria-invalid={!!errors["name"]}
                    aria-describedby={errors["name"] ? "d-name-error" : undefined}
                  />
                  {errors["name"] && (
                    <p id="d-name-error" className="mt-1 text-[10px] text-destructive sm:text-xs">{errors["name"]}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="d-phone" className="mb-1 block text-xs font-medium sm:mb-1.5 sm:text-sm">
                    {t("Téléphone")}
                  </label>
                  <input
                    id="d-phone"
                    inputMode="tel"
                    className={field}
                    value={values.phone}
                    maxLength={18}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={!!errors["phone"]}
                    aria-describedby={errors["phone"] ? "d-phone-error" : undefined}
                  />
                  {errors["phone"] && (
                    <p id="d-phone-error" className="mt-1 text-[10px] text-destructive sm:text-xs">{errors["phone"]}</p>
                  )}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <div>
                  <label htmlFor="d-subject" className="mb-1 block text-xs font-medium sm:mb-1.5 sm:text-sm">
                    {t("Motif")}
                  </label>
                  <Select value={values.subject} onValueChange={(v) => set("subject", v)}>
                    <SelectTrigger id="d-subject" className={field}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((s) => (
                        <SelectItem key={s} value={s}>
                          {t(s)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="d-ref" className="mb-1 block text-xs font-medium sm:mb-1.5 sm:text-sm">
                    {t("Référence commande")} <span className="text-muted-foreground">({t("optionnel")})</span>
                  </label>
                  <input
                    id="d-ref"
                    className={field}
                    value={values.reference}
                    maxLength={24}
                    placeholder="K917-00250"
                    onChange={(e) => set("reference", e.target.value)}
                    aria-invalid={!!errors["reference"]}
                    aria-describedby={errors["reference"] ? "d-ref-error" : undefined}
                  />
                  {errors["reference"] && (
                    <p id="d-ref-error" className="mt-1 text-[10px] text-destructive sm:text-xs">
                      {errors["reference"]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="d-msg" className="mb-1 block text-xs font-medium sm:mb-1.5 sm:text-sm">
                  {t("Votre message")}
                </label>
                <textarea
                  id="d-msg"
                  rows={4}
                  maxLength={800}
                  className="w-full rounded-xl border border-input bg-background p-3 text-xs outline-none transition-shadow focus:ring-4 focus:ring-ring/15 sm:p-4 sm:text-sm"
                  value={values.message}
                  onChange={(e) => set("message", e.target.value)}
                  aria-invalid={!!errors["message"]}
                  aria-describedby={errors["message"] ? "d-msg-error" : undefined}
                />
                <div className="mt-1 flex justify-between text-[10px] text-muted-foreground sm:text-xs">
                  <span id="d-msg-error" className="text-destructive">{errors["message"]}</span>
                  <span>{values.message.length}/800</span>
                </div>
              </div>

              <button
                type="submit"
                className="group mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-accent pl-5 pr-2 text-xs font-semibold text-accent-foreground sm:mt-2 sm:h-12 sm:gap-3 sm:pl-6 sm:text-sm"
              >
                {t("Envoyer sur WhatsApp")}
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-background text-accent transition-transform duration-500 group-hover:-rotate-45 sm:h-8 sm:w-8">
                  <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                </span>
              </button>
            </form>
          )}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
