import { SunIcon as Sunburst } from "lucide-react";
import { useState } from "react";
import { SITE, whatsappLink } from "@/lib/site";
import { useI18n } from "@/lib/i18n";

export const ContactSection = () => {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [messageError, setMessageError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const validateEmail = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let valid = true;

    if (!name.trim()) {
      setNameError(t("Veuillez entrer votre nom."));
      valid = false;
    } else {
      setNameError("");
    }

    if (!validateEmail(email)) {
      setEmailError(t("Veuillez entrer une adresse e-mail valide."));
      valid = false;
    } else {
      setEmailError("");
    }

    if (!message.trim()) {
      setMessageError(t("Veuillez entrer votre message."));
      valid = false;
    } else {
      setMessageError("");
    }

    setSubmitted(true);

    if (valid) {
      const text = `Bonjour, je suis ${name}. ${message} (e-mail: ${email})`;
      window.open(whatsappLink(text), "_blank");
      setName("");
      setEmail("");
      setMessage("");
      setSubmitted(false);
    }
  };

  const field =
    "h-11 w-full rounded-full border border-input bg-background px-3 text-xs text-foreground outline-none transition-shadow focus:ring-4 focus:ring-ring/15 sm:h-12 sm:px-4 sm:text-sm";

  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <div className="relative flex flex-col overflow-hidden rounded-2xl shadow-xl md:flex-row">
          {/* Left – image */}
          <div className="relative h-48 sm:h-64 w-full md:h-[40rem] md:w-1/2">
            <img
              src="/p1.jpeg"
              alt=""
              aria-hidden
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute inset-0 flex items-end p-5 sm:p-8 md:p-12">
              <h1 className="text-xl font-medium leading-tight text-white tracking-tight sm:text-2xl md:text-3xl">
                {t("Besoin d'un accompagnement personnalisé ?")}
              </h1>
            </div>
          </div>

          {/* Right – form */}
          <div className="flex flex-col bg-secondary p-5 sm:p-8 text-secondary-foreground md:w-1/2 md:p-12">
            <div className="mb-6 flex flex-col items-start sm:mb-8">
              <div className="mb-3 text-accent sm:mb-4">
                <Sunburst className="h-8 w-8 sm:h-10 sm:w-10" />
              </div>
              <h2 className="mb-2 text-2xl font-medium tracking-tight sm:text-3xl">
                {t("Contactez-nous")}
              </h2>
              <p className="text-left text-xs opacity-80 sm:text-sm">
                {t("Envoyez votre demande — un conseiller vous répond en quelques minutes.")}
              </p>
            </div>

            <form
              className="flex flex-col gap-3 sm:gap-4"
              onSubmit={handleSubmit}
              noValidate
            >
              <div>
                <label htmlFor="c-name" className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
                  {t("Votre nom")}
                </label>
                <input
                  type="text"
                  id="c-name"
                  placeholder="Jean Dupont"
                  className={`${field} ${
                    nameError ? "border-destructive focus:ring-destructive" : ""
                  }`}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={!!nameError}
                  aria-describedby="name-error"
                />
                {nameError && (
                  <p id="name-error" className="mt-1 text-xs text-destructive">
                    {nameError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="c-email" className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
                  {t("Adresse e-mail")}
                </label>
                <input
                  type="email"
                  id="c-email"
                  placeholder="jean@exemple.fr"
                  className={`${field} ${
                    emailError ? "border-destructive focus:ring-destructive" : ""
                  }`}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!emailError}
                  aria-describedby="email-error"
                />
                {emailError && (
                  <p id="email-error" className="mt-1 text-xs text-destructive">
                    {emailError}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="c-message" className="mb-1.5 block text-xs font-medium sm:mb-2 sm:text-sm">
                  {t("Votre message")}
                </label>
                <textarea
                  id="c-message"
                  rows={4}
                  placeholder={t("Décrivez votre besoin (montant souhaité, type de carte, etc.)")}
                  className={`w-full resize-none rounded-full border bg-background px-3 py-2 text-xs text-foreground outline-none transition-shadow focus:ring-4 focus:ring-ring/15 sm:px-4 sm:text-sm ${
                    messageError ? "border-destructive focus:ring-destructive" : "border-input"
                  }`}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  aria-invalid={!!messageError}
                  aria-describedby="message-error"
                />
                {messageError && (
                  <p id="message-error" className="mt-1 text-xs text-destructive">
                    {messageError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full rounded-full bg-accent py-2.5 px-4 text-xs font-medium text-accent-foreground transition-colors hover:bg-accent/90 sm:py-3 sm:text-sm"
              >
                {t("Envoyer via WhatsApp")}
              </button>

              <p className="text-center text-[11px] text-muted-foreground sm:text-xs">
                {t("Réponse garantie sous")}{" "}
                <span className="font-medium text-foreground">{t("10 minutes")}</span>{" "}
                — 7j/7
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
