import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  MessageCircle,
  Quote,
  Star,
} from "lucide-react";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { BankInfoSection } from "@/components/bank-info-section";
import { StaggerTestimonials } from "@/components/ui/stagger-testimonials";
import OrbitlyRemoteTalentHero from "@/components/ui/orbitly-hero";
import { LiquidCard } from "@/components/ui/liquid-glass-card";
import { SITE, whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

type Review = {
  name: string;
  city: string;
  stars: number;
  text: string;
  tag: string;
};

const TITLE = "Preuves & Avis — Servicek917officiel";
const DESC =
  "Retours vérifiés de clients ayant reçu leurs cartes cadeaux : délais de livraison, plafonds respectés et suivi WhatsApp.";

export const Route = createFileRoute("/avis")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://servicek917officiel.com/avis" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://servicek917officiel.com/avis" },
    ],
  }),
  component: AvisPage,
});

const REVIEWS = [
  {
    name: "Amélie R.",
    city: "Lyon",
    stars: 5,
    text: "Commande d'une carte 250 € un dimanche soir, code reçu en 9 minutes sur WhatsApp. Le conseiller a vérifié l'activation avec moi.",
    tag: "Carte Classique",
  },
  {
    name: "Karim B.",
    city: "Marseille",
    stars: 5,
    text: "J'ai payé par Transcash, j'avais peur du délai. Réponse immédiate, plafond respecté, retrait au guichet sans souci.",
    tag: "Paiement coupon",
  },
  {
    name: "Sofia M.",
    city: "Lille",
    stars: 4,
    text: "Le premier code avait un souci, dossier ouvert le matin, remplacé dans l'après-midi. Service sérieux et joignable.",
    tag: "Traitement de dossier",
  },
  {
    name: "Lucas D.",
    city: "Bordeaux",
    stars: 5,
    text: "Formule 1 000 € pour des achats pro. Demande envoyée le matin, codes transmis le midi. Facture et suivi impeccables.",
    tag: "Carte Premium",
  },
  {
    name: "Nadia K.",
    city: "Toulouse",
    stars: 5,
    text: "Ce que j'apprécie : on sait exactement quel plafond on obtient avant de payer. Aucune mauvaise surprise.",
    tag: "Carte Basique",
  },
  {
    name: "Étienne P.",
    city: "Nantes",
    stars: 5,
    text: "Deuxième commande. Le conseiller reconnaît le dossier, tout va plus vite. C'est ce que j'attends d'un service.",
    tag: "Client fidèle",
  },
];

function ReviewCard({ review: r }: { review: Review }) {
  return (
    <LiquidCard className="w-[280px] shrink-0 p-4 sm:w-[300px] sm:p-5">
      <figure className="flex h-full flex-col">
        <div className="flex items-center justify-between">
          <Quote className="h-4 w-4 text-accent sm:h-5 sm:w-5" />
          <div className="flex items-center gap-1" aria-label={`${r.stars} sur 5`}>
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${i < r.stars ? "fill-accent text-accent" : "text-border"} sm:h-3.5 sm:w-3.5`}
              />
            ))}
          </div>
        </div>
        <blockquote className="mt-3 flex-1 text-xs leading-relaxed sm:mt-4 sm:text-sm">
          {r.text}
        </blockquote>
        <figcaption className="mt-4 flex items-center gap-2 border-t border-border pt-3 sm:mt-5 sm:gap-3 sm:pt-4">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] font-semibold text-ink-foreground sm:h-9 sm:w-9 sm:text-xs">
            {r.name.charAt(0)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xs font-medium sm:text-sm">
              {r.name} · {r.city}
            </span>
            <span className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-muted-foreground sm:gap-1.5 sm:text-xs">
              <span className="h-1 w-1 rounded-full bg-success sm:h-1.5 sm:w-1.5" aria-hidden="true" /> {r.tag} — retour partagé
            </span>
          </span>
        </figcaption>
      </figure>
    </LiquidCard>
  );
}

const STATS = [
  { v: "Clair", l: "montants et plafonds affichés avant la demande" },
  { v: "Direct", l: "échange avec un conseiller sur WhatsApp" },
  { v: "Suivi", l: "référence conservée pour chaque demande" },
  { v: "7j/7", l: "assistance téléphone & WhatsApp" },
];

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

function AvisPage() {
  const { t } = useI18n();
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

      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] min-h-[320px] w-full lg:h-[80vh]">
          <img
            src="/p2.jpeg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-x pb-8 pt-6 sm:pb-10 sm:pt-8">
              <p className="eyebrow text-white/70">{t("Preuves & Avis")}</p>
              <h1 className="display-lg mt-2 max-w-[18ch] sm:mt-3 text-white">
                {t("Ce que disent les clients qui ont déjà commandé.")}
              </h1>
              <p className="mt-3 max-w-[50ch] text-xs leading-relaxed text-white/70 sm:mt-4 sm:text-sm">
                Les témoignages ci-dessous sont des exemples de retours représentatifs
                de l'expérience recherchée. Ils ne constituent pas des avis vérifiés
                par une plateforme indépendante.
              </p>
            </div>
          </div>
        </div>
      </section>

      <OrbitlyRemoteTalentHero />

      <section className="container-x py-8 sm:py-10">

        <div className="mt-6 grid gap-3 sm:mt-10 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="rounded-2xl bg-surface-muted p-4 sm:p-6">
              <p className="text-2xl font-medium tracking-[-0.04em] sm:text-3xl">{s.v}</p>
              <p className="mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm">{s.l}</p>
            </div>
          ))}
        </div>

        <StaggerTestimonials />

        <div className="mt-8 flex flex-col gap-3 rounded-2xl bg-ink p-5 text-ink-foreground sm:mt-12 sm:flex-row sm:items-center sm:gap-4 sm:p-7">
          <p className="text-xs leading-relaxed sm:text-sm">
            Vous avez commandé chez {SITE.name} ? Envoyez votre retour, nous le
            publions tel quel.
          </p>
          <a
            href={whatsappLink("Bonjour, je souhaite laisser un avis sur ma commande.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-success px-5 text-xs font-medium text-success-foreground sm:h-11 sm:px-6 sm:text-sm sm:ml-auto"
          >
            <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" /> Laisser un avis
          </a>
          <Link
            to="/cartes"
            className="inline-flex h-10 items-center justify-center rounded-full bg-ink-foreground px-5 text-xs font-medium text-ink sm:h-11 sm:px-6 sm:text-sm"
          >
            Commander
          </Link>
        </div>
      </section>

      {/* WHATSAPP FORM */}
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

      <BankInfoSection />

      <SiteFooter />
    </main>
  );
}
