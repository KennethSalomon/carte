import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, ClipboardList, Mail, MessageCircle, Phone, Send, ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE, whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";
import { useState } from "react";

const TITLE = "Comment ça marche — Servicek917officiel";
const DESC =
  "Les étapes de commande, de transmission du coupon et de vérification par l'équipe Servicek917officiel.";

export const Route = createFileRoute("/fonctionnement")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://servicek917officiel.com/fonctionnement" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: "https://servicek917officiel.com/fonctionnement" },
    ],
  }),
  component: FonctionnementPage,
});

const STEPS = [
  {
    icon: ClipboardList,
    title: "Choisissez votre formule",
    text: "Ajoutez la formule souhaitée au panier. Le montant chargé et le plafond sont affichés avant toute transmission.",
  },
  {
    icon: MessageCircle,
    title: "Préparez votre coupon",
    text: "Sélectionnez Transcash, PCS ou Neosurf, saisissez le code et vérifiez attentivement le type et le montant.",
  },
  {
    icon: ShieldCheck,
    title: "Transmettez la demande",
    text: "Le récapitulatif est préparé avec une référence. Vous l'envoyez vous-même à la société par WhatsApp ou e-mail.",
  },
  {
    icon: CheckCircle2,
    title: "Attendez la confirmation",
    text: "L'équipe contrôle la demande manuellement et vous confirme la suite par le canal utilisé. La transmission n'est pas une validation automatique.",
  },
];

function FonctionnementPage() {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = [
      `Nom: ${name}`,
      `Email: ${email}`,
      `Téléphone: ${phone}`,
      `Message: ${message}`,
    ].join("\n");
    window.open(whatsappLink(body), "_blank", "noopener,noreferrer");
    setSubmitted(true);
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />

      <section className="relative overflow-hidden">
        <div className="relative h-[50vh] min-h-[320px] w-full lg:h-[110vh]">
          <img
            src="/p1.jpeg"
            alt=""
            aria-hidden
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/70 via-black/40 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="container-x pb-8 pt-6 sm:pb-10 sm:pt-8">
              <p className="eyebrow text-white/70">{t("Guide client")}</p>
              <h1 className="display-lg mt-2 max-w-[18ch] sm:mt-3 text-white">
                {t("Une demande claire, vérifiée à chaque étape.")}
              </h1>
              <p className="mt-3 max-w-[50ch] text-xs leading-relaxed text-white/70 sm:mt-4 sm:text-sm sm:text-base">
                {t(
                  "{name} traite les demandes de coupons manuellement. Cette page vous explique exactement ce qui se passe avant, pendant et après la transmission.",
                  { name: SITE.name },
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container-x py-8 sm:py-10 md:py-16">

        <div className="mt-8 grid gap-4 md:mt-12 md:gap-5 md:grid-cols-2">
          {STEPS.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6 md:p-7"
            >
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <step.icon className="h-5 w-5 text-accent sm:h-6 sm:w-6" aria-hidden="true" />
                <span className="eyebrow">0{index + 1}</span>
              </div>
              <h2 className="mt-4 text-lg font-medium tracking-tight sm:mt-6 sm:text-xl">{t(step.title)}</h2>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm">{t(step.text)}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 sm:mt-12 sm:p-6 md:p-8">
          <h2 className="text-base font-medium sm:text-lg md:text-xl">{t("Règles importantes")}</h2>
          <ul className="mt-3 grid gap-2 text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:gap-3 sm:text-sm sm:grid-cols-2">
            <li>
              {t(
                "Ne transmettez jamais un coupon déjà utilisé ou envoyé à plusieurs destinataires.",
              )}
            </li>
            <li>{t("Ne partagez pas de données bancaires complètes dans un message.")}</li>
            <li>{t("Conservez votre preuve d'achat et votre référence de commande.")}</li>
            <li>{t("Une demande préparée n'est pas une confirmation de traitement.")}</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">
          <Link
            to="/cartes"
            className="inline-flex h-10 items-center rounded-full bg-primary px-5 text-xs font-medium text-primary-foreground sm:h-12 sm:px-7 sm:text-sm"
          >
            {t("Voir les formules")}
          </Link>
          <a
            href={whatsappLink("Bonjour, j'ai une question sur le fonctionnement d'une commande.")}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-full bg-success px-5 text-xs font-medium text-success-foreground sm:h-12 sm:px-7 sm:text-sm"
          >
            <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" /> {t("Poser une question")}
          </a>
        </div>

        <div className="mt-6 rounded-2xl border border-border bg-surface-muted p-4 sm:mt-8 sm:p-5 md:p-7">
          <h2 className="text-sm font-medium sm:text-base md:text-lg">{t("Une question sur votre demande ?")}</h2>
          <p className="mt-2 max-w-[60ch] text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {t(
              "Le formulaire de message reste accessible sur tous les écrans, y compris sur mobile. Il vous permet de transmettre votre situation et votre référence.",
            )}
          </p>
          <Link
            to="/dossier"
            hash="formulaire"
            className="mt-4 inline-flex h-10 items-center rounded-full bg-primary px-5 text-xs font-medium text-primary-foreground sm:mt-5 sm:h-11 sm:px-6 sm:text-sm"
          >
            {t("Ouvrir le formulaire de message")}
          </Link>
        </div>

        {/* Process Section - Precision Style */}
        <section
          style={{
            backgroundImage: "linear-gradient(135deg, rgba(99, 102, 241, 0.05) 0%, rgba(168, 85, 247, 0.05) 100%)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            padding: "clamp(32px, 5vw, 64px) clamp(16px, 3vw, 40px)",
            gap: "clamp(24px, 3vw, 48px)",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "clamp(20px, 3vw, 36px)",
            }}
          >
            {/* Badge */}
            <div
              style={{
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "clamp(12px, 1vw, 16px)",
                fontWeight: "500",
                borderRadius: "9999px",
                padding: "clamp(6px, 0.8vw, 12px) clamp(12px, 1.2vw, 20px)",
                color: "rgb(99, 102, 241)",
                whiteSpace: "nowrap",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {t("Processus structuré")}
            </div>

            {/* Heading */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                maxWidth: "clamp(600px, 70vw, 800px)",
                gap: "clamp(16px, 2vw, 24px)",
              }}
            >
              <h2
                style={{
                  fontSize: "clamp(24px, 3.5vw, 48px)",
                  fontWeight: "500",
                  color: "rgb(26, 26, 26)",
                  lineHeight: "1.2",
                  margin: 0,
                }}
              >
                <span className="sm:whitespace-nowrap" style={{ display: "block" }}>
                  {t("Un système intégré de bout en bout.")}
                </span>
                <span
                  style={{
                    backgroundImage: "linear-gradient(90deg, rgb(99, 102, 241), rgb(168, 85, 247) 50%, rgb(249, 115, 22))",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    color: "transparent",
                    paddingBottom: "0.2vw",
                    display: "block",
                  }}
                >
                  {t("Une valeur opérationnelle cumulative.")}
                </span>
              </h2>
              <p
                style={{
                  fontSize: "clamp(13px, 1.1vw, 18px)",
                  color: "rgb(107, 114, 128)",
                  margin: 0,
                }}
              >
                {t(
                  "{name} capture, aligne, valide et livre exactement ce qui maintient vos demandes sur la bonne voie.",
                  { name: SITE.name },
                )}
              </p>
            </div>
          </div>

          {/* Pillars Container */}
          <div
            style={{
              width: "100%",
              maxWidth: "clamp(800px, 90vw, 1200px)",
              margin: "0 auto",
            }}
          >
            {/* Desktop Pillars */}
            <div
              className="hidden sm:block"
              style={{
                position: "relative",
                width: "100%",
                height: "clamp(200px, 25vw, 350px)",
                color: "rgb(26, 26, 26)",
              }}
            >
              {[
                { label: t("Choix"), items: [t("Formules"), t("Plafonds"), t("Montants"), t("Comparaison")], leftPct: 5, bottomPct: 10 },
                { label: t("Préparation"), items: [t("Coupon"), t("Code"), t("Vérification"), t("Type")], leftPct: 30, bottomPct: 25 },
                { label: t("Transmission"), items: [t("WhatsApp"), t("E-mail"), t("Référence"), t("Récapitulatif")], leftPct: 55, bottomPct: 40 },
                { label: t("Confirmation"), items: [t("Contrôle"), t("Validation"), t("Suivi"), t("Livraison")], leftPct: 80, bottomPct: 55 },
              ].map((pillar, index) => (
                <div
                  key={pillar.label}
                  style={{
                    position: "absolute",
                    bottom: `${pillar.bottomPct}%`,
                    left: `${pillar.leftPct}%`,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  {/* Chip */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      fontSize: "clamp(14px, 1.2vw, 18px)",
                      fontWeight: "500",
                      borderRadius: "20px",
                      padding: "clamp(8px, 1vw, 14px) clamp(16px, 2vw, 24px)",
                      whiteSpace: "nowrap",
                      gap: "8px",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <ClipboardList style={{ width: "clamp(16px, 1.5vw, 24px)", height: "auto", display: "inline-block" }} />
                    {pillar.label}
                  </div>

                  {/* Line + Items */}
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      marginTop: "8px",
                    }}
                  >
                    {/* Items */}
                    <div
                      style={{
                        position: "absolute",
                        top: "4px",
                        left: "8px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "4px",
                        fontSize: "clamp(12px, 1vw, 16px)",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                      }}
                    >
                      {pillar.items.map((item) => (
                        <div
                          key={item}
                          style={{
                            padding: "4px 8px",
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* Gradient Line */}
                    <div
                      style={{
                        backgroundImage: "linear-gradient(180deg, rgb(99, 102, 241), rgb(168, 85, 247) 50%, rgb(249, 115, 22))",
                        width: "2px",
                        height: "clamp(60px, 8vw, 120px)",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile Pillars */}
            <div
              className="flex flex-col sm:hidden w-full"
              style={{
                color: "rgb(26, 26, 26)",
                gap: "0",
              }}
            >
              {[
                { label: t("Choix"), items: [t("Formules"), t("Plafonds"), t("Montants"), t("Comparaison")] },
                { label: t("Préparation"), items: [t("Coupon"), t("Code"), t("Vérification"), t("Type")] },
                { label: t("Transmission"), items: [t("WhatsApp"), t("E-mail"), t("Référence"), t("Récapitulatif")] },
                { label: t("Confirmation"), items: [t("Contrôle"), t("Validation"), t("Suivi"), t("Livraison")] },
              ].map((pillar, index) => {
                const isRight = index % 2 !== 0;
                return (
                  <div
                    key={pillar.label}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: isRight ? "flex-end" : "flex-start",
                      width: "100%",
                      paddingBottom: "8px",
                    }}
                  >
                    {/* Chip */}
                    <div
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        backgroundColor: "rgba(255, 255, 255, 0.9)",
                        fontSize: "14px",
                        fontWeight: "500",
                        borderRadius: "20px",
                        padding: "10px 16px",
                        whiteSpace: "nowrap",
                        gap: "8px",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <ClipboardList style={{ width: 16, height: "auto" }} />
                      {pillar.label}
                    </div>

                    {/* Line + Items Row */}
                    <div
                      style={{
                        display: "flex",
                        flexDirection: isRight ? "row-reverse" : "row",
                        alignItems: "stretch",
                        width: "100%",
                      }}
                    >
                      {/* Vertical Line */}
                      <div
                        style={{
                          width: "2px",
                          flexShrink: 0,
                          backgroundImage: "linear-gradient(180deg, rgb(99, 102, 241), rgb(168, 85, 247) 50%, rgb(249, 115, 22))",
                          marginLeft: isRight ? 0 : "18px",
                          marginRight: isRight ? "18px" : 0,
                          minHeight: "100px",
                        }}
                      />

                      {/* Items */}
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: "0",
                          paddingLeft: isRight ? 0 : "16px",
                          paddingRight: isRight ? "16px" : 0,
                          paddingTop: "8px",
                          paddingBottom: "8px",
                          alignItems: isRight ? "flex-end" : "flex-start",
                        }}
                      >
                        {pillar.items.map((item) => (
                          <div
                            key={item}
                            style={{
                              fontSize: "13px",
                              color: "rgb(107, 114, 128)",
                              padding: "6px 0",
                            }}
                          >
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="mt-8 sm:mt-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-xl font-medium tracking-tight sm:text-2xl md:text-3xl">
                {t("Laissez-nous un message")}
              </h2>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground sm:mt-4 sm:text-sm">
                {t(
                  "Une question, une demande d'information ou besoin d'aide ? Remplissez ce formulaire et nous vous répondrons rapidement.",
                )}
              </p>
              <div className="mt-6 space-y-4">
                <a
                  href={`tel:${SITE.phone}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Phone className="h-4 w-4" /> {SITE.phoneDisplay}
                </a>
                <a
                  href={`mailto:${SITE.email}`}
                  className="flex items-center gap-3 text-sm text-muted-foreground hover:text-foreground"
                >
                  <Mail className="h-4 w-4" /> {SITE.email}
                </a>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft sm:p-6">
              {submitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
                  <h3 className="mt-4 text-lg font-medium">{t("Message envoyé !")}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t("Votre message a été transmis via WhatsApp. Nous vous répondrons dans les plus brefs délais.")}
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 inline-flex h-10 items-center rounded-full bg-primary px-5 text-xs font-medium text-primary-foreground sm:h-11 sm:px-6 sm:text-sm"
                  >
                    {t("Envoyer un autre message")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="mb-1 block text-xs font-medium sm:mb-1.5 sm:text-sm">
                      {t("Nom complet")}
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-11 w-full rounded-xl border border-input bg-background px-3 text-xs outline-none transition-shadow focus:ring-4 focus:ring-ring/15 sm:h-12 sm:px-4 sm:text-sm"
                      placeholder={t("Votre nom")}
                    />
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                    <div>
                      <label htmlFor="contact-email" className="mb-1 block text-xs font-medium sm:mb-1.5 sm:text-sm">
                        {t("E-mail")}
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-xs outline-none transition-shadow focus:ring-4 focus:ring-ring/15 sm:h-12 sm:px-4 sm:text-sm"
                        placeholder={t("votre@email.com")}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-phone" className="mb-1 block text-xs font-medium sm:mb-1.5 sm:text-sm">
                        {t("Téléphone")}
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="h-11 w-full rounded-xl border border-input bg-background px-3 text-xs outline-none transition-shadow focus:ring-4 focus:ring-ring/15 sm:h-12 sm:px-4 sm:text-sm"
                        placeholder={t("06 XX XX XX XX")}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="mb-1 block text-xs font-medium sm:mb-1.5 sm:text-sm">
                      {t("Votre message")}
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      className="w-full rounded-xl border border-input bg-background p-3 text-xs outline-none transition-shadow focus:ring-4 focus:ring-ring/15 sm:p-4 sm:text-sm"
                      placeholder={t("Décrivez votre demande ou votre question...")}
                    />
                  </div>
                  <button
                    type="submit"
                    className="group mt-2 inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-accent px-5 text-xs font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5 sm:h-12 sm:gap-3 sm:px-7 sm:text-sm"
                  >
                    {t("Envoyer le message")}
                    <Send className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1 sm:h-4 sm:w-4" />
                  </button>
                  <p className="text-[10px] text-muted-foreground sm:text-xs">
                    {t("Le message sera envoyé via WhatsApp pour une réponse rapide.")}
                  </p>
                </form>
              )}
            </div>
          </div>
        </section>
      </section>
      <SiteFooter />
    </main>
  );
}
